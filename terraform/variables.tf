# Core
variable "aws_region" {
  description = "AWS region to deploy infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "dailymuse"
}

variable "environment" {
  description = "Deployment environment (e.g., prod, dev)"
  type        = string
  default     = "production"
}

# Networking
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet (EC2)"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_1_cidr" {
  description = "CIDR block for the first private subnet (RDS)"
  type        = string
  default     = "10.0.2.0/24"
}

variable "private_subnet_2_cidr" {
  description = "CIDR block for the second private subnet (RDS DB Subnet Group requires 2 AZs)"
  type        = string
  default     = "10.0.3.0/24"
}

# EC2
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro" # Suitable for free-tier/low cost
}

variable "key_name" {
  description = "Name of the SSH key pair to access the EC2 instance"
  type        = string
}

variable "ami_id" {
  description = "Optional: Custom AMI ID to launch from. If empty, uses latest Ubuntu 22.04"
  type        = string
  default     = ""
}

# RDS
variable "db_instance_class" {
  description = "RDS instance type"
  type        = string
  default     = "db.t3.micro" # Suitable for free-tier/low cost
}

variable "db_name" {
  description = "Name of the PostgreSQL database"
  type        = string
  default     = "dailymuse"
}

variable "db_username" {
  description = "Database administrator username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}
