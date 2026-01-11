# Design Document: AWS Cloud Referee

## Overview

The AWS Cloud Referee is an intelligent decision support system that analyzes user requirements and generates tailored AWS architecture recommendations. The system acts as a virtual senior AWS Solutions Architect, comparing multiple service options across four critical layers (Compute, Database, Storage, API/Load Balancing), explaining trade-offs, and delivering a cohesive architecture recommendation.

The core design philosophy is comparative analysis over generic advice. Rather than simply listing AWS services, the system evaluates each option against the user's specific context (budget, traffic, security, workload type) and explicitly explains why certain services are superior or inferior for that particular situation.

## Architecture

The system follows a pipeline architecture with five main stages:

1. **Context Capture**: Collect and validate user inputs (app type, budget, users, traffic, security, workload)
2. **Service Analysis**: For each of the four service layers, compare available AWS options using standardized criteria
3. **Decision Engine**: Apply context-aware rules to select optimal services for each layer
4. **Architecture Synthesis**: Combine selected services into a cohesive architecture recommendation
5. **Output Formatting**: Generate structured output with comparisons, analysis, and recommendations

```
User Input → Context Validation → Service Comparison Engine → Decision Engine → Architecture Synthesis → Formatted Output
```

The system is stateless - each recommendation is generated independently based on the provided context.

## Components and Interfaces

### 1. Context Capture Module

**Responsibility**: Collect, validate, and normalize user inputs.

**Interface**:
```typescript
interface UserContext {
  appType: string;        // e.g., "Startup", "SaaS", "Enterprise", "ML", "FinTech"
  budget: "Low" | "Medium" | "High";
  expectedUsers: number | string;
  traffic: "Low" | "Medium" | "High";
  securityLevel: "Low" | "Medium" | "High";
  workloadType: string;   // e.g., "API-based", "Web App", "Data Processing", "ML"
}

function captureContext(rawInput: Record<string, any>): UserContext;
function validateContext(context: UserContext): ValidationResult;
```

**Validation Rules**:
- All required fields must be present
- Enum fields (budget, traffic, securityLevel) must match allowed values
- appType and workloadType must be non-empty strings

### 2. Service Comparison Engine

**Responsibility**: Compare AWS services within each layer using standardized criteria.

**Interface**:
```typescript
interface ServiceComparison {
  serviceName: string;
  cost: string;           // Description of cost characteristics
  scalability: string;    // Description of scaling behavior
  maintenance: string;    // Description of maintenance effort
  performance: string;    // Description of performance characteristics
  bestFor: string;        // Best use case description
}

interface LayerComparison {
  layerName: string;
  services: ServiceComparison[];
}

function compareComputeServices(context: UserContext): LayerComparison;
function compareDatabaseServices(context: UserContext): LayerComparison;
function compareStorageServices(context: UserContext): LayerComparison;
function compareAPIServices(context: UserContext): LayerComparison;
```

**Service Layers**:
- **Compute**: EC2, ECS, AWS Lambda
- **Database**: Amazon RDS, Amazon DynamoDB
- **Storage**: Amazon S3, Amazon EBS, Amazon EFS
- **API/Load Balancing**: API Gateway, Application Load Balancer (ALB)

### 3. Decision Engine

**Responsibility**: Select optimal services for each layer based on user context and apply trade-off analysis.

**Interface**:
```typescript
interface ServiceRecommendation {
  serviceName: string;
  reason: string;         // Why this service was chosen
  alternatives: {
    serviceName: string;
    rejectionReason: string;  // Why this alternative was rejected
  }[];
}

interface LayerDecision {
  layerName: string;
  recommendation: ServiceRecommendation;
}

function decideComputeService(context: UserContext, comparison: LayerComparison): LayerDecision;
function decideDatabaseService(context: UserContext, comparison: LayerComparison): LayerDecision;
function decideStorageService(context: UserContext, comparison: LayerComparison): LayerDecision;
function decideAPIService(context: UserContext, comparison: LayerComparison): LayerDecision;
```

**Decision Rules** (examples):
- Low budget + Low traffic → Prefer Lambda over EC2 (pay-per-use vs. always-on)
- High traffic + API workload → Prefer ALB over API Gateway (cost at scale)
- ML workload → Prefer EC2/ECS over Lambda (execution time limits)
- High security + Enterprise → Prefer RDS over DynamoDB (compliance features)

### 4. Architecture Synthesis Module

**Responsibility**: Combine layer decisions into a cohesive architecture and explain integration.

**Interface**:
```typescript
interface ArchitectureRecommendation {
  compute: string;
  database: string;
  storage: string;
  apiLoadBalancing: string;
  rationale: string;      // Why this combination works together
  integration: string;    // How services integrate
}

function synthesizeArchitecture(decisions: LayerDecision[]): ArchitectureRecommendation;
```

