# InfraJudge - AI-Powered AWS Architecture Advisor

InfraJudge is an intelligent web application that helps developers and architects design optimal AWS architectures using AI-powered recommendations and service comparisons.

## Features

### 🏗️ Know Your Architecture
- AI-powered architecture generation using AWS Bedrock Nova
- Interactive form with functional and non-functional requirements
- Detailed architecture recommendations with workflow diagrams
- Comprehensive service comparisons with ratings (Cost, Scalability, Performance, Ease of Use, Flexibility)
- Budget-aware recommendations (Low, Medium, High)

### ⚖️ Service Comparison
- Side-by-side comparison of AWS services
- AI-generated ratings and recommendations
- Detailed trade-off analysis
- Category-based service browsing (Compute, Database, Storage, API)

### 🎨 Modern UI/UX
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

## Usage

### For End Users

1. Visit the deployed website
2. Choose between:
   - **Know Your Architecture**: Generate custom AWS architecture
   - **Compare Services**: Compare AWS services side-by-side

### For Developers

#### Update Frontend
1. Make changes to files in `public/`
2. Run `deploy-s3.bat`
3. Run `invalidate-cloudfront.bat` to clear cache

#### Update Backend
1. Make changes to files in `src/`
2. Run `npm run build`
3. Run `deploy-architecture-api.bat`

## Configuration

### Bedrock Model Configuration
Located in `src/architecture-generator.ts`:
```typescript
const BEDROCK_MODEL = 'amazon.nova-lite-v1:0';
const REGION = 'us-east-1';
```

### Lambda Configuration
Located in `serverless.yml`:
```yaml
provider:
  runtime: nodejs18.x
  region: us-east-1
  memorySize: 1024
  timeout: 60
```

### IAM Permissions
The Lambda function requires:
```yaml
- bedrock:InvokeModel
```

## Troubleshooting

### Issue: "Failed to generate architecture"
- **Solution**: Check browser console for detailed errors
- Verify API endpoint URL is correct in `public/architecture.js`
- Ensure Bedrock model access is enabled
- Check Lambda CloudWatch logs

### Issue: Changes not appearing on website
- **Solution**: Clear CloudFront cache using `invalidate-cloudfront.bat`
- Hard refresh browser (Ctrl+F5)
- Clear browser cache

### Issue: Lambda timeout
- **Solution**: Increase timeout in `serverless.yml`
- Note: API Gateway has a 29-second timeout limit

### Issue: CORS errors
- **Solution**: CORS is already configured in Lambda handler
- Verify `Access-Control-Allow-Origin: *` header is present

## API Endpoints

### Generate Architecture
```
POST /prod/generate-architecture
```

**Request Body:**
```json
{
  "projectIdea": "A social media platform",
  "functionalRequirements": "User Authentication, File Upload",
  "nonFunctionalRequirements": "High Scalability, 99.9% Uptime",
  "expectedUsers": "50000",
  "budget": "Medium"
}
```

**Response:**
```json
{
  "overview": "Architecture overview...",
  "workflow": "Step-by-step workflow...",
  "services": "List of AWS services...",
  "justification": "Service justifications...",
  "comparison": "Comparison tables...",
  "notes": "Additional notes..."
}
```

## Cost Considerations

- **Serverless Framework**: FREE (open-source version)
- **AWS Bedrock**: Pay per token (input + output)
- **Lambda**: Free tier includes 1M requests/month
- **S3**: Minimal storage costs
- **CloudFront**: Free tier includes 1TB data transfer/month
- **API Gateway**: Free tier includes 1M requests/month

**Estimated monthly cost for moderate usage: $1-5** (mostly Bedrock API calls)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Check the Troubleshooting section
- Review AWS Bedrock documentation
- Check CloudWatch logs for Lambda errors
- Open an issue on GitHub

## Acknowledgments

- AWS Bedrock Nova for AI-powered recommendations
- AWS service icons from icepanel.io
- Built with ❤️ for cloud architects

---

**Live Demo**: https://dd9j9qxixxdz3.cloudfront.net

**API Endpoint**: https://9yas6oz7zh.execute-api.us-east-1.amazonaws.com/prod/generate-architecture
