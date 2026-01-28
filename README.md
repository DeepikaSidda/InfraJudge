# InfraJudge - AI-Powered AWS Architecture Advisor

InfraJudge is an intelligent web application that helps developers and architects design optimal AWS architectures using AI-powered recommendations and service comparisons.

**Live Demo**: https://dd9j9qxixxdz3.cloudfront.net

## Features

###  Know Your Architecture
- AI-powered architecture generation using AWS Bedrock Nova
- Interactive form with functional and non-functional requirements
- Detailed architecture recommendations with workflow diagrams
- Comprehensive service comparisons with ratings (Cost, Scalability, Performance, Ease of Use, Flexibility)
- Budget-aware recommendations (Low, Medium, High)

###  Service Comparison
- Side-by-side comparison of AWS services
- AI-generated ratings and recommendations
- Detailed trade-off analysis
- Category-based service browsing (Compute, Database, Storage, API)

###  Modern UI/UX
- Animated background with floating AWS service icons
- Responsive design
- Clean, intuitive interface
- Real-time architecture generation

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: AWS Lambda (Node.js 18.x)
- **AI Model**: AWS Bedrock Nova Lite (`amazon.nova-lite-v1:0`)
- **Infrastructure**: AWS S3, CloudFront, API Gateway
- **Deployment**: Serverless Framework (Open Source - FREE)

## Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v18 or higher)
2. **npm** (comes with Node.js)
3. **AWS Account** with appropriate permissions
4. **AWS CLI** configured with credentials
5. **Serverless Framework** installed globally (FREE open-source version)

```bash
npm install -g serverless
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/DeepikaSidda/InfraJudge.git
cd InfraJudge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure AWS Credentials
Make sure your AWS CLI is configured:
```bash
aws configure
```

You'll need:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)

### 4. Enable AWS Bedrock Access
Ensure your AWS account has access to AWS Bedrock Nova Lite model:
- Go to AWS Bedrock console
- Request access to `amazon.nova-lite-v1:0` model
- Wait for approval (usually instant)

## Deployment

### Deploy Backend (Lambda API)

1. Build TypeScript:
```bash
npm run build
```

2. Deploy Lambda function:
```bash
serverless deploy
```

Or use the provided script:
```bash
deploy-architecture-api.bat
```

This will output your API endpoint URL. Copy it for the next step.

### Deploy Frontend (S3 + CloudFront)

1. Create an S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

2. Enable static website hosting:
```bash
aws s3 website s3://your-bucket-name --index-document landing.html
```

3. Update the API URL in `public/architecture.js`:
```javascript
const API_URL = 'YOUR_API_GATEWAY_URL/prod/generate-architecture';
```

4. Deploy frontend files:
```bash
deploy-s3.bat
```

Or manually:
```bash
aws s3 sync public/ s3://your-bucket-name/
```

### Set Up CloudFront (Optional but Recommended)

1. Create a CloudFront distribution pointing to your S3 bucket
2. Enable HTTPS
3. Update DNS records if using custom domain

### Clear CloudFront Cache (After Updates)

```bash
invalidate-cloudfront.bat
```

Or manually:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Project Structure

```
infrajudge/
├── public/                          # Frontend files
│   ├── landing.html                 # Landing page
│   ├── landing.js                   # Landing page logic
│   ├── landing-styles.css           # Landing page styles
│   ├── compare.html                 # Service comparison page
│   ├── compare.js                   # Comparison logic
│   ├── compare-styles.css           # Comparison styles
│   ├── architecture.html            # Architecture generator page
│   ├── architecture.js              # Architecture logic
│   ├── architecture-styles.css      # Architecture styles
│   └── hero-image.png               # Hero image
├── src/                             # Backend source code
│   ├── architecture-generator.ts    # Architecture generation logic
│   └── types.ts                     # TypeScript type definitions
├── lambda-architecture.ts           # Lambda handler
├── serverless.yml                   # Serverless configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
├── deploy-s3.bat                    # Frontend deployment script
├── deploy-architecture-api.bat      # Backend deployment script
└── invalidate-cloudfront.bat        # Cache invalidation script
```



## Cost Considerations

- **Serverless Framework**: FREE (open-source version)
- **AWS Bedrock**: Pay per token (input + output)
- **Lambda**: Free tier includes 1M requests/month
- **S3**: Minimal storage costs
- **CloudFront**: Free tier includes 1TB data transfer/month
- **API Gateway**: Free tier includes 1M requests/month

**Estimated monthly cost for moderate usage: $1-5** (mostly Bedrock API calls)



## Acknowledgments

- AWS Bedrock Nova for AI-powered recommendations
- AWS service icons from icepanel.io
- Built with ❤️ for cloud architects

---



