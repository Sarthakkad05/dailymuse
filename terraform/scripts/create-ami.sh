#!/bin/bash
# Script to create an AMI from an EC2 instance

if [ -z "$1" ]; then
    echo "Usage: ./create-ami.sh <instance-id> [region]"
    echo "Example: ./create-ami.sh i-0123456789abcdef0 us-east-1"
    exit 1
fi

INSTANCE_ID=$1
REGION=${2:-"us-east-1"}
DATE=$(date +%Y-%m-%d-%H-%M)
AMI_NAME="dailymuse-app-server-$DATE"

echo "Creating AMI '$AMI_NAME' from instance '$INSTANCE_ID' in region '$REGION'..."

AMI_ID=$(aws ec2 create-image \
    --instance-id $INSTANCE_ID \
    --name "$AMI_NAME" \
    --description "AMI for DailyMuse app server created on $DATE" \
    --no-reboot \
    --region $REGION \
    --query 'ImageId' \
    --output text)

if [ $? -eq 0 ]; then
    echo "Successfully initiated AMI creation."
    echo "AMI ID: $AMI_ID"
    echo "Status: pending (It will take a few minutes to complete)"
    echo ""
    echo "To update your Terraform to use this AMI, edit terraform.tfvars:"
    echo "ami_id = \"$AMI_ID\""
    echo ""
    echo "To check the status:"
    echo "aws ec2 describe-images --image-ids $AMI_ID --region $REGION --query 'Images[0].State'"
else
    echo "Failed to create AMI."
fi
