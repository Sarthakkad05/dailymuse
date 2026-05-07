#!/bin/bash
# Script to help update Terraform and apply to launch from a new AMI

echo "To launch from a new AMI, follow these steps:"
echo ""
echo "1. Ensure you have the new AMI ID (e.g., ami-0123456789abcdef0)"
echo "2. Edit your terraform.tfvars file and update the ami_id variable:"
echo "   ami_id = \"ami-0123456789abcdef0\""
echo ""
echo "3. Run terraform plan to verify the changes:"
echo "   cd terraform"
echo "   terraform plan"
echo ""
echo "4. Run terraform apply to recreate the EC2 instance:"
echo "   terraform apply"
echo ""
echo "Terraform will destroy the old instance and create a new one using the specified AMI."
echo "Since the AMI contains your Docker images and configuration, it will boot up faster than a fresh instance."
