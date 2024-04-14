#!/bin/bash

# Update and upgrade package lists
echo "Updating package lists..."
sudo apt update && sudo apt upgrade -y

# Install Docker prerequisites
echo "Installing Docker prerequisites..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker repository
echo "Adding Docker repository..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Update repository list
sudo apt update

# Install Docker engine
echo "Installing Docker engine..."
sudo apt install docker-ce -y

# Enable Docker service
echo "Enabling Docker service..."
sudo systemctl enable docker

# Check Docker status
echo "Checking Docker status..."
systemctl status docker

# Install Git
echo "Installing Git..."
sudo apt install git -y

# Clone Git repository
echo "Cloning Git repository: https://github.com/TheRealSageKing/tour-booking-app"
git clone https://github.com/TheRealSageKing/tour-booking-app tour-booking-app  # Replace with your project name

# Navigate to project directory
cd tour-booking-app

# Build Docker image (assuming Dockerfile exists)
echo "Building Docker image..."
docker build -t tour-booking-app .  # Replace with your project name (optional)

# After building the Docker image...
echo "Run the built image"
docker run --name tour-booking-app tour-booking-app # Replace with your project name (optional)

echo "Docker setup and build completed!

