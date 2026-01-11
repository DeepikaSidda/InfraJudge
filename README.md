# InfraJudge - AI-Powered AWS Architecture Advisor

An intelligent AWS service recommendation system that helps you choose the right AWS services for your application based on your specific requirements.

## 🚀 Quick Deploy (5 Minutes)

```bash
./deploy-full.sh
```

Your app will be live at: `http://infrajudge-app.s3-website-us-east-1.amazonaws.com`

See [QUICK-START.md](QUICK-START.md) for details.

## ✨ Features

- **🎯 Smart Recommendations**: AI-powered analysis of your requirements
- **⚖️ Service Comparisons**: Compare ALL AWS services side-by-side
- **💰 Cost Analysis**: Clear breakdown of costs and trade-offs
- **📊 Visual Diagrams**: Interactive architecture diagrams
- **🏆 Service Ratings**: 5-criteria ratings for every service
- **🎨 Beautiful UI**: Modern, animated interface

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (S3 + Static Hosting)
- **Backend**: TypeScript, Node.js, Express (Lambda + API Gateway)
- **Deployment**: Serverless Framework

## 📦 Local Development

```bash
# Install dependencies
npm install

# Run backend
ts-node server.ts

# Open browser
http://localhost:3000
```

## 🌐 Deployment

**Full deployment (Frontend + Backend):**
```bash
./deploy-full.sh
```

**Backend only:**
```bash
serverless deploy
```

**Frontend only:**
```bash
./deploy-s3.sh
```

## 💰 Cost

- **Free Tier**: First month FREE
- **Low Traffic**: ~$1-2/month
- **Scales automatically**




**Built with ❤️ using Kiro AI**
