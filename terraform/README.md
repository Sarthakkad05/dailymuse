# DailyMuse AWS Infrastructure

This repository contains the Terraform Infrastructure as Code (IaC) configuration to deploy the DailyMuse GenAI journaling platform to AWS.

## Architecture Overview

The infrastructure follows a production-grade, cost-optimized architecture:
- **VPC & Subnets**: A custom VPC with 1 public subnet (for EC2) and 2 private subnets (for RDS DB Subnet Group).
- **Compute (EC2)**: An Ubuntu 22.04 instance running in the public subnet. Docker, Docker Compose, and Nginx are automatically installed via `user-data`.
- **Database (RDS)**: A Single-AZ PostgreSQL instance deployed in a private subnet, accessible *only* from the EC2 instance.
- **Security**: Strict Security Groups enforcing least-privilege access.
- **Cost Optimization**: Scripts are provided to stop the RDS instance and create AMIs of the EC2 instance, allowing you to tear down compute when not actively developing/showcasing.

## Prerequisites

1. **AWS CLI**: Installed and configured with your credentials (`aws configure`).
2. **Terraform**: Installed (version >= 1.5.0).
3. **SSH Key Pair**: Create an EC2 Key Pair in the AWS Console (e.g., `dailymuse-key`) and save the `.pem` file securely.

## Setup Instructions

### 1. Configure Terraform Variables

Navigate to the `terraform` directory and create your variables file:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your specific values:
- `key_name`: The name of your AWS SSH Key Pair.
- `db_username` and `db_password`: Secure credentials for your PostgreSQL database.

### 2. Provision Infrastructure

Initialize Terraform and apply the configuration:

```bash
terraform init
terraform plan
terraform apply
```

Review the planned changes and type `yes` to confirm. Once complete, Terraform will output your EC2 Public IP, RDS Endpoint, and other important details.

### 3. Deploy the Application

Since we are not storing secrets in Terraform state, you need to manually transfer your `.env` file to the newly created EC2 instance.

1. Create a `.env` file locally containing your Next.js and Database configurations:
   ```env
   DATABASE_URL="postgresql://<db_username>:<db_password>@<rds_endpoint>:5432/dailymuse"
   # Add your Gemini/OpenAI API keys here
   ```

2. SCP the `.env` file to the EC2 instance:
   ```bash
   scp -i /path/to/your-key.pem .env ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/dailymuse/.env
   ```

3. SSH into the instance and deploy:
   ```bash
   ssh -i /path/to/your-key.pem ubuntu@<EC2_PUBLIC_IP>
   cd /home/ubuntu/dailymuse
   # At this point, you would typically git clone your repo or copy the files over
   # Assuming files are present:
   sudo docker-compose up -d
   ```

## Cost Optimization & Lifecycle Management

To minimize AWS costs (especially for portfolio/showcase projects), you can stop the database and destroy the EC2 instance when not in use.

### Stopping the Infrastructure

1. **Stop RDS**:
   ```bash
   ./scripts/stop-rds.sh
   ```

2. **Create AMI** (Saves your EC2 state including Docker images):
   ```bash
   ./scripts/create-ami.sh <your-ec2-instance-id>
   ```

3. **Destroy EC2** (Optional, if you want to stop paying for the instance):
   Once the AMI is created, you can manually terminate the EC2 instance or run `terraform destroy -target=aws_instance.app_server`.

### Starting the Infrastructure

1. **Start RDS**:
   ```bash
   ./scripts/start-rds.sh
   ```

2. **Launch from AMI**:
   Update `terraform.tfvars` with the new `ami_id` generated previously, then run:
   ```bash
   terraform apply
   ```
   The new instance will boot up with all your previous configurations intact.

## Security Notes

- **DO NOT** commit `.env` or `terraform.tfvars` to version control. They are ignored in `.gitignore`.
- The RDS instance is intentionally placed in a private subnet and does not have a public IP.
- Consider restricting SSH (port 22) access in `security.tf` to your specific IP address rather than `0.0.0.0/0`.
