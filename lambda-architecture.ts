/**
 * AWS Lambda Handler for Architecture Generator
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateArchitecture, ArchitectureRequest } from './src/architecture-generator';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const request: ArchitectureRequest = JSON.parse(event.body);

    // Validate required fields
    if (!request.projectIdea || !request.functionalRequirements || !request.nonFunctionalRequirements) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    console.log('Generating architecture for:', request.projectIdea);

    // Generate architecture using Bedrock
    const result = await generateArchitecture(request);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate architecture',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
