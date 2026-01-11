# InfraJudge - Full Deployment Guide

Complete guide to deploy InfraJudge with S3 (frontend) + Lambda (backend).

## Prerequisites

1. **AWS Account** with credentials configured
2. **AWS CLI** installed and configured (`aws configure`)
3. **Node.js** 18+ installed
4. **Serverless Framework** (we'll install this)

---

## Step 1: Install Serverless Framework

```bash
npm install -g serverless
```

Verify installation:
```bash
serverless --version
```

---

## Step 2: Configure AWS Credentials (if not done)

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `us-east-1`
- Default output format: `json`

---

## Step 3: Deploy Backend API to Lambda

```bash
# Deploy the backend
serverless deploy
```

This will:
- Create a Lambda function
- Create an API Gateway
- Output your API endpoint URL

**IMPORTANT:** Copy the API endpoint URL from the output. It will look like:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
```

---

## Step 4: Update Frontend API URL

Open `public/app.js` and find this line (around line 13):
```javascript
const API_URL = 'http://localhost:3000';
```

Replace it with your Lambda API URL:
```javascript
const API_URL = 'https://YOUR-API-GATEWAY-URL.amazonaws.com/prod';
```

**Example:**
```javascript
const API_URL = 'https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod';
```

---

## Step 5: Deploy Frontend to S3

Make the deployment script executable:
```bash
chmod +x deploy-s3.sh
```

Run the deployment:
```bash
./deploy-s3.sh
```

This will:
- Create an S3 bucket named `infrajudge-app`
- Configure it for static website hosting
- Upload all files from the `public` folder
- Set proper permissions

---

## Step 6: Get Your Live URLs

After deployment completes, you'll see:

**Frontend URL:**
```
http://infrajudge-app.s3-website-us-east-1.amazonaws.com
```

**Backend API URL:**
```
https://YOUR-API-GATEWAY-URL.amazonaws.com/prod
```

---

## Testing Your Deployment

1. Open the frontend URL in your browser
2. Click "Get Started" 
3. Fill out the form
4. Click "Generate Architecture"
5. You should see recommendations with service comparisons!

---

## Troubleshooting

### Issue: API calls fail with CORS error

**Solution:** The Lambda function already has CORS enabled. If you still see errors, check that you updated the API_URL in `public/app.js` correctly.

### Issue: S3 bucket already exists

**Solution:** Either:
- Delete the existing bucket: `aws s3 rb s3://infrajudge-app --force`
- Or change the bucket name in `deploy-s3.sh` (line 11)

### Issue: Serverless deploy fails

**Solution:** Make sure:
- AWS credentials are configured: `aws sts get-caller-identity`
- You have permissions to create Lambda functions and API Gateway
- Node.js version is 18+: `node --version`

### Issue: Lambda function times out

**Solution:** The timeout is set to 30 seconds in `serverless.yml`. If needed, increase it:
```yaml
timeout: 60
```

---

## Updating Your Deployment

### Update Backend:
```bash
serverless deploy
```

### Update Frontend:
```bash
./deploy-s3.sh
```

---

## Cost Estimate

- **S3 Storage:** ~$0.023/GB/month (your app is ~5MB = $0.12/month)
- **S3 Requests:** First 2,000 GET requests free, then $0.0004/1000 requests
- **Lambda:** 1M requests free/month, then $0.20/1M requests
- **API Gateway:** 1M requests free/month, then $3.50/1M requests

**Total for low traffic:** ~$0-2/month (mostly free tier)

---

## Cleanup (Delete Everything)

If you want to remove everything:

```bash
# Delete backend
serverless remove

# Delete frontend
aws s3 rb s3://infrajudge-app --force
```

---

## Next Steps (Optional)

### Add Custom Domain
1. Register domain in Route 53
2. Create CloudFront distribution
3. Add SSL certificate
4. Point domain to CloudFront

### Add CloudFront CDN
```bash
# Create CloudFront distribution for faster global access
aws cloudfront create-distribution --origin-domain-name infrajudge-app.s3-website-us-east-1.amazonaws.com
```

### Monitor Usage
- Check Lambda logs: `serverless logs -f api`
- Check API Gateway metrics in AWS Console
- Set up CloudWatch alarms for errors

---

## Support

If you encounter issues:
1. Check AWS CloudWatch logs for Lambda errors
2. Check browser console for frontend errors
3. Verify API URL is correct in `public/app.js`
4. Test API directly: `curl https://YOUR-API-URL/prod/health`
