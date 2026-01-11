/**
 * Decision Engine
 * Selects optimal services for each layer based on user context
 */

import { UserContext, LayerComparison, LayerDecision, ServiceRecommendation } from './types';

/**
 * Decides the best compute service based on user context
 */
export function decideComputeService(context: UserContext, comparison: LayerComparison): LayerDecision {
  let selectedService: string;
  let reason: string;
  const alternatives: { serviceName: string; rejectionReason: string }[] = [];

  // Decision logic based on context
  const isLowBudget = context.budget === 'Low';
  const isLowTraffic = context.traffic === 'Low';
  const isMLWorkload = context.workloadType.toLowerCase().includes('ml') || 
                       context.workloadType.toLowerCase().includes('machine learning');
  const isStartup = context.appType.toLowerCase().includes('startup');

  if (isMLWorkload) {
    // ML workloads need EC2 or ECS for long-running processes
    selectedService = 'EC2';
    reason = 'EC2 provides full control over hardware with GPU support, essential for ML workloads that require long execution times and specialized compute resources.';
    alternatives.push({
      serviceName: 'ECS',
      rejectionReason: 'While ECS can handle ML workloads, EC2 provides more direct hardware control and is better suited for intensive ML training.'
    });
    alternatives.push({
      serviceName: 'Lambda',
      rejectionReason: 'Lambda has a 15-minute execution limit, making it unsuitable for ML training workloads that typically run for hours.'
    });
  } else if (isLowBudget && isLowTraffic) {
    // Low budget + low traffic = Lambda (pay per use)
    selectedService = 'Lambda';
    reason = 'Lambda is ideal for your low budget and low traffic scenario - you only pay for actual execution time with no idle costs, and the generous free tier further reduces expenses.';
    alternatives.push({
      serviceName: 'EC2',
      rejectionReason: 'EC2 requires paying for running instances even when idle, which is cost-inefficient for low traffic applications.'
    });
    alternatives.push({
      serviceName: 'ECS',
      rejectionReason: 'ECS still requires underlying compute resources (EC2 or Fargate) that incur costs even during low usage periods.'
    });
  } else if (isStartup || (isLowBudget && !isMLWorkload)) {
    // Startups benefit from serverless
    selectedService = 'Lambda';
    reason = 'Lambda offers the best balance for startups - minimal operational overhead, automatic scaling, and pay-per-use pricing that grows with your business.';
    alternatives.push({
      serviceName: 'EC2',
      rejectionReason: 'EC2 requires significant operational overhead for management, patching, and scaling - resources better spent on product development.'
    });
    alternatives.push({
      serviceName: 'ECS',
      rejectionReason: 'ECS adds container orchestration complexity that may be premature for early-stage startups.'
    });
  } else if (context.traffic === 'High') {
    // High traffic = EC2 or ECS for sustained load
    selectedService = 'ECS';
    reason = 'ECS provides excellent scalability and resource efficiency for high-traffic applications through container orchestration, with lower operational overhead than raw EC2.';
    alternatives.push({
      serviceName: 'EC2',
      rejectionReason: 'While EC2 handles high traffic well, ECS provides better resource utilization and easier scaling through containerization.'
    });
    alternatives.push({
      serviceName: 'Lambda',
      rejectionReason: 'Lambda can become expensive at very high sustained traffic levels, and may hit concurrency limits at extreme scale.'
    });
  } else {
    // Default to Lambda for most modern applications
    selectedService = 'Lambda';
    reason = 'Lambda provides the best balance of cost-efficiency, automatic scaling, and minimal operational overhead for your use case.';
    alternatives.push({
      serviceName: 'EC2',
      rejectionReason: 'EC2 requires more operational overhead and incurs costs even during idle periods.'
    });
    alternatives.push({
      serviceName: 'ECS',
      rejectionReason: 'ECS adds container orchestration complexity that may not be necessary for your workload.'
    });
  }

  return {
    layerName: 'Compute',
    recommendation: {
      serviceName: selectedService,
      reason,
      alternatives
    }
  };
}

/**
 * Decides the best database service based on user context
 */
