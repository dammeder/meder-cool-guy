variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain" {
  description = "Root domain (must be a hosted zone in Route 53)"
  type        = string
  default     = "meder-cool-guy.com"
}

variable "ssh_public_key" {
  description = "Contents of your ~/.ssh/id_rsa.pub (or ed25519)"
  type        = string
}

variable "ssh_allowed_cidr" {
  description = "Your home IP in CIDR notation (e.g. 1.2.3.4/32) — restricts SSH"
  type        = string
}

variable "db_password" {
  description = "RDS postgres password — pick something strong"
  type        = string
  sensitive   = true
}

variable "admin_password" {
  description = "Admin login password for /admin"
  type        = string
  sensitive   = true
}

variable "admin_token" {
  description = "Admin session token (UUID or random string)"
  type        = string
  sensitive   = true
}

variable "repo_url" {
  description = "GitHub repo URL to clone on the server"
  type        = string
  default     = "https://github.com/dammeder/meder-cool-guy.git"
}