### 5. Output Formatter

**Responsibility**: Generate structured, human-readable output following the specified format.

**Interface**:
```typescript
interface FormattedOutput {
  userContextSummary: string;
  comparisonTables: {
    compute: string;      // Markdown table
    database: string;     // Markdown table
    storage: string;      // Markdown table
    apiLoadBalancing: string;  // Markdown table
  };
  decisionAnalysis: string;
  finalArchitecture: string;
  costTradeoffSummary: {
    estimatedCostLevel: "Low" | "Medium" | "High";
    gains: string[];
    sacrifices: string[];
  };
}

function formatOutput(
  context: UserContext,
  comparisons: LayerComparison[],
  decisions: LayerDecision[],
  architecture: ArchitectureRecommendation
): FormattedOutput;
```

## Data Models

### UserContext
Represents the complete set of user inputs that drive the recommendation.

```typescript
interface UserContext {
  appType: string;
  budget: "Low" | "Medium" | "High";
  expectedUsers: number | string;
  traffic: "Low" | "Medium" | "High";
  securityLevel: "Low" | "Medium" | "High";
  workloadType: string;
}
```

### ServiceComparison
Represents the evaluation of a single AWS service across standardized criteria.

```typescript
interface ServiceComparison {
  serviceName: string;
  cost: string;
  scalability: string;
  maintenance: string;
  performance: string;
  bestFor: string;
}
```

### LayerComparison
Groups all service comparisons for a single layer (Compute, Database, Storage, or API).

```typescript
interface LayerComparison {
  layerName: string;
  services: ServiceComparison[];
}
```

### ServiceRecommendation
Represents the selected service for a layer with justification and alternative analysis.

```typescript
interface ServiceRecommendation {
  serviceName: string;
  reason: string;
  alternatives: {
    serviceName: string;
    rejectionReason: string;
  }[];
}
```

### LayerDecision
Combines a layer name with its service recommendation.

```typescript
interface LayerDecision {
  layerName: string;
  recommendation: ServiceRecommendation;
}
```

### ArchitectureRecommendation
The final combined architecture across all layers.

```typescript
interface ArchitectureRecommendation {
  compute: string;
  database: string;
  storage: string;
  apiLoadBalancing: string;
  rationale: string;
  integration: string;
}
```

### FormattedOutput
The complete structured output delivered to the user.

