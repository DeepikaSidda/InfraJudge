# Backend Deployment Guide

Since InfraJudge has a backend API (server.ts), you have two deployment options:

## Option 1: Deploy Backend to AWS Lambda + API Gateway (Recommended)

### Step 1: Install Serverless Framework
```bash
npm install -g serverless
npm install --save-dev serverless-offline
```

### Step 2: Create serverless.yml (already created for you)
The `serverless.yml` file configures Lambda deployment.

### Step 3: Deploy Backend
```bash
# Deploy to AWS
serverless deploy

# This will output your API endpoint URL
# Example: https://abc123.execute-api.us-east-1.amazonaws.com/prod
```

### Step 4: Update Frontend API URL
After deployment, update the API URL in `public/app.js`:
```javascript
const API_URL = 'https://YOUR-API-GATEWAY-URL.amazonaws.com/prod';
```

### Step 5: Redeploy Frontend
```bash
./deploy-s3.sh
```

---

## Option 2: Deploy Backend to EC2 or Elastic Beanstalk

### EC2 Deployment
1. Launch an EC2 instance (t2.micro for free tier)
2. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
3. Install dependencies: `npm install`
4. Run with PM2: `pm2 start server.ts --interpreter ts-node`
5. Configure security group to allow port 3000
6. Update frontend API URL to: `http://YOUR-EC2-IP:3000`

### Elastic Beanstalk Deployment
1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init -p node.js-18 infrajudge-api`
3. Create environment: `eb create infrajudge-api-env`
4. Deploy: `eb deploy`
5. Get URL: `eb status`
6. Update frontend API URL

---

## Option 3: Keep Backend Local (Development Only)

If you just want to test:
1. Run backend locally: `ts-node server.ts`
2. Deploy only frontend to S3
3. Access via: `http://infrajudge-app.s3-website-us-east-1.amazonaws.com`
4. Note: API calls will fail unless you enable CORS and run backend locally

---

## Recommended Architecture

For production, use:
- **Frontend**: S3 + CloudFront (CDN)
- **Backend**: Lambda + API Gateway (serverless)
- **Cost**: ~$1-5/month for low traffic

This gives you:
- ✅ Automatic scaling
- ✅ High availability
- ✅ Low cost
- ✅ No server management
