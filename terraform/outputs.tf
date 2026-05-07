output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "rds_endpoint" {
  description = "Endpoint for the RDS database"
  value       = aws_db_instance.postgres.endpoint
}

output "ec2_security_group_id" {
  description = "ID of the EC2 Security Group"
  value       = aws_security_group.ec2_sg.id
}

output "rds_security_group_id" {
  description = "ID of the RDS Security Group"
  value       = aws_security_group.rds_sg.id
}

output "current_ami_id" {
  description = "The AMI ID currently used by the EC2 instance"
  value       = aws_instance.app_server.ami
}

output "ssh_command" {
  description = "Command to SSH into the EC2 instance"
  value       = "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_instance.app_server.public_ip}"
}
