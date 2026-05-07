terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # For a portfolio, local state is used by default.
  # To use an S3 backend for production, uncomment and configure:
  # backend "s3" {
  #   bucket         = "dailymuse-terraform-state"
  #   key            = "state/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "terraform-lock"
  # }
}
