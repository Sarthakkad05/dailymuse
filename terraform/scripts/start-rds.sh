#!/bin/bash
# Script to start the RDS instance to save costs

# You can hardcode this or pass it as an argument
DB_IDENTIFIER="dailymuse-db"
REGION="us-east-1"

echo "Starting RDS instance: $DB_IDENTIFIER in region $REGION..."

aws rds start-db-instance \
    --db-instance-identifier $DB_IDENTIFIER \
    --region $REGION

echo "Start command issued. It may take a few minutes for the instance to become available."
echo "You can check the status using:"
echo "aws rds describe-db-instances --db-instance-identifier $DB_IDENTIFIER --region $REGION --query 'DBInstances[0].DBInstanceStatus'"
