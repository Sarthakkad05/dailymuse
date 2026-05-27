output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}


output "current_ami_id" {
  description = "The AMI ID currently used by the EC2 instance"
  value       = aws_instance.app_server.ami
}

output "ssh_command" {
  description = "Command to SSH into the EC2 instance"
  value       = "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_instance.app_server.public_ip}"
}
