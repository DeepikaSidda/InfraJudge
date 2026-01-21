/**
 * AWS Architecture Generator using Bedrock Nova
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

export interface ArchitectureRequest {
  projectIdea: string;
  functionalRequirements: string;
  nonFunctionalRequirements: string;
  expectedUsers?: string;
  budget: string;
}

export interface ArchitectureResponse {
  overview: string;
  workflow: string;
  services: string;
  justification: string;
  comparison: string;
  notes: string;
  diagram?: DiagramData;
}

export interface DiagramData {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

export interface DiagramNode {
  id: string;
  label: string;
  service: string;
  icon: string;
  layer: number;
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

const BEDROCK_MODEL = 'amazon.nova-lite-v1:0'; // Nova Lite model
const REGION = 'us-east-1';

export async function generateArchitecture(request: ArchitectureRequest): Promise<ArchitectureResponse> {
  try {
    const prompt = buildArchitecturePrompt(request);
    const response = await callBedrockNova(prompt);
    return parseArchitectureResponse(response);
  } catch (error) {
    console.error('Error generating architecture:', error);
    throw new Error('Failed to generate architecture');
  }
}

function buildArchitecturePrompt(request: ArchitectureRequest): string {
  return `You are an AWS Solution Architecture Generator powered by AWS Bedrock Nova.

Your task is to help users design the best possible AWS architecture based on their idea.

USER INPUT:
- Project Idea: ${request.projectIdea}
- Functional Requirements: ${request.functionalRequirements}
- Non-Functional Requirements: ${request.nonFunctionalRequirements}
- Expected Users/Traffic: ${request.expectedUsers || 'Not specified'}
- Budget: ${request.budget}

YOUR RESPONSIBILITIES:
1. Understand the Idea: Clearly interpret the user's problem statement and requirements. Identify key components such as frontend, backend, database, storage, analytics, AI/ML, security, and monitoring.

2. Generate AWS Architecture Workflow: Design a complete end-to-end AWS workflow architecture. Show how services interact step by step (request flow). Represent the architecture in a clear diagram-friendly structure.

3. Service Selection: Select the most suitable AWS services for each layer: Compute, Storage, Database, Networking, Security, AI/ML (if applicable), Monitoring & logging. Prioritize best practices, cost efficiency, scalability, and security.

4. Detailed Justification: For each selected AWS service, explain why this service is the best choice, how it meets requirements, and key benefits.

5. Comparison with Alternatives: Compare the chosen service with 1-2 alternative AWS services. Explain why alternatives were not chosen and trade-offs. Include detailed ratings for each service.

OUTPUT FORMAT (provide in this exact structure):

## A. Architecture Overview
[High-level summary of the solution in 2-3 paragraphs]

## B. Workflow Architecture Flow
[Step-by-step request/data flow, written in a way that can be converted into an architecture diagram]
1. User Request → ...
2. ... → ...
[Continue with numbered steps]

## C. AWS Services Used
[List of services with short descriptions]
- **Service Name**: Description
- **Service Name**: Description

## D. Detailed Service Justification
[Service-by-service explanation]
### Compute Layer
**Selected: [Service Name]**
- Why: [Explanation]
- Benefits: [List]

### Database Layer
**Selected: [Service Name]**
- Why: [Explanation]
- Benefits: [List]

[Continue for all layers]

## E. Comparison Table with Ratings
[IMPORTANT: Provide a comparison table for EVERY service category used in the architecture. If you use 6 different service categories, provide 6 comparison tables.]

### Compute Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | 4.5/5 | 5/5 | 4/5 | 4.5/5 | 5/5 | 4.6/5 | [Why chosen] |
| [Alt 1] | ✗ | 3/5 | 4/5 | 5/5 | 3/5 | 4/5 | 3.8/5 | [Why not chosen] |
| [Alt 2] | ✗ | 5/5 | 3/5 | 3/5 | 5/5 | 3/5 | 3.8/5 | [Why not chosen] |

### Database Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why chosen] |
| [Alt 1] | ✗ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why not chosen] |

### Storage Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why chosen] |
| [Alt 1] | ✗ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why not chosen] |

### Networking Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why chosen] |
| [Alt 1] | ✗ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why not chosen] |

### Security Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why chosen] |
| [Alt 1] | ✗ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why not chosen] |

### Monitoring Services Comparison
| Service | Selected | Cost Efficiency | Scalability | Performance | Ease of Use | Flexibility | Overall Score | Reason |
|---------|----------|----------------|-------------|-------------|-------------|-------------|---------------|--------|
| [Service] | ✓ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why chosen] |
| [Alt 1] | ✗ | [Rating] | [Rating] | [Rating] | [Rating] | [Rating] | [Score] | [Why not chosen] |

[Add more comparison tables for any other service categories used: API Gateway, Load Balancing, Caching, Message Queue, etc.]

**CRITICAL: You MUST provide a comparison table for EVERY service mentioned in section C (AWS Services Used). Do not skip any service category.**

**Rating Guidelines:**
- Cost Efficiency: How cost-effective is the service
- Scalability: How well it scales with demand
- Performance: Speed and reliability
- Ease of Use: How easy to set up and manage
- Flexibility: Customization and configuration options
- Overall Score: Average of all ratings

## F. Scalability, Security & Cost Notes
### Scalability
[How the architecture scales]

### Security
[Security considerations]

### Cost Optimization
[Cost optimization suggestions with estimated monthly costs]

Please provide a comprehensive, detailed response following this exact format with specific ratings for each service comparison.`;
}

async function callBedrockNova(prompt: string): Promise<string> {
  const client = new BedrockRuntimeClient({ region: REGION });

  const requestBody = {
    messages: [
      {
        role: 'user',
        content: [{ text: prompt }]
      }
    ],
    inferenceConfig: {
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.9
    }
  };

  const command = new InvokeModelCommand({
    modelId: BEDROCK_MODEL,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify(requestBody)
  });

  console.log('Calling Bedrock Nova...');
  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));

  if (responseBody.output?.message?.content?.[0]?.text) {
    return responseBody.output.message.content[0].text;
  }

  throw new Error('Invalid Bedrock response format');
}

function parseArchitectureResponse(response: string): ArchitectureResponse {
  // Extract sections using regex
  const sections = {
    overview: extractSection(response, 'A. Architecture Overview', 'B. Workflow'),
    workflow: extractSection(response, 'B. Workflow Architecture Flow', 'C. AWS Services'),
    services: extractSection(response, 'C. AWS Services Used', 'D. Detailed'),
    justification: extractSection(response, 'D. Detailed Service Justification', 'E. Comparison'),
    comparison: extractSection(response, 'E. Comparison Table', 'F. Scalability'),
    notes: extractSection(response, 'F. Scalability, Security & Cost Notes', null)
  };

  // Generate diagram data from workflow and services
  const diagram = generateDiagramData(sections.workflow, sections.services);

  return {
    overview: sections.overview || 'Architecture overview generated',
    workflow: sections.workflow || 'Workflow details generated',
    services: sections.services || 'Services list generated',
    justification: sections.justification || 'Service justifications generated',
    comparison: sections.comparison || 'Service comparisons generated',
    notes: sections.notes || 'Additional notes generated',
    diagram
  };
}

function generateDiagramData(workflow: string, services: string): DiagramData {
  const nodes: DiagramNode[] = [];
  const connections: DiagramConnection[] = [];
  
  // AWS service icon mapping - using icepanel.io icons (same as landing page)
  const serviceIcons: { [key: string]: string } = {
    'cloudfront': 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/CloudFront.svg',
    'route53': 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Route-53.svg',
    's3': 'https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg',
    'lambda': 'https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg',
    'api gateway': 'https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg',
    'dynamodb': 'https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg',
    'rds': 'https://icon.icepanel.io/AWS/svg/Database/RDS.svg',
    'cognito': 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Cognito.svg',
    'ec2': 'https://icon.icepanel.io/AWS/svg/Compute/EC2.svg',
    'ecs': 'https://icon.icepanel.io/AWS/svg/Containers/Elastic-Container-Service.svg',
    'eks': 'https://icon.icepanel.io/AWS/svg/Containers/Elastic-Kubernetes-Service.svg',
    'alb': 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Elastic-Load-Balancing.svg',
    'cloudwatch': 'https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg',
    'sns': 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Notification-Service.svg',
    'sqs': 'https://icon.icepanel.io/AWS/svg/App-Integration/Simple-Queue-Service.svg',
    'kinesis': 'https://icon.icepanel.io/AWS/svg/Analytics/Kinesis.svg',
    'elasticache': 'https://icon.icepanel.io/AWS/svg/Database/ElastiCache.svg',
    'vpc': 'https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Virtual-Private-Cloud.svg',
    'waf': 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/WAF.svg',
    'user': 'https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Identity-and-Access-Management.svg'
  };

  // Extract services from the services section
  const serviceMatches = services.match(/\*\*([^*]+)\*\*/g) || [];
  const detectedServices = serviceMatches.map(s => s.replace(/\*\*/g, '').toLowerCase());

  // Parse workflow to create nodes and connections
  const workflowLines = workflow.split('\n').filter(line => line.trim());
  let layer = 0;
  let previousNodeId: string | null = null;

  workflowLines.forEach((line, index) => {
    // Look for numbered steps or arrows
    const stepMatch = line.match(/^\d+\.\s*(.+?)(?:→|->|→|:)/);
    if (stepMatch) {
      const stepText = stepMatch[1].trim();
      
      // Try to identify the service
      let serviceName = 'unknown';
      let icon = serviceIcons['user'];
      
      for (const [key, iconUrl] of Object.entries(serviceIcons)) {
        if (stepText.toLowerCase().includes(key)) {
          serviceName = key;
          icon = iconUrl;
          break;
        }
      }

      const nodeId = `node-${index}`;
      nodes.push({
        id: nodeId,
        label: stepText.substring(0, 30) + (stepText.length > 30 ? '...' : ''),
        service: serviceName,
        icon: icon,
        layer: layer++
      });

      // Create connection from previous node
      if (previousNodeId) {
        connections.push({
          from: previousNodeId,
          to: nodeId
        });
      }

      previousNodeId = nodeId;
    }
  });

  // If no workflow nodes found, create nodes from detected services
  if (nodes.length === 0) {
    detectedServices.forEach((service, index) => {
      const icon = serviceIcons[service] || serviceIcons['user'];
      nodes.push({
        id: `service-${index}`,
        label: service.charAt(0).toUpperCase() + service.slice(1),
        service: service,
        icon: icon,
        layer: index
      });

      if (index > 0) {
        connections.push({
          from: `service-${index - 1}`,
          to: `service-${index}`
        });
      }
    });
  }

  return { nodes, connections };
}

function extractSection(text: string, startMarker: string, endMarker: string | null): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';

  const contentStart = startIndex + startMarker.length;
  const endIndex = endMarker ? text.indexOf(endMarker, contentStart) : text.length;
  
  if (endIndex === -1) {
    return text.substring(contentStart).trim();
  }

  return text.substring(contentStart, endIndex).trim();
}
