#!/bin/bash
set -e

# Log all output to /var/log/user-data.log
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "Starting user-data script execution..."

# 1. System Updates
apt-get update
apt-get upgrade -y

# 2. Install Dependencies
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    nginx

# 3. Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# 4. Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 5. Add ubuntu user to docker group
usermod -aG docker ubuntu

# 6. Create Application Directory
APP_DIR="/home/ubuntu/dailymuse"
mkdir -p $APP_DIR
mkdir -p $APP_DIR/nginx
chown -R ubuntu:ubuntu $APP_DIR

# 7. Configure Nginx
# Remove default nginx config
rm -f /etc/nginx/sites-enabled/default

# Note: The actual nginx.conf and docker-compose.yml will be pulled from Git or SCP'd
# But we can create a placeholder config here just in case, to proxy to port 3000
cat << 'EOF' > /etc/nginx/sites-available/dailymuse
server {
    listen 80;
    server_name _; # Catch-all

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
    }
}
EOF

ln -sf /etc/nginx/sites-available/dailymuse /etc/nginx/sites-enabled/
systemctl restart nginx
systemctl enable nginx

# 8. Start Docker Service
systemctl start docker
systemctl enable docker

echo "User-data script completed successfully!"
# Note: The application code and .env file should be deployed via CI/CD or manually (SCP) to $APP_DIR.
# Then run `docker-compose up -d` in that directory.
