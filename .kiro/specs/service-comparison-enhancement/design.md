# Design Document: Enhanced Service Comparison Display

## Overview

This design enhances the InfraJudge recommendation system to provide comprehensive service comparisons showing all AWS service alternatives with detailed ratings, trade-off analysis, and optional AI-powered insights using AWS Bedrock.

The current system recommends a single service per layer but doesn't clearly show what alternatives were considered or why they weren't chosen. This enhancement will display all evaluated services side-by-side with detailed comparisons, helping users make informed decisions.

## Architecture

### High-Level Flow

```
User Submits Form
    ↓
Backend Generates Recommendations (existing)
    ↓
NEW: Enhanced Comparison Data Structure
    ↓
Frontend Displays:
  - Recommended Service (highlighted)
  - Alternative Services (with ratings)
  - Side-by-Side Comparison Tables
  - Trade-off Analysis
  - Optional AI-Generated Insights
```

### Component Interaction

1. **Frontend (app.js)**: Enhanced result display with comparison cards
2. **Backend (cloud-referee.ts)**: Existing comparison logic (no changes needed)
3. **Output Formatter (output-formatter.ts)**: Enhanced to include all service alternatives
4. **Optional: AWS Bedrock Integration**: For AI-powered comparison insights

## Components and Interfaces

### 1. Enhanced Comparison Data Structure

```typescript
interface ServiceComparison {
  serviceName: string;
  ratings: {
    costEfficiency: number;      // 1-5
    scalability: number;          // 1-5
    easeOfUse: number;           // 1-5
    performance: number;          // 1-5
    flexibility: number;          // 1-5
  };
  overallScore: number;           // Average of ratings
  pros: string[];                 // What you gain
  cons: string[];                 // What you sacrifice
  bestFor: string;                // Use case description
  isRecommended: boolean;         // Highlight recommended service
}

interface LayerComparison {
  layerName: string;              // "Compute", "Database", etc.
  services: ServiceComparison[];  // All evaluated services
  recommendedService: string;     // Name of recommended service
  reasoning: string;              // Why this service was chosen
}

interface EnhancedOutput extends FormattedOutput {
  layerComparisons: LayerComparison[];  // NEW: Detailed comparisons
  aiInsights?: string;                   // Optional AI-generated insights
}
```

### 2. Frontend Display Components

#### Comparison Card Component
```javascript
function renderComparisonCard(layerComparison) {
  return `
    <div class="comparison-card">
      <h3>${layerComparison.layerName} Services</h3>
      
      <!-- Recommended Service (highlighted) -->
      <div class="service-option recommended">
        ${renderServiceDetails(recommendedService, true)}
      </div>
      
      <!-- Alternative Services -->
      ${layerComparison.services
        .filter(s => !s.isRecommended)
        .map(s => renderServiceDetails(s, false))
        .join('')}
      
      <!-- Comparison Table -->
      ${renderComparisonTable(layerComparison.services)}
      
      <!-- Trade-off Analysis -->
      ${renderTradeoffAnalysis(layerComparison)}
    </div>
  `;
}
```

