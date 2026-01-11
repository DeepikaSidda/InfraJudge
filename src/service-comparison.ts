/**
 * Service Comparison Engine
 * Compares AWS services within each layer based on user context
 */

import { UserContext, LayerComparison, ServiceComparison } from './types';

/**
 * Compares compute services (EC2, ECS, Lambda) based on user context
 */
export function compareComputeServices(context: UserContext): LayerComparison {
  const services: ServiceComparison[] = [
    {
      serviceName: 'EC2',
      cost: context.budget === 'Low' 
        ? 'Moderate to high - pay for running instances even when idle'
        : 'Predictable costs with reserved instances, cost-effective at scale',
      scalability: context.traffic === 'High'
        ? 'Excellent - manual or auto-scaling groups, handles high sustained load'
        : 'Good - requires configuration of auto-scaling groups',
      maintenance: 'High - requires OS patching, security updates, monitoring, and infrastructure management',
      performance: context.workloadType.toLowerCase().includes('ml')
        ? 'Excellent - full control over hardware, GPU support, ideal for ML workloads'
        : 'Excellent - full control over resources, consistent performance',
      bestFor: 'Long-running applications, complex workloads, ML/AI, applications requiring specific OS configurations'
    },
    {
      serviceName: 'ECS',
      cost: context.budget === 'Low'
        ? 'Moderate - pay for underlying EC2/Fargate, better than raw EC2 for variable loads'
        : 'Cost-effective with Fargate for containerized apps, no idle costs with proper scaling',
      scalability: 'Excellent - automatic container orchestration, scales containers independently',
      maintenance: 'Medium - AWS manages orchestration, you manage container images and task definitions',
      performance: 'Excellent - efficient resource utilization through containerization, fast deployment',
      bestFor: 'Containerized applications, microservices, applications needing orchestration'
    },
    {
      serviceName: 'Lambda',
      cost: context.budget === 'Low'
        ? 'Excellent - pay only for execution time, no idle costs, generous free tier'
        : 'Cost-effective for variable workloads, can be expensive at very high scale',
      scalability: context.traffic === 'High'
        ? 'Good - automatic scaling but may hit concurrency limits at extreme scale'
        : 'Excellent - automatic scaling, handles variable load perfectly',
      maintenance: 'Very Low - fully managed, no infrastructure to maintain, automatic scaling',
      performance: context.workloadType.toLowerCase().includes('ml')
        ? 'Limited - 15-minute execution limit, not suitable for long-running ML training'
        : 'Good - cold starts can add latency, excellent for event-driven workloads',
      bestFor: 'Event-driven applications, APIs with variable traffic, serverless architectures, startups'
    }
  ];

  return {
    layerName: 'Compute',
    services
  };
}

/**
 * Compares database services (RDS, DynamoDB) based on user context
 */
export function compareDatabaseServices(context: UserContext): LayerComparison {
  const services: ServiceComparison[] = [
    {
      serviceName: 'RDS',
      cost: context.budget === 'Low'
        ? 'Moderate to high - pay for running instances even during low usage'
        : 'Predictable costs, cost-effective for steady workloads with reserved instances',
      scalability: context.traffic === 'High'
        ? 'Good - vertical scaling and read replicas, but requires planning'
        : 'Moderate - vertical scaling has downtime, read replicas help with reads',
      maintenance: context.securityLevel === 'High'
        ? 'Low - AWS manages patching and backups, strong compliance features (encryption, audit logs)'
        : 'Low - AWS manages patching, backups, and infrastructure',
      performance: 'Excellent - consistent performance, complex queries, ACID transactions, relational integrity',
      bestFor: 'Relational data, complex queries, transactions, existing SQL applications, enterprise apps'
    },
    {
      serviceName: 'DynamoDB',
      cost: context.budget === 'Low'
        ? 'Good - pay per request option available, scales to zero, generous free tier'
        : 'Cost-effective at scale with provisioned capacity, can be expensive for small workloads',
      scalability: 'Excellent - automatic horizontal scaling, handles massive scale seamlessly',
      maintenance: 'Very Low - fully managed, automatic scaling, no infrastructure management',
      performance: context.traffic === 'High'
        ? 'Excellent - single-digit millisecond latency at any scale, perfect for high-traffic apps'
        : 'Excellent - consistent low latency, but limited query flexibility',
      bestFor: 'Key-value data, high-traffic applications, serverless architectures, simple access patterns'
    }
  ];

  return {
    layerName: 'Database',
    services
  };
}

