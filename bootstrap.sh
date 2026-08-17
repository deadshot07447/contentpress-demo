#!/bin/bash
set -e

# ContentPress - One-Click Server Bootstrap Script
# This script installs Docker, clones your repository, and starts the secure backend.
# Usage on a fresh Ubuntu EC2 instance:
# curl -sSL https://raw.githubusercontent.com/deadshot07447/contentpress-demo/main/bootstrap.sh | sudo bash -s -- your-domain.duckdns.org

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
  echo "Error: You must provide your domain name."
  echo "Usage: ./bootstrap.sh your-domain.duckdns.org"
  exit 1
fi

echo "🚀 Starting ContentPress Backend Bootstrap..."

echo "📦 Installing Docker and Docker Compose..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "📂 Cloning Repository..."
if [ -d "contentpress-demo" ]; then
  echo "Directory contentpress-demo already exists. Pulling latest changes..."
  cd contentpress-demo
  git pull origin main
else
  git clone https://github.com/deadshot07447/contentpress-demo.git
  cd contentpress-demo
fi

echo "🔐 Running Let's Encrypt SSL Setup & Starting Cluster..."
cd src/backend
export DOMAIN_NAME=$DOMAIN
chmod +x init-letsencrypt.sh
sudo -E ./init-letsencrypt.sh

echo "✅ Bootstrap Complete! Your backend is now live at https://$DOMAIN"