#### Service Details Component
```javascript
function renderServiceDetails(service, isRecommended) {
  return `
    <div class="service-details ${isRecommended ? 'recommended' : 'alternative'}">
      <div class="service-header">
        <h4>${service.serviceName}</h4>
        ${isRecommended ? '<span class="badge">Recommended</span>' : ''}
        <span class="overall-score">${service.overallScore}/5</span>
      </div>
      
      <!-- Ratings Bars -->
      <div class="ratings-grid">
        ${renderRatingBar('Cost Efficiency', service.ratings.costEfficiency)}
        ${renderRatingBar('Scalability', service.ratings.scalability)}
        ${renderRatingBar('Ease of Use', service.ratings.easeOfUse)}
        ${renderRatingBar('Performance', service.ratings.performance)}
        ${renderRatingBar('Flexibility', service.ratings.flexibility)}
      </div>
      
      <!-- Pros/Cons -->
      <div class="pros-cons">
        <div class="pros">
          <h5>✓ Strengths</h5>
          <ul>${service.pros.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
        <div class="cons">
          <h5>⚠ Limitations</h5>
          <ul>${service.cons.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
      </div>
      
      <!-- Best For -->
      <div class="best-for">
        <strong>Best For:</strong> ${service.bestFor}
      </div>
    </div>
  `;
}
```

#### Comparison Table Component
```javascript
function renderComparisonTable(services) {
  return `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Overall Score</th>
          <th>Cost</th>
          <th>Scalability</th>
          <th>Performance</th>
          <th>Best For</th>
        </tr>
      </thead>
      <tbody>
        ${services.map(s => `
          <tr class="${s.isRecommended ? 'recommended-row' : ''}">
            <td><strong>${s.serviceName}</strong></td>
            <td>${s.overallScore}/5</td>
            <td>${renderRatingCell(s.ratings.costEfficiency)}</td>
            <td>${renderRatingCell(s.ratings.scalability)}</td>
            <td>${renderRatingCell(s.ratings.performance)}</td>
            <td>${s.bestFor}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
```

### 3. Backend Enhancement (Optional)

The existing backend already generates comparison data. We just need to enhance the output formatter to include all services, not just the recommended one.

```typescript
// In output-formatter.ts
function formatLayerComparisons(
  comparisons: ServiceComparison[],
  decisions: ServiceDecision[]
): LayerComparison[] {
  return [
    {
      layerName: 'Compute',
      services: [
        createServiceComparison('Lambda', comparisons[0], decisions[0]),
        createServiceComparison('EC2', comparisons[0], decisions[0]),
        createServiceComparison('ECS', comparisons[0], decisions[0])
      ],
      recommendedService: decisions[0].selectedService,
      reasoning: decisions[0].reasoning
    },
    // ... similar for Database, Storage, API layers
  ];
}

function createServiceComparison(
  serviceName: string,
  comparison: any,
  decision: ServiceDecision
): ServiceComparison {
  return {
    serviceName,
    ratings: getServiceRatings(serviceName),
    overallScore: calculateOverallScore(serviceName),
    pros: getServicePros(serviceName),
    cons: getServiceCons(serviceName),
    bestFor: getServiceBestFor(serviceName),
    isRecommended: serviceName === decision.selectedService
  };
}
```

### 4. AWS Bedrock Integration (Optional)

```typescript
// New file: src/ai-comparison.ts
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

interface AIComparisonRequest {
  userContext: UserContext;
  services: string[];
  layerName: string;
}

async function generateAIComparison(request: AIComparisonRequest): Promise<string> {
  const client = new BedrockRuntimeClient({ region: 'us-east-1' });
  
  const prompt = `
You are an AWS architecture expert. Compare these ${request.layerName} services for the following project:

Project Requirements:
- App Type: ${request.userContext.appType}
- Budget: ${request.userContext.budget}
- Expected Users: ${request.userContext.expectedUsers}
- Traffic: ${request.userContext.traffic}
- Security: ${request.userContext.securityLevel}
- Workload: ${request.userContext.workloadType}
${request.userContext.projectDescription ? `- Description: ${request.userContext.projectDescription}` : ''}

Services to Compare: ${request.services.join(', ')}

Provide a detailed comparison explaining:
1. Which service is best for this specific project and why
2. What trade-offs exist between the services
3. Specific scenarios where each service would be the better choice
4. Cost implications for this use case

Be specific and reference the user's requirements.
`;

  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content[0].text;
  } catch (error) {
    console.error('AI comparison failed:', error);
    return ''; // Fall back to rule-based comparison
  }
}
```

## Data Models

### Service Ratings Database

```typescript
const SERVICE_RATINGS = {
  Lambda: {
    costEfficiency: 5,
    scalability: 5,
    easeOfUse: 5,
    performance: 4,
    flexibility: 3,
    pros: [
      'Pay only for execution time',
      'Automatic scaling',
      'No server management',
      'Built-in high availability'
    ],
    cons: [
      '15-minute execution limit',
      'Cold start latency',
      'Limited runtime customization',
      'Vendor lock-in'
    ],
    bestFor: 'Event-driven workloads, APIs with variable traffic, serverless architectures'
  },
  EC2: {
    costEfficiency: 3,
    scalability: 4,
    easeOfUse: 2,
    performance: 5,
    flexibility: 5,
    pros: [
      'Full control over environment',
      'No execution time limits',
      'Custom hardware configurations',
      'Persistent storage'
    ],
    cons: [
      'Higher baseline costs',
      'Manual scaling configuration',
      'Server maintenance required',
      'More complex setup'
    ],
    bestFor: 'Long-running processes, custom requirements, legacy applications, high-performance computing'
  },
  ECS: {
    costEfficiency: 4,
    scalability: 5,
    easeOfUse: 3,
    performance: 5,
    flexibility: 4,
    pros: [
      'Container orchestration',
      'Efficient resource utilization',
      'Microservices support',
      'Integration with AWS services'
    ],
    cons: [
      'Container learning curve',
      'More complex than Lambda',
      'Requires container management',
      'Additional configuration needed'
    ],
    bestFor: 'Microservices architectures, containerized applications, DevOps workflows'
  },
  DynamoDB: {
    costEfficiency: 4,
    scalability: 5,
    easeOfUse: 5,
    performance: 5,
    flexibility: 3,
    pros: [
      'Millisecond latency',
      'Automatic scaling',
      'Fully managed',
      'Built-in replication'
    ],
    cons: [
      'Limited query flexibility',
      'Requires careful data modeling',
      'No complex joins',
      'Learning curve for NoSQL'
    ],
    bestFor: 'High-scale applications, simple access patterns, key-value storage, mobile backends'
  },
  RDS: {
    costEfficiency: 3,
    scalability: 3,
    easeOfUse: 4,
    performance: 5,
    flexibility: 5,
    pros: [
      'SQL support',
      'Complex queries and joins',
      'ACID transactions',
      'Familiar relational model'
    ],
    cons: [
      'Manual scaling',
      'Higher costs at scale',
      'Requires capacity planning',
      'Backup management'
    ],
    bestFor: 'Complex queries, relational data, ACID requirements, existing SQL applications'
  },
  S3: {
    costEfficiency: 5,
    scalability: 5,
    easeOfUse: 5,
    performance: 4,
    flexibility: 4,
    pros: [
      'Extremely low cost',
      'Unlimited storage',
      'High durability (99.999999999%)',
      'Versioning and lifecycle policies'
    ],
    cons: [
      'Not suitable for databases',
      'Higher latency than EBS',
      'No file system interface',
      'Eventual consistency'
    ],
    bestFor: 'Object storage, backups, static assets, data lakes, archives'
  },
  EBS: {
    costEfficiency: 3,
    scalability: 2,
    easeOfUse: 4,
    performance: 5,
    flexibility: 3,
    pros: [
      'Low latency',
      'High IOPS',
      'Snapshot backups',
      'Encryption support'
    ],
    cons: [
      'Single AZ only',
      'Attached to one instance',
      'Manual scaling',
      'Higher cost than S3'
    ],
    bestFor: 'Database storage, boot volumes, high-performance applications, block storage'
  },
  EFS: {
    costEfficiency: 3,
    scalability: 5,
    easeOfUse: 5,
    performance: 4,
    flexibility: 4,
    pros: [
      'Shared file system',
      'Automatic scaling',
      'Multi-AZ access',
      'NFS protocol'
    ],
    cons: [
      'Higher cost than S3',
      'Lower performance than EBS',
      'Requires VPC',
      'Limited to Linux'
    ],
    bestFor: 'Shared file storage, content management, web serving, container storage'
  },
  'API Gateway': {
    costEfficiency: 4,
    scalability: 5,
    easeOfUse: 5,
    performance: 4,
    flexibility: 4,
    pros: [
      'Serverless integration',
      'Built-in throttling',
      'API versioning',
      'Request/response transformation'
    ],
    cons: [
      'Cost at high scale',
      '29-second timeout',
      'Limited WebSocket support',
      'Vendor lock-in'
    ],
    bestFor: 'Serverless APIs, microservices, mobile backends, low-medium traffic'
  },
  ALB: {
    costEfficiency: 4,
    scalability: 5,
    easeOfUse: 4,
    performance: 5,
    flexibility: 4,
    pros: [
      'High performance',
      'Cost-effective at scale',
      'Advanced routing',
      'WebSocket support'
    ],
    cons: [
      'Requires target instances',
      'More configuration',
      'Not serverless',
      'Minimum hourly cost'
    ],
    bestFor: 'High-traffic applications, container services, traditional architectures, WebSocket apps'
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: All Services Displayed
*For any* service layer (Compute, Database, Storage, API), the system should display at least 2 service alternatives in addition to the recommended service.
**Validates: Requirements 1.2**

### Property 2: Ratings Completeness
*For any* displayed service, all 5 rating criteria (Cost Efficiency, Scalability, Ease of Use, Performance, Flexibility) should have values between 1 and 5.
**Validates: Requirements 2.1, 2.2**

### Property 3: Recommended Service Highlighted
*For any* service layer comparison, exactly one service should be marked as recommended (isRecommended = true).
**Validates: Requirements 1.3**

### Property 4: Overall Score Calculation
*For any* service, the overall score should equal the average of its 5 rating criteria, rounded to one decimal place.
**Validates: Requirements 2.3**

### Property 5: Comparison Table Completeness
*For any* comparison table, all displayed services should have entries for: Service Name, Overall Score, Cost, Scalability, Performance, and Best For.
**Validates: Requirements 3.2**

### Property 6: Trade-off Reasoning Present
*For any* service comparison, there should be reasoning text explaining why the recommended service was chosen over alternatives.
**Validates: Requirements 4.1, 4.2**

## Error Handling

### Frontend Error Handling

```javascript
function renderComparisonCard(layerComparison) {
  try {
    // Validate data structure
    if (!layerComparison || !layerComparison.services || layerComparison.services.length === 0) {
      return renderFallbackComparison(layerComparison.layerName);
    }
    
    // Render comparison
    return renderFullComparison(layerComparison);
  } catch (error) {
    console.error('Error rendering comparison:', error);
    return renderErrorState(layerComparison.layerName);
  }
}

function renderFallbackComparison(layerName) {
  return `
    <div class="comparison-card fallback">
      <h3>${layerName} Services</h3>
      <p>Detailed comparison data is not available. Using simplified view.</p>
      ${renderSimplifiedComparison(layerName)}
    </div>
  `;
}
```

### Backend Error Handling

```typescript
function formatLayerComparisons(comparisons, decisions): LayerComparison[] {
  try {
    return generateFullComparisons(comparisons, decisions);
  } catch (error) {
    console.error('Error formatting comparisons:', error);
    // Fall back to basic comparison
    return generateBasicComparisons(decisions);
  }
}
```

### AI Integration Error Handling

```typescript
async function generateAIComparison(request): Promise<string> {
  try {
    return await callBedrockAPI(request);
  } catch (error) {
    console.error('AI comparison failed:', error);
    // Fall back to rule-based comparison
    return generateRuleBasedComparison(request);
  }
}
```

## Testing Strategy

### Unit Tests

1. **Service Rating Tests**
   - Test that all services have complete rating data
   - Test overall score calculation
   - Test rating validation (1-5 range)

2. **Comparison Rendering Tests**
   - Test comparison card rendering with valid data
   - Test fallback rendering with missing data
   - Test error state rendering

3. **Data Structure Tests**
   - Test LayerComparison structure validation
   - Test ServiceComparison structure validation
   - Test recommended service marking

### Property-Based Tests

1. **Property 1: All Services Displayed**
   - Generate random service layer data
   - Verify at least 2 alternatives are shown
   - **Feature: service-comparison-enhancement, Property 1: All Services Displayed**

2. **Property 2: Ratings Completeness**
   - Generate random service data
   - Verify all 5 ratings are present and in range 1-5
   - **Feature: service-comparison-enhancement, Property 2: Ratings Completeness**

3. **Property 3: Recommended Service Highlighted**
   - Generate random layer comparison data
   - Verify exactly one service has isRecommended = true
   - **Feature: service-comparison-enhancement, Property 3: Recommended Service Highlighted**

4. **Property 4: Overall Score Calculation**
   - Generate random rating values
   - Verify overall score equals average of ratings
   - **Feature: service-comparison-enhancement, Property 4: Overall Score Calculation**

### Integration Tests

1. Test full recommendation flow with enhanced comparisons
2. Test AI integration (if enabled) with fallback to rule-based
3. Test frontend rendering with real backend data
4. Test responsive design on mobile devices

### Manual Testing

1. Submit various project requirements and verify comparisons are relevant
2. Test that recommended service makes sense for given requirements
3. Verify trade-off explanations are clear and actionable
4. Test AI-generated insights (if enabled) for quality and relevance

