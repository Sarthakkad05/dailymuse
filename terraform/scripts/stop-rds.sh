#!/bin/bash
# Script to stop the RDS instance to save costs

DB_IDENTIFIER="dailymuse-db"
REGION="us-east-1"

echo "Stopping RDS instance: $DB_IDENTIFIER in region $REGION..."

aws rds stop-db-instance \
    --db-instance-identifier $DB_IDENTIFIER \
    --region $REGION

echo "Stop command issued. Note: AWS will automatically restart a stopped RDS instance after 7 days."
echo "You can check the status using:"
echo "aws rds describe-db-instances --db-instance-identifier $DB_IDENTIFIER --region $REGION --query 'DBInstances[0].DBInstanceStatus'"
