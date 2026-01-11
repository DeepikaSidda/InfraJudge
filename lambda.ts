/**
 * AWS Lambda Handler for InfraJudge API
 * Wraps the Express server for Lambda deployment
 */

import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { generateRecommendation } from './src/cloud-referee';
import { isErrorResponse } from './src/error-handling';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Export handler for Lambda
export const handler = serverless(app);
