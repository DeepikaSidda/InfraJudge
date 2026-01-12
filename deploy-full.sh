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
# Try multiple methods to get the API URL
API_URL=$(serverless info --verbose 2>&1 | grep -E "ANY - https://" | head -1 | awk '{print $3}' | sed 's|/{proxy+}||')

# If that didn't work, try getting it from the ServiceEndpoint output
if [ -z "$API_URL" ]; then
    API_URL=$(serverless info --verbose 2>&1 | grep "ServiceEndpoint:" | awk '{print $2}')
fi

# If still empty, try AWS CLI to get the API Gateway URL
if [ -z "$API_URL" ]; then
    STACK_NAME="infrajudge-api-prod"
    API_URL=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue' --output text 2>/dev/null)
fi

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

# Run deploy-s3.sh and capture the bucket name from its output
DEPLOY_OUTPUT=$(./deploy-s3.sh 2>&1)
echo "$DEPLOY_OUTPUT"

# Extract bucket name from the output
BUCKET_NAME=$(echo "$DEPLOY_OUTPUT" | grep "make_bucket:" | awk '{print $2}' | sed 's/s3:\/\///')

# If we couldn't extract it, try to get it from the Website URL line
if [ -z "$BUCKET_NAME" ]; then
    BUCKET_NAME=$(echo "$DEPLOY_OUTPUT" | grep "Website URL:" | sed 's/.*http:\/\/\(.*\)\.s3-website.*/\1/')
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend deployment failed${NC}"
    # Restore backup
    mv public/app.js.backup public/app.js
    exit 1
fi

# Remove backup
rm public/app.js.backup

# Get region from serverless.yml
REGION=$(grep "region:" serverless.yml | awk '{print $2}')
FRONTEND_URL="http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📍 Your Live URLs:${NC}"
echo ""
echo -e "Frontend: ${GREEN}${FRONTEND_URL}${NC}"
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
