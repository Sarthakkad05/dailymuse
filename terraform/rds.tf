resource "aws_db_instance" "postgres" {
  identifier           = "${var.project_name}-db"
  allocated_storage    = 20 # 20 GB
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16" # Choose your preferred version
  instance_class       = var.db_instance_class
  db_name              = var.db_name
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true # Set to false for production if you want backups on destroy

  # Networking and Security
  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false

  # Cost Optimization for portfolio
  multi_az = false

  tags = {
    Name = "${var.project_name}-rds-postgres"
  }
}
