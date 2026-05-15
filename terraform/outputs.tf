output "elastic_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_eip.app.public_ip
}

output "rds_endpoint" {
  description = "RDS hostname (for reference)"
  value       = aws_db_instance.postgres.address
}

output "s3_bucket" {
  description = "S3 assets bucket name"
  value       = aws_s3_bucket.assets.bucket
}

output "site_url" {
  description = "Live site URL"
  value       = "https://${var.domain}"
}
