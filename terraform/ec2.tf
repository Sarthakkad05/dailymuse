# Get latest Ubuntu 22.04 AMI if var.ami_id is not provided
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Use custom AMI if provided, otherwise fallback to latest Ubuntu
locals {
  selected_ami = var.ami_id != "" ? var.ami_id : data.aws_ami.ubuntu.id
}

resource "aws_instance" "app_server" {
  ami           = local.selected_ami
  instance_type = var.instance_type
  key_name      = var.key_name
  subnet_id     = aws_subnet.public.id

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  # User data script for initial setup
  user_data = file("${path.module}/userdata/user-data.sh")

  # Ensure the instance has a public IP
  associate_public_ip_address = true

  root_block_device {
    volume_size = 20 # 20 GB root volume
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-app-server"
  }

  # Ignore changes to user_data and ami if we rebuild from our own AMI
  lifecycle {
    ignore_changes = [user_data, ami]
  }
}