/**
 * Compares storage services (S3, EBS, EFS) based on user context
 */
export function compareStorageServices(context: UserContext): LayerComparison {
  const services: ServiceComparison[] = [
    {
      serviceName: 'S3',
      cost: 'Excellent - pay only for storage used, very low cost per GB, lifecycle policies reduce costs',
      scalability: 'Excellent - unlimited storage, automatic scaling, globally distributed',
      maintenance: 'Very Low - fully managed, automatic durability (99.999999999%), no infrastructure',
      performance: 'Good - high throughput for large files, not suitable for low-latency random access',
      bestFor: 'Object storage, static files, backups, data lakes, media files, serverless architectures'
    },
    {
      serviceName: 'EBS',
      cost: context.budget === 'Low'
        ? 'Moderate - pay for provisioned storage even if unused, snapshots add cost'
        : 'Predictable costs, cost-effective for applications needing block storage',
      scalability: 'Limited - attached to single EC2 instance, requires manual volume resizing',
      maintenance: 'Low - AWS manages physical storage, you manage volumes and snapshots',
      performance: 'Excellent - low latency, high IOPS, ideal for databases and applications needing block storage',
      bestFor: 'EC2 instance storage, databases, applications requiring low-latency block storage'
    },
    {
      serviceName: 'EFS',
      cost: 'Moderate to high - more expensive than S3, pay for storage used with lifecycle management',
      scalability: 'Excellent - automatically scales, shared across multiple instances',
      maintenance: 'Very Low - fully managed, automatic scaling, no capacity planning',
      performance: 'Good - shared file system performance, suitable for concurrent access',
      bestFor: 'Shared file storage, content management, web serving, applications needing NFS'
    }
  ];

  return {
    layerName: 'Storage',
    services
  };
}

/**
 * Compares API and load balancing services (API Gateway, ALB) based on user context
 */
export function compareAPIServices(context: UserContext): LayerComparison {
  const services: ServiceComparison[] = [
    {
      serviceName: 'API Gateway',
      cost: context.traffic === 'High'
        ? 'Expensive at high scale - pay per million requests, costs add up quickly'
        : context.budget === 'Low'
        ? 'Good - pay per request, no minimum costs, generous free tier'
        : 'Moderate - pay per request model works well for variable traffic',
      scalability: 'Excellent - automatic scaling, handles traffic spikes seamlessly',
      maintenance: 'Very Low - fully managed, built-in features (throttling, caching, auth)',
      performance: 'Good - adds some latency, excellent for serverless and microservices',
      bestFor: 'Serverless APIs, Lambda integration, REST/WebSocket APIs, low to medium traffic, startups'
    },
    {
      serviceName: 'ALB',
      cost: context.traffic === 'High'
        ? 'Cost-effective at high scale - fixed hourly cost plus data processing, better economics at volume'
        : 'Moderate - fixed hourly cost regardless of traffic, less economical for low traffic',
      scalability: 'Excellent - automatic scaling, handles millions of requests',
      maintenance: 'Low - managed by AWS, requires configuration of target groups and health checks',
      performance: context.traffic === 'High'
        ? 'Excellent - very low latency, optimized for high throughput'
        : 'Excellent - consistent low latency, efficient routing',
      bestFor: 'High-traffic applications, EC2/ECS workloads, applications needing advanced routing, enterprise apps'
    }
  ];

  return {
    layerName: 'API/Load Balancing',
    services
  };
}
