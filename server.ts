/**
 * InfraJudge - REST API Server
 * 
 * To use:
 * 1. Install express: npm install express @types/express cors @types/cors
 * 2. Run: ts-node server.ts
 * 3. Open http://localhost:3000 in your browser
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { generateRecommendation } from './src/cloud-referee';
import { isErrorResponse } from './src/error-handling';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve landing page as default (BEFORE static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Serve form page
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve comparison page
app.get('/compare', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'compare.html'));
});

// Static files (this will serve other files like CSS, JS, images)
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'InfraJudge' });
});

// Main recommendation endpoint
app.post('/recommend', (req, res) => {
  try {
    const result = generateRecommendation(req.body);
    
    if (isErrorResponse(result)) {
      return res.status(400).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
      details: { error: error instanceof Error ? error.message : String(error) }
    });
  }
});

// Example endpoint showing sample request
app.get('/example', (req, res) => {
  res.json({
    message: 'POST to /recommend with this format:',
    example: {
      appType: 'Startup',
      budget: 'Low',
      expectedUsers: 1000,
      traffic: 'Low',
      securityLevel: 'Medium',
      workloadType: 'API-based'
    }
  });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 InfraJudge Server Started!');
  console.log('='.repeat(60));
  console.log(`\n🏠 Landing Page:  http://localhost:${PORT}/`);
  console.log(`📝 Form Page:     http://localhost:${PORT}/form`);
  console.log(`⚖️  Compare Page:  http://localhost:${PORT}/compare`);
  console.log(`🔌 API Health:    http://localhost:${PORT}/health`);
  console.log(`📡 API Endpoint:  POST http://localhost:${PORT}/recommend`);
  console.log('\n' + '='.repeat(60));
  console.log('💡 Open http://localhost:' + PORT + ' to see the landing page!\n');
});
