#!/bin/bash

# InfraJudge S3 Deployment Script
# This script deploys the frontend to S3 and sets up static website hosting

set -e

echo "🚀 InfraJudge S3 Deployment Script"
echo "===================================="

# Configuration
# Generate unique bucket name using timestamp to avoid conflicts
TIMESTAMP=$(date +%s)
BUCKET_NAME="infrajudge-app-${TIMESTAMP}"
REGION="us-east-1"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}Step 1: Creating S3 bucket...${NC}"
aws s3 mb s3://${BUCKET_NAME} --region ${REGION} 2>/dev/null || echo "Bucket already exists"

echo ""
echo -e "${BLUE}Step 2: Configuring bucket for static website hosting...${NC}"
aws s3 website s3://${BUCKET_NAME} \
    --index-document landing.html \
    --error-document landing.html

echo ""
echo -e "${BLUE}Step 3: Setting bucket policy for public access...${NC}"
cat > bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
    --bucket ${BUCKET_NAME} \
    --policy file://bucket-policy.json

rm bucket-policy.json

echo ""
echo -e "${BLUE}Step 4: Disabling block public access...${NC}"
aws s3api put-public-access-block \
    --bucket ${BUCKET_NAME} \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo ""
echo -e "${BLUE}Step 5: Uploading files to S3...${NC}"
aws s3 sync ./public s3://${BUCKET_NAME}/ \
    --delete \
    --cache-control "max-age=3600" \
    --exclude "*.map"

# Set proper content types
echo ""
echo -e "${BLUE}Step 6: Setting content types...${NC}"
aws s3 cp s3://${BUCKET_NAME}/ s3://${BUCKET_NAME}/ \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --content-type "text/html" \
    --metadata-directive REPLACE

aws s3 cp s3://${BUCKET_NAME}/ s3://${BUCKET_NAME}/ \
    --recursive \
    --exclude "*" \
    --include "*.css" \
    --content-type "text/css" \
    --metadata-directive REPLACE

aws s3 cp s3://${BUCKET_NAME}/ s3://${BUCKET_NAME}/ \
    --recursive \
    --exclude "*" \
    --include "*.js" \
    --content-type "application/javascript" \
    --metadata-directive REPLACE

aws s3 cp s3://${BUCKET_NAME}/ s3://${BUCKET_NAME}/ \
    --recursive \
    --exclude "*" \
    --include "*.png" \
    --content-type "image/png" \
    --metadata-directive REPLACE

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "📍 Website URL: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
echo ""
echo -e "${RED}⚠️  IMPORTANT: Backend API Setup Required${NC}"
echo "The frontend is deployed, but you need to deploy the backend API separately."
echo "See deploy-backend.md for instructions."
echo ""
