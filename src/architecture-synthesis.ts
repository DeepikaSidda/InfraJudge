/**
 * Architecture Synthesis Module
 * Combines layer decisions into a cohesive architecture recommendation
 */

import { LayerDecision, ArchitectureRecommendation } from './types';

/**
 * Synthesizes a complete architecture from individual layer decisions
 */
export function synthesizeArchitecture(decisions: LayerDecision[]): ArchitectureRecommendation {
  // Extract service selections from decisions
  const computeDecision = decisions.find(d => d.layerName === 'Compute');
  const databaseDecision = decisions.find(d => d.layerName === 'Database');
  const storageDecision = decisions.find(d => d.layerName === 'Storage');
  const apiDecision = decisions.find(d => d.layerName === 'API/Load Balancing');

  const compute = computeDecision?.recommendation.serviceName || 'Lambda';
  const database = databaseDecision?.recommendation.serviceName || 'DynamoDB';
  const storage = storageDecision?.recommendation.serviceName || 'S3';
  const apiLoadBalancing = apiDecision?.recommendation.serviceName || 'API Gateway';

  // Generate rationale based on the combination
  const rationale = generateRationale(compute, database, storage, apiLoadBalancing);
  
  // Generate integration description
  const integration = generateIntegration(compute, database, storage, apiLoadBalancing);

  return {
    compute,
    database,
    storage,
    apiLoadBalancing,
    rationale,
    integration
  };
}

/**
 * Generates rationale explaining why the service combination is optimal
 */
function generateRationale(compute: string, database: string, storage: string, api: string): string {
  const isServerless = compute === 'Lambda' && database === 'DynamoDB' && api === 'API Gateway';
  const isTraditional = compute === 'EC2' && database === 'RDS' && api === 'ALB';
  const isContainerized = compute === 'ECS';

  if (isServerless) {
    return 'This serverless architecture provides optimal cost-efficiency with pay-per-use pricing across all layers, automatic scaling without capacity planning, and minimal operational overhead. The combination of Lambda, DynamoDB, API Gateway, and S3 creates a fully managed stack that scales seamlessly from zero to massive traffic while maintaining low latency.';
  } else if (isTraditional) {
    return 'This traditional architecture provides maximum control and predictable performance. EC2 offers full infrastructure control, RDS provides robust relational database capabilities with ACID transactions, ALB delivers efficient load balancing at scale, and the combination supports complex enterprise workloads with proven reliability.';
  } else if (isContainerized) {
    return 'This containerized architecture balances operational efficiency with flexibility. ECS provides excellent orchestration for microservices, enabling independent scaling of components while maintaining lower operational overhead than raw EC2. The architecture supports modern DevOps practices with efficient resource utilization.';
  } else if (compute === 'Lambda' && database === 'RDS') {
    return 'This hybrid architecture combines serverless compute benefits with relational database capabilities. Lambda provides cost-efficient, auto-scaling compute while RDS offers robust data integrity and complex query support. This combination works well for applications needing both serverless benefits and relational data features.';
  } else if (compute === 'EC2' && database === 'DynamoDB') {
    return 'This architecture pairs traditional compute control with modern NoSQL scalability. EC2 provides the control needed for complex workloads while DynamoDB offers seamless scaling and low-latency data access. This combination suits applications requiring both compute flexibility and database performance at scale.';
  } else {
    return 'This architecture is optimized for your specific requirements, balancing cost, performance, scalability, and operational overhead across all layers. Each service selection addresses your stated needs while maintaining compatibility and efficient integration.';
  }
}

/**
 * Generates integration description explaining how services work together
 */
function generateIntegration(compute: string, database: string, storage: string, api: string): string {
  let integration = '';

  // API layer integration
  if (api === 'API Gateway') {
    if (compute === 'Lambda') {
      integration += 'API Gateway receives incoming requests and triggers Lambda functions directly through native integration. ';
    } else {
      integration += 'API Gateway routes requests to your compute layer through HTTP integration. ';
    }
  } else {
    integration += 'Application Load Balancer distributes traffic across your compute instances with health checks and automatic failover. ';
  }

  // Compute to database integration
  if (compute === 'Lambda') {
    integration += `Lambda functions connect to ${database} using AWS SDK, with connection pooling managed through environment variables or Lambda layers. `;
  } else if (compute === 'ECS') {
    integration += `ECS containers connect to ${database} using connection strings stored in AWS Secrets Manager or Parameter Store. `;
  } else {
    integration += `EC2 instances connect to ${database} through VPC networking with security groups controlling access. `;
  }

  // Storage integration
  if (storage === 'S3') {
    integration += 'S3 stores static assets, user uploads, and backups, accessible via AWS SDK from your compute layer. ';
    if (compute === 'Lambda') {
      integration += 'Lambda can be triggered by S3 events for automated processing. ';
    }
  } else if (storage === 'EBS') {
    integration += 'EBS volumes attach directly to EC2 instances providing block-level storage for databases and applications. ';
  } else {
    integration += 'EFS provides shared file storage accessible from multiple compute instances simultaneously. ';
  }

  // Security and networking
  if (compute === 'Lambda' && database === 'DynamoDB') {
    integration += 'All services communicate securely using IAM roles and policies, with no VPC configuration required for basic setups.';
  } else {
    integration += 'Services communicate within a VPC with security groups and network ACLs controlling traffic flow, ensuring secure and isolated networking.';
  }

  return integration;
}
