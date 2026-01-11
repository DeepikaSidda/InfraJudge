# 🚀 Quick Start - Deploy InfraJudge in 5 Minutes

## One-Command Deployment

```bash
./deploy-full.sh
```

That's it! This script will:
1. ✅ Deploy backend to AWS Lambda
2. ✅ Deploy frontend to S3
3. ✅ Configure everything automatically
4. ✅ Give you a live URL to share

---

## Prerequisites (One-Time Setup)

### 1. Install AWS CLI
**Windows:**
```powershell
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Mac:**
```bash
brew install awscli
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configure AWS Credentials
```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key  
- Region: `us-east-1`
- Output format: `json`

### 3. Install Serverless Framework
```bash
npm install -g serverless
```

---

## Deploy Your App

```bash
./deploy-full.sh
```

Wait 2-3 minutes and you'll get your live URL! 🎉

---

## What You'll Get

**Frontend URL:**
```
http://infrajudge-app.s3-website-us-east-1.amazonaws.com
```

**Features:**
- ✅ Landing page with animations
- ✅ Service comparison tool
- ✅ AI-powered architecture recommendations
- ✅ Detailed service ratings and trade-offs

---

## Testing Your App

1. Open the frontend URL
2. Click "Get Started"
3. Fill out the form:
   - App Type: Startup
   - Budget: Low
   - Expected Users: 10000
   - Traffic: Medium
   - Security: Medium
   - Workload: API-based
4. Click "Generate Architecture"
5. See your recommendations! 🎯

---

## Updating Your App

**Update backend:**
```bash
serverless deploy
```

**Update frontend:**
```bash
./deploy-s3.sh
```

---

## Costs

- **Free Tier:** First month is FREE
- **After Free Tier:** ~$1-2/month for low traffic
- **High Traffic:** Scales automatically, pay only for what you use

---

## Troubleshooting

**Issue:** `serverless: command not found`
```bash
npm install -g serverless
```

**Issue:** `AWS credentials not configured`
```bash
aws configure
```

**Issue:** `Permission denied: ./deploy-full.sh`
```bash
chmod +x deploy-full.sh
```

**Issue:** API calls fail
- Check that `public/app.js` has the correct API URL
- Test API: `curl https://YOUR-API-URL/prod/health`

---

## Delete Everything

```bash
# Delete backend
serverless remove

# Delete frontend
aws s3 rb s3://infrajudge-app --force
```

---

## Need Help?

Check the detailed guide: `DEPLOYMENT.md`
