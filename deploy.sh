#!/bin/bash
set -euo pipefail

cd /opt/learning-deployment

echo "Logging in to ECR..."
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"

echo "Pulling latest image..."
docker compose pull

echo "Recreating container..."
docker compose up -d --remove-orphans

echo "Cleaning up old images..."
docker image prune -f

echo "Deploy complete: $(date)"
