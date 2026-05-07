# DailyMuse AWS Redeployment Workflow

**Suggested filename:** `AWS_REDEPLOYMENT_WORKFLOW.md`

## Will `terraform destroy` terminate everything?

Yes.

Running:

```bash
terraform destroy
```

inside your Terraform directory will remove all AWS resources that Terraform created and manages.

This includes:

* EC2 instance
* RDS instance
* Security Groups
* VPC
* Subnets
* Internet Gateway
* Route Tables
* Networking resources

It will NOT remove:

* Your GitHub repository
* Your local project files
* Supabase project/data
* Local `.env` file
* Local `.pem` key file

---

# IMPORTANT BEFORE DESTROY

## 1. Save Your `.pem` File

Keep your AWS key safe:

```text
~/Downloads/dailymuse-key.pem
```

Do NOT delete it.

---

## 2. Push Latest Code To GitHub

Before destroying infrastructure:

```bash
git add .
git commit -m "latest deployment changes"
git push
```

---

## 3. Verify Terraform State Exists

Inside terraform folder:

```bash
ls
```

You should still see:

```text
terraform.tfstate
```

Terraform uses this to know what resources to destroy.

---

# HOW TO DESTROY EVERYTHING

## Step 1

Go to Terraform folder:

```bash
cd terraform
```

---

## Step 2

Run destroy:

```bash
terraform destroy
```

---

## Step 3

Type:

```text
yes
```

Terraform will begin deleting:

* EC2
* RDS
* networking
* security groups
* VPC

RDS deletion may take several minutes.

---

# HOW TO REDEPLOY LATER

# Step 1 — Go To Terraform Folder

```bash
cd terraform
```

---

# Step 2 — Apply Infrastructure

```bash
terraform apply
```

Type:

```text
yes
```

Terraform will recreate:

* EC2
* RDS
* VPC
* Security Groups
* Networking

Wait until complete.

---

# Step 3 — Copy Outputs

Terraform will output:

```text
ec2_public_ip
rds_endpoint
ssh_command
```

Save the new EC2 public IP.

IMPORTANT:

The IP changes every redeployment unless you use an Elastic IP.

---

# Step 4 — SSH Into EC2

```bash
ssh -i ~/Downloads/dailymuse-key.pem ubuntu@NEW_PUBLIC_IP
```

Replace:

```text
NEW_PUBLIC_IP
```

with the latest Terraform output.

---

# Step 5 — Clone GitHub Repo

Inside EC2:

```bash
cd /home/ubuntu

git clone https://github.com/Sarthakkad05/dailymuse.git

cd dailymuse
```

---

# Step 6 — Upload `.env`

From LOCAL machine:

```bash
scp -i ~/Downloads/dailymuse-key.pem .env ubuntu@NEW_PUBLIC_IP:/home/ubuntu/dailymuse/.env
```

---

# Step 7 — Add Swap Memory (IMPORTANT)

Inside EC2:

```bash
sudo fallocate -l 2G /swapfile

sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

free -h
```

This prevents Next.js Docker builds from crashing.

---

# Step 8 — Start Docker App

Inside EC2:

```bash
cd /home/ubuntu/dailymuse

sudo docker compose up -d --build
```

Wait several minutes for first build.

---

# Step 9 — Open Website

Use:

```text
http://NEW_PUBLIC_IP
```

Nginx proxies traffic to the Next.js container automatically.

---

# OPTIONAL FUTURE IMPROVEMENTS

Later you can improve the architecture with:

* Elastic IP
* HTTPS using Let's Encrypt
* GitHub Actions CI/CD
* AWS ECR
* CloudWatch monitoring
* AMI automation
* Full RDS migration
* Prisma integration

---

# CURRENT ARCHITECTURE

```text
Browser
   ↓
AWS EC2 (Docker + Nginx)
   ↓
Next.js App
   ↓
Supabase Auth + Database
```

AWS RDS currently exists mainly for:

* Terraform infrastructure learning
* Cloud architecture demonstration
* Future migration planning

---

# COST OPTIMIZATION STRATEGY

Current recommended workflow:

## Before interviews/demo

```bash
terraform apply
```

Deploy app and demo project.

## After interviews/demo

```bash
terraform destroy
```

Avoid unnecessary AWS costs.

This is a valid Infrastructure as Code workflow and is completely acceptable for portfolio/demo environments.
