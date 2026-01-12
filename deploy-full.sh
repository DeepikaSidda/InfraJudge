#!/bin/bash

# InfraJudge Full Deployment Script
# Deploys both backend (Lambda) and frontend (S3)

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "🚀 InfraJudge Full Deployment"
echo "=============================="
echo ""

# Check if serverless is installed
if ! command -v serverless &> /dev/null; then
    echo -e "${RED}❌ Serverless Framework not found${NC}"
    echo "Installing Serverless Framework..."
    npm install -g serverless
fi

# Check AWS credentials
echo -e "${BLUE}Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    echo "Please run: aws configure"
    exit 1
fi
echo -e "${GREEN}✓ AWS credentials configured${NC}"
echo ""

# Step 1: Deploy Backend
echo -e "${BLUE}Step 1: Deploying Backend to Lambda...${NC}"
echo "This may take 2-3 minutes..."
echo ""

serverless deploy

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend deployment failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Backend deployed successfully!${NC}"
echo ""

# Extract API Gateway URL
API_URL=$(serverless info --verbose | grep "POST - " | awk '{print $3}' | sed 's|/recommend||')

if [ -z "$API_URL" ]; then
    echo -e "${YELLOW}⚠️  Could not automatically extract API URL${NC}"
    echo "Please manually get the API URL from the output above"
    echo "It should look like: https://abc123.execute-api.us-east-1.amazonaws.com/prod"
    echo ""
    read -p "Enter your API Gateway URL: " API_URL
fi

echo ""
echo -e "${GREEN}API Gateway URL: ${API_URL}${NC}"
echo ""

# Step 2: Update Frontend API URL
echo -e "${BLUE}Step 2: Updating Frontend API URL...${NC}"

# Backup original file
cp public/app.js public/app.js.backup

# Update API URL in app.js
sed -i.tmp "s|const API_URL = 'http://localhost:3000';|const API_URL = '${API_URL}';|g" public/app.js
rm public/app.js.tmp 2>/dev/null || true

echo -e "${GREEN}✓ Frontend API URL updated${NC}"
echo ""

# Step 3: Deploy Frontend
echo -e "${BLUE}Step 3: Deploying Frontend to S3...${NC}"
echo ""

chmod +x deploy-s3.sh
./deploy-s3.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend deployment failed${NC}"
    # Restore backup
    mv public/app.js.backup public/app.js
    exit 1
fi

# Remove backup
rm public/app.js.backup

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📍 Your Live URLs:${NC}"
echo ""
echo -e "Frontend: ${GREEN}http://infrajudge-app.s3-website-us-east-1.amazonaws.com${NC}"
echo -e "Backend:  ${GREEN}${API_URL}${NC}"
echo ""
echo -e "${YELLOW}🎉 Your app is now live! Share the frontend URL with anyone.${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Open the frontend URL in your browser"
echo "2. Test the recommendation form"
echo "3. Share the URL with others!"
echo ""
echo -e "${BLUE}To update your deployment:${NC}"
echo "- Backend: serverless deploy"
echo "- Frontend: ./deploy-s3.sh"
echo ""
