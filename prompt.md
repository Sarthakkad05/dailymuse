I have a Next.js project called DailyMuse. Here is the full context:

## Repo Structure
- Next.js app (TypeScript, pnpm, ESLint configured in eslint.config.mjs)
- Dockerfile + docker-compose.yml + nginx/ folder (Docker + Nginx setup)
- terraform/ folder with: ec2.tf, rds.tf, networking.tf, security.tf, 
  provider.tf, variables.tf, outputs.tf, versions.tf, scripts/, userdata/
- .github/workflows/ folder (currently empty)
- Deployed on Vercel at dailymuse-one.vercel.app

## Terraform Details
- Provider: AWS (hashicorp/aws ~> 5.0), Terraform >= 1.5.0
- Region: us-east-1 (var.aws_region)
- Infra: EC2 (t3.micro), RDS PostgreSQL (db.t3.micro), VPC, public/private 
  subnets, security groups, nginx reverse proxy
- Sensitive variables: key_name, db_username, db_password
- Backend: currently local (S3 backend is commented out in versions.tf) —
  we need to enable S3 backend as part of this setup

## Goal
Create 4 GitHub Actions workflow files inside .github/workflows/:

### 1. ci.yml
- Trigger: every push to any branch + every PR to main
- Steps: checkout → setup Node 20 → setup pnpm (use pnpm/action-setup@v4) 
  → cache pnpm store → pnpm install --frozen-lockfile → pnpm lint → pnpm build
- Pass NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY 
  as env vars from GitHub Secrets during build step

### 2. infra-up.yml
- Trigger: ONLY manual (workflow_dispatch) — no automatic triggers
- Steps:
  1. Checkout
  2. Setup Terraform ~> 1.5
  3. Configure AWS credentials from secrets
  4. terraform init (S3 backend)
  5. terraform fmt -check
  6. terraform validate
  7. terraform plan -out=tfplan
  8. terraform apply tfplan
  9. After apply: get EC2 public IP from terraform output
  10. SSH into EC2 using secret private key
  11. docker build + docker-compose up -d (pull latest code + restart containers)
  12. Print the live app URL at the end

### 3. infra-down.yml  
- Trigger: ONLY manual (workflow_dispatch)
- Steps:
  1. Checkout
  2. Setup Terraform ~> 1.5
  3. Configure AWS credentials from secrets
  4. terraform init (S3 backend)
  5. terraform destroy -auto-approve
  6. Print "All infrastructure destroyed successfully"

### 4. deploy.yml
- Trigger: ONLY manual (workflow_dispatch)
- Purpose: redeploy app to existing EC2 WITHOUT touching Terraform
- Steps:
  1. Checkout
  2. Configure AWS credentials
  3. Get EC2 IP (from a GitHub Secret or variable called EC2_PUBLIC_IP)
  4. SSH into EC2
  5. git pull latest code
  6. docker-compose down && docker-compose up -d --build
  7. Print confirmation

## GitHub Secrets to use (reference these exactly by name):
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY  
- TF_VAR_key_name         (EC2 key pair name)
- TF_VAR_db_username      (sensitive, passed as env var to terraform)
- TF_VAR_db_password      (sensitive, passed as env var to terraform)
- EC2_SSH_PRIVATE_KEY     (full private key content for SSH into EC2)
- EC2_PUBLIC_IP           (used in deploy.yml only)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## S3 Backend Setup
Also update terraform/versions.tf to uncomment and enable the S3 backend:
- bucket: "dailymuse-terraform-state"
- key: "state/terraform.tfstate"  
- region: "us-east-1"
- encrypt: true

And give me the exact AWS CLI commands to:
1. Create the S3 bucket
2. Enable versioning on it
3. Enable AES256 encryption
4. Run terraform init -migrate-state to move local state to S3

## Package Manager
Use pnpm everywhere — NOT npm or yarn.
pnpm-lock.yaml is the lockfile. Use --frozen-lockfile on install.

## Important Constraints
- infra-up, infra-down, deploy must NEVER trigger automatically
- Only ci.yml triggers on push/PR
- All secrets must come from GitHub Secrets, never hardcoded
- SSH steps should use appleboy/ssh-action@v1 for clean SSH execution
- Terraform steps should use hashicorp/setup-terraform@v3
- AWS credentials should use aws-actions/configure-aws-credentials@v4