export function decideDatabaseService(context: UserContext, comparison: LayerComparison): LayerDecision {
  let selectedService: string;
  let reason: string;
  const alternatives: { serviceName: string; rejectionReason: string }[] = [];

  const isHighSecurity = context.securityLevel === 'High';
  const isEnterprise = context.appType.toLowerCase().includes('enterprise');
  const isHighTraffic = context.traffic === 'High';
  const isLowBudget = context.budget === 'Low';

  if (isHighSecurity || isEnterprise) {
    // High security or enterprise = RDS for compliance
    selectedService = 'RDS';
    reason = isHighSecurity
      ? 'RDS provides robust security features including encryption at rest and in transit, automated backups, and audit logging - essential for high-security requirements and compliance.'
      : 'RDS offers enterprise-grade reliability, ACID transactions, and familiar SQL interfaces that integrate well with existing enterprise applications.';
    alternatives.push({
      serviceName: 'DynamoDB',
      rejectionReason: isHighSecurity
        ? 'While DynamoDB offers encryption, RDS provides more comprehensive compliance features and audit capabilities required for high-security environments.'
        : 'DynamoDB\'s NoSQL model may require significant application changes and lacks the relational integrity features enterprise applications often depend on.'
    });
  } else if (isHighTraffic) {
    // High traffic = DynamoDB for scale
    selectedService = 'DynamoDB';
    reason = 'DynamoDB excels at high-traffic scenarios with single-digit millisecond latency at any scale, automatic horizontal scaling, and no performance degradation as traffic grows.';
    alternatives.push({
      serviceName: 'RDS',
      rejectionReason: 'RDS requires careful capacity planning and read replicas for high traffic, and vertical scaling has limitations compared to DynamoDB\'s seamless horizontal scaling.'
    });
  } else if (isLowBudget) {
    // Low budget = DynamoDB with pay-per-request
    selectedService = 'DynamoDB';
    reason = 'DynamoDB\'s pay-per-request pricing model is ideal for low budgets - you only pay for actual usage with no minimum costs, and it scales to zero during idle periods.';
    alternatives.push({
      serviceName: 'RDS',
      rejectionReason: 'RDS requires paying for running database instances even during low usage, making it less cost-effective for budget-constrained applications.'
    });
  } else {
    // Default to DynamoDB for modern serverless apps
    selectedService = 'DynamoDB';
    reason = 'DynamoDB provides excellent scalability, minimal operational overhead, and cost-effective pay-per-use pricing that aligns well with modern application architectures.';
    alternatives.push({
      serviceName: 'RDS',
      rejectionReason: 'RDS requires more operational management and capacity planning, with higher baseline costs due to always-running instances.'
    });
  }

  return {
    layerName: 'Database',
    recommendation: {
      serviceName: selectedService,
      reason,
      alternatives
    }
  };
}

/**
 * Decides the best storage service based on user context
 */
export function decideStorageService(context: UserContext, comparison: LayerComparison): LayerDecision {
  let selectedService: string;
  let reason: string;
  const alternatives: { serviceName: string; rejectionReason: string }[] = [];

  const workloadLower = context.workloadType.toLowerCase();
  const isAPIBased = workloadLower.includes('api');
  const isWebApp = workloadLower.includes('web');

  // For most modern applications, S3 is the default choice
  selectedService = 'S3';
  reason = 'S3 provides unlimited scalable object storage at very low cost, perfect for static assets, backups, and data storage. It integrates seamlessly with serverless architectures and requires zero operational overhead.';
  
  alternatives.push({
    serviceName: 'EBS',
    rejectionReason: 'EBS is block storage tied to EC2 instances, only necessary if you\'re running databases or applications that require low-latency block-level access. For general storage needs, S3 is more cost-effective and scalable.'
  });
  
  alternatives.push({
    serviceName: 'EFS',
    rejectionReason: 'EFS is more expensive than S3 and is only needed when you require a shared file system across multiple instances. For object storage and static content, S3 is the better choice.'
  });

  return {
    layerName: 'Storage',
    recommendation: {
      serviceName: selectedService,
      reason,
      alternatives
    }
  };
}

/**
 * Decides the best API/Load Balancing service based on user context
 */
export function decideAPIService(context: UserContext, comparison: LayerComparison): LayerDecision {
  let selectedService: string;
  let reason: string;
  const alternatives: { serviceName: string; rejectionReason: string }[] = [];

  const isHighTraffic = context.traffic === 'High';
  const isLowBudget = context.budget === 'Low';
  const isLowTraffic = context.traffic === 'Low';

  if (isHighTraffic) {
    // High traffic = ALB for cost efficiency at scale
    selectedService = 'ALB';
    reason = 'ALB is more cost-effective at high traffic volumes with its fixed hourly cost plus data processing fees. It provides excellent performance and low latency for high-throughput applications.';
    alternatives.push({
      serviceName: 'API Gateway',
      rejectionReason: 'API Gateway\'s per-request pricing becomes expensive at high traffic volumes. ALB offers better economics and lower latency for sustained high-traffic scenarios.'
    });
  } else if (isLowBudget || isLowTraffic) {
    // Low budget/traffic = API Gateway for pay-per-use
    selectedService = 'API Gateway';
    reason = 'API Gateway\'s pay-per-request model is ideal for low traffic - you only pay for actual API calls with no minimum costs. It includes built-in features like throttling, caching, and authentication.';
    alternatives.push({
      serviceName: 'ALB',
      rejectionReason: 'ALB has a fixed hourly cost regardless of traffic volume, making it less economical for low-traffic applications where API Gateway\'s pay-per-request model is more cost-effective.'
    });
  } else {
    // Default to API Gateway for serverless/modern apps
    selectedService = 'API Gateway';
    reason = 'API Gateway integrates seamlessly with Lambda and provides a fully managed API solution with built-in features for authentication, throttling, and monitoring.';
    alternatives.push({
      serviceName: 'ALB',
      rejectionReason: 'ALB is better suited for EC2/ECS workloads. For serverless architectures, API Gateway provides better integration and more API-specific features.'
    });
  }

  return {
    layerName: 'API/Load Balancing',
    recommendation: {
      serviceName: selectedService,
      reason,
      alternatives
    }
  };
}
