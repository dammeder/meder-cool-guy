terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ─── Data ────────────────────────────────────────────────────────────────────

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

data "aws_route53_zone" "main" {
  name         = var.domain
  private_zone = false
}

# ─── Security Groups ─────────────────────────────────────────────────────────

resource "aws_security_group" "web" {
  name        = "mcg-web"
  description = "EC2: HTTP, HTTPS, SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db" {
  name        = "mcg-db"
  description = "RDS: only reachable from EC2"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ─── IAM (S3 access for EC2) ─────────────────────────────────────────────────

resource "aws_iam_role" "ec2" {
  name = "mcg-ec2-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "s3" {
  name = "mcg-s3-access"
  role = aws_iam_role.ec2.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"]
      Resource = [aws_s3_bucket.assets.arn, "${aws_s3_bucket.assets.arn}/*"]
    }]
  })
}

resource "aws_iam_instance_profile" "ec2" {
  name = "mcg-ec2-profile"
  role = aws_iam_role.ec2.name
}

# ─── S3 ──────────────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "assets" {
  bucket = "meder-cool-guy-assets"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "assets_public_read" {
  bucket = aws_s3_bucket.assets.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.assets.arn}/public/*"
    }]
  })
  depends_on = [aws_s3_bucket_public_access_block.assets]
}

# ─── RDS ─────────────────────────────────────────────────────────────────────

resource "aws_db_instance" "postgres" {
  identifier        = "mcg-db"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = "mcg"
  username = "postgres"
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = false
  skip_final_snapshot    = false
  final_snapshot_identifier = "mcg-db-final"

  backup_retention_period = 7
  deletion_protection     = true
}

# ─── EC2 ─────────────────────────────────────────────────────────────────────

resource "aws_key_pair" "main" {
  key_name   = "mcg-key"
  public_key = var.ssh_public_key
}

resource "aws_instance" "app" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = "t2.micro"
  key_name             = aws_key_pair.main.key_name
  security_groups      = [aws_security_group.web.name]
  iam_instance_profile = aws_iam_instance_profile.ec2.name

  user_data = templatefile("${path.module}/userdata.sh", {
    db_url       = "postgresql://postgres:${var.db_password}@${aws_db_instance.postgres.address}:5432/mcg"
    admin_password = var.admin_password
    admin_token    = var.admin_token
    repo_url       = var.repo_url
  })

  tags = { Name = "mcg-app" }
}

resource "aws_eip" "app" {
  instance = aws_instance.app.id
  domain   = "vpc"
}

# ─── Route 53 ────────────────────────────────────────────────────────────────

resource "aws_route53_record" "root" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = var.domain
  type            = "A"
  ttl             = 300
  records         = [aws_eip.app.public_ip]
  allow_overwrite = true
}

resource "aws_route53_record" "www" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = "www.${var.domain}"
  type            = "A"
  ttl             = 300
  records         = [aws_eip.app.public_ip]
  allow_overwrite = true
}