```typescript
interface FormattedOutput {
  userContextSummary: string;
  comparisonTables: {
    compute: string;
    database: string;
    storage: string;
    apiLoadBalancing: string;
  };
  decisionAnalysis: string;
  finalArchitecture: string;
  costTradeoffSummary: {
    estimatedCostLevel: "Low" | "Medium" | "High";
    gains: string[];
    sacrifices: string[];
  };
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Valid Input Acceptance
*For any* user context with valid values for all required fields (appType, budget, expectedUsers, traffic, securityLevel, workloadType), the context validation should succeed and accept the input.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**

### Property 2: Complete Context Validation
*For any* user context missing one or more required fields, the context validation should fail and reject the input.

**Validates: Requirements 1.7**

### Property 3: Compute Layer Completeness
*For any* valid user context, the compute service comparison should include all three services (EC2, ECS, Lambda) with all required fields (cost, scalability, maintenance, performance, bestFor) populated for each service.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

### Property 4: Database Layer Completeness
*For any* valid user context, the database service comparison should include both services (RDS, DynamoDB) with all required fields (cost, scalability, maintenance, performance, bestFor) populated for each service.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**

### Property 5: Storage Layer Completeness
*For any* valid user context, the storage service comparison should include all three services (S3, EBS, EFS) with all required fields (cost, scalability, maintenance, performance, bestFor) populated for each service.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7**

### Property 6: API Layer Completeness
*For any* valid user context, the API service comparison should include both services (API Gateway, ALB) with all required fields (cost, scalability, maintenance, performance, bestFor) populated for each service.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**

### Property 7: Compute Decision Justification
*For any* valid user context, the compute layer decision should include a selected service with a non-empty reason, and all non-selected services should appear in the alternatives list with non-empty rejection reasons.

**Validates: Requirements 6.1, 6.2**

### Property 8: Database Decision Justification
*For any* valid user context, the database layer decision should include a selected service with a non-empty reason, and all non-selected services should appear in the alternatives list with non-empty rejection reasons.

**Validates: Requirements 6.3, 6.4**

### Property 9: Storage Decision Justification
*For any* valid user context, the storage layer decision should include a selected service with a non-empty reason, and all non-selected services should appear in the alternatives list with non-empty rejection reasons.

**Validates: Requirements 6.5, 6.6**

### Property 10: API Decision Justification
*For any* valid user context, the API layer decision should include a selected service with a non-empty reason, and all non-selected services should appear in the alternatives list with non-empty rejection reasons.

**Validates: Requirements 6.7, 6.8**

### Property 11: Complete Architecture Output
*For any* valid user context, the final architecture recommendation should include selections for all four layers (compute, database, storage, apiLoadBalancing), a non-empty rationale explaining why the combination is optimal, and a non-empty integration description.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

### Property 12: Complete Cost Summary
*For any* valid user context, the cost and trade-off summary should include a valid cost level (Low, Medium, or High), at least one gain, and at least one sacrifice.

**Validates: Requirements 8.1, 8.2, 8.3**

### Property 13: Output Structure Completeness
*For any* valid user context, the formatted output should contain all five required sections (userContextSummary, comparisonTables for all four layers, decisionAnalysis, finalArchitecture, costTradeoffSummary) in the specified order.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

### Property 14: Context-Sensitive Recommendations
*For any* two different valid user contexts with different budget, traffic, or workload values, the system should produce different service recommendations for at least one layer, demonstrating that recommendations are context-sensitive and not generic.

**Validates: Requirements 10.9**

## Error Handling

The system should handle the following error conditions gracefully:

### Input Validation Errors
- **Missing required fields**: Return a validation error listing which fields are missing
- **Invalid enum values**: Return a validation error specifying the invalid value and listing valid options
- **Empty string values**: Treat as missing fields and return validation error

### Processing Errors
- **Service comparison failure**: If comparison for a layer fails, return an error indicating which layer failed
- **Decision engine failure**: If decision logic fails, return an error with context about the failure
- **Architecture synthesis failure**: If combining layers fails, return an error with details

### Error Response Format
All errors should be returned in a consistent format:
```typescript
interface ErrorResponse {
  error: true;
  message: string;
  details?: Record<string, any>;
}
```

### Error Recovery
- The system should not crash on invalid input - always return a structured error
- Errors should be descriptive enough for users to correct their input
- No partial outputs - if any stage fails, return an error rather than incomplete recommendations

## Testing Strategy

The AWS Cloud Referee will be tested using a dual approach combining unit tests and property-based tests to ensure comprehensive coverage.

### Property-Based Testing

Property-based testing will be used to verify universal correctness properties across all possible inputs. We will use **fast-check** (for TypeScript/JavaScript implementation) as the property-based testing library.

**Configuration**:
- Each property test will run a minimum of 100 iterations
- Each test will be tagged with a comment referencing the design property
- Tag format: `// Feature: aws-cloud-referee, Property {number}: {property_text}`

**Property Test Coverage**:
- **Properties 1-2**: Input validation with randomly generated valid and invalid contexts
- **Properties 3-6**: Service layer completeness with randomly generated contexts
- **Properties 7-10**: Decision justification with randomly generated contexts
- **Properties 11-13**: Output structure with randomly generated contexts
- **Property 14**: Context sensitivity by generating pairs of different contexts

**Generators**:
Custom generators will be created for:
- Valid UserContext objects (with all required fields)
- Invalid UserContext objects (missing fields, invalid enums)
- Edge cases (empty strings, boundary values)

### Unit Testing

Unit tests will complement property tests by verifying specific examples and edge cases:

**Input Validation Tests**:
- Test specific valid context examples (Startup with Low budget, Enterprise with High security)
- Test specific invalid contexts (missing appType, invalid budget value)
- Test edge cases (empty strings, null values)

**Service Comparison Tests**:
- Test that specific contexts produce expected service comparisons
- Test that comparison tables are properly formatted
- Test edge cases in comparison logic

**Decision Engine Tests**:
- Test specific decision rules (Low budget → Lambda preference)
- Test that trade-offs are properly explained
- Test context-specific decision logic (ML workload → EC2/ECS preference)

**Architecture Synthesis Tests**:
- Test that specific layer combinations produce coherent architectures
- Test integration descriptions are contextual
- Test specific architecture examples (serverless stack, traditional stack)

**Output Formatting Tests**:
- Test markdown table generation
- Test section ordering
- Test output completeness for specific examples

**Error Handling Tests**:
- Test each error condition produces appropriate error response
- Test error messages are descriptive
- Test no partial outputs on errors

### Integration Testing

End-to-end tests will verify the complete pipeline:
- Provide complete user contexts and verify full formatted output
- Test multiple different contexts produce different recommendations
- Test that all sections are present and properly formatted
- Test error handling across the entire pipeline

### Test Organization

Tests will be organized by component:
```
tests/
  context-capture.test.ts
  service-comparison.test.ts
  decision-engine.test.ts
  architecture-synthesis.test.ts
  output-formatter.test.ts
  integration.test.ts
  properties.test.ts  // All property-based tests
```

Property-based tests will be in a dedicated file to clearly separate them from unit tests and make it easy to run them independently.
