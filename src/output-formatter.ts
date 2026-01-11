/**
 * Output Formatter
 * Generates structured, human-readable output
 */

import { 
  UserContext, 
  LayerComparison, 
  LayerDecision, 
  ArchitectureRecommendation, 
  FormattedOutput 
} from './types';

/**
 * Formats the complete output for the user
 */
export function formatOutput(
  context: UserContext,
  comparisons: LayerComparison[],
  decisions: LayerDecision[],
  architecture: ArchitectureRecommendation
): FormattedOutput {
  const userContextSummary = generateContextSummary(context);
  
  const comparisonTables = {
    compute: generateComparisonTable(comparisons.find(c => c.layerName === 'Compute')!),
    database: generateComparisonTable(comparisons.find(c => c.layerName === 'Database')!),
    storage: generateComparisonTable(comparisons.find(c => c.layerName === 'Storage')!),
    apiLoadBalancing: generateComparisonTable(comparisons.find(c => c.layerName === 'API/Load Balancing')!)
  };

  const decisionAnalysis = generateDecisionAnalysis(decisions);
  const finalArchitecture = generateFinalArchitecture(architecture);
  const costTradeoffSummary = generateCostTradeoffSummary(context, architecture);

  return {
    userContextSummary,
    comparisonTables,
    decisionAnalysis,
    finalArchitecture,
    costTradeoffSummary
  };
}

/**
 * Generates a summary of the user context
 */
function generateContextSummary(context: UserContext): string {
  let summary = `You're building a ${context.appType} application with a ${context.budget.toLowerCase()} budget, ` +
    `expecting ${context.expectedUsers} users with ${context.traffic.toLowerCase()} traffic levels. ` +
    `Your workload is ${context.workloadType} with ${context.securityLevel.toLowerCase()} security requirements.`;
  
  // Add project description if provided
  if (context.projectDescription && context.projectDescription.trim()) {
    summary += `\n\n**Project Details:** ${context.projectDescription.trim()}`;
  }
  
  return summary;
}

/**
 * Generates a markdown comparison table for a service layer
 */
function generateComparisonTable(comparison: LayerComparison): string {
  let table = `## ${comparison.layerName} Services\n\n`;
  table += '| Service | Cost | Scaling | Maintenance | Best For |\n';
  table += '|---------|------|---------|-------------|----------|\n';

  for (const service of comparison.services) {
    table += `| **${service.serviceName}** | ${service.cost} | ${service.scalability} | ${service.maintenance} | ${service.bestFor} |\n`;
  }

  return table;
}

/**
 * Generates the decision analysis section
 */
function generateDecisionAnalysis(decisions: LayerDecision[]): string {
  let analysis = '## Decision Analysis\n\n';

  for (const decision of decisions) {
    analysis += `### ${decision.layerName}: ${decision.recommendation.serviceName}\n\n`;
    analysis += `**Why ${decision.recommendation.serviceName}?**\n`;
    analysis += `${decision.recommendation.reason}\n\n`;
    
    if (decision.recommendation.alternatives.length > 0) {
      analysis += '**Why not the alternatives?**\n\n';
      for (const alt of decision.recommendation.alternatives) {
        analysis += `- **${alt.serviceName}**: ${alt.rejectionReason}\n`;
      }
      analysis += '\n';
    }
  }

  return analysis;
}

/**
 * Generates the final architecture recommendation section
 */
function generateFinalArchitecture(architecture: ArchitectureRecommendation): string {
  let output = '## Final Recommended Architecture\n\n';
  output += `**${architecture.compute} + ${architecture.apiLoadBalancing} + ${architecture.database} + ${architecture.storage}**\n\n`;
  output += `### Why This Combination?\n\n`;
  output += `${architecture.rationale}\n\n`;
  output += `### How It Works Together\n\n`;
  output += `${architecture.integration}\n`;

  return output;
}

/**
 * Generates the cost and trade-off summary
 */
function generateCostTradeoffSummary(
  context: UserContext,
  architecture: ArchitectureRecommendation
): {
  estimatedCostLevel: "Low" | "Medium" | "High";
  gains: string[];
  sacrifices: string[];
} {
  const isServerless = architecture.compute === 'Lambda' && 
                       architecture.database === 'DynamoDB' && 
                       architecture.apiLoadBalancing === 'API Gateway';
  
  const isTraditional = architecture.compute === 'EC2' && 
                        architecture.database === 'RDS' && 
                        architecture.apiLoadBalancing === 'ALB';

  let estimatedCostLevel: "Low" | "Medium" | "High";
  const gains: string[] = [];
  const sacrifices: string[] = [];

  // Determine cost level
  if (context.budget === 'Low' || (isServerless && context.traffic === 'Low')) {
    estimatedCostLevel = 'Low';
  } else if (context.budget === 'High' || (isTraditional && context.traffic === 'High')) {
    estimatedCostLevel = 'High';
  } else {
    estimatedCostLevel = 'Medium';
  }

  // Determine gains and sacrifices based on architecture
  if (isServerless) {
    gains.push('Pay-per-use pricing with no idle costs');
    gains.push('Automatic scaling without capacity planning');
    gains.push('Minimal operational overhead and maintenance');
    gains.push('Fast deployment and iteration cycles');
    
    sacrifices.push('Cold start latency for Lambda functions');
    sacrifices.push('15-minute execution time limit on Lambda');
    sacrifices.push('Less control over underlying infrastructure');
    sacrifices.push('Vendor lock-in to AWS services');
  } else if (isTraditional) {
    gains.push('Full control over infrastructure and configuration');
    gains.push('Predictable performance with no cold starts');
    gains.push('Support for long-running processes');
    gains.push('Familiar technology stack for traditional teams');
    
    sacrifices.push('Higher operational overhead for management and patching');
    sacrifices.push('Manual capacity planning and scaling configuration');
    sacrifices.push('Paying for idle capacity during low traffic');
    sacrifices.push('Longer deployment and setup times');
  } else if (architecture.compute === 'ECS') {
    gains.push('Efficient resource utilization through containers');
    gains.push('Excellent orchestration for microservices');
    gains.push('Balance of control and managed services');
    gains.push('Support for modern DevOps practices');
    
    sacrifices.push('Container management complexity');
    sacrifices.push('Learning curve for container orchestration');
    sacrifices.push('More operational overhead than pure serverless');
  } else {
    // Hybrid architecture
    gains.push('Flexibility to use best service for each layer');
    gains.push('Balance of cost-efficiency and performance');
    gains.push('Scalability where needed most');
    
    sacrifices.push('Mixed operational models across layers');
    sacrifices.push('More complex architecture to manage');
  }

  // Add context-specific gains/sacrifices
  if (context.securityLevel === 'High' && architecture.database === 'RDS') {
    gains.push('Enterprise-grade security and compliance features');
  }

  if (context.traffic === 'High' && architecture.apiLoadBalancing === 'ALB') {
    gains.push('Cost-effective load balancing at high scale');
  }

  return {
    estimatedCostLevel,
    gains,
    sacrifices
  };
}

/**
 * Formats the complete output as a readable string
 */
export function formatAsString(output: FormattedOutput): string {
  let result = '';

  // 1. User Context
  result += '# AWS Cloud Architecture Recommendation\n\n';
  result += '## 1. User Context\n\n';
  result += output.userContextSummary + '\n\n';

  // 2. Service Comparison Tables
  result += '## 2. Service Comparison Tables\n\n';
  result += output.comparisonTables.compute + '\n';
  result += output.comparisonTables.database + '\n';
  result += output.comparisonTables.storage + '\n';
  result += output.comparisonTables.apiLoadBalancing + '\n';

  // 3. Decision Analysis
  result += '## 3. ' + output.decisionAnalysis;

  // 4. Final Architecture
  result += '## 4. ' + output.finalArchitecture;

  // 5. Cost & Trade-Off Summary
  result += '## 5. Cost & Trade-Off Summary\n\n';
  result += `**Estimated Cost Level:** ${output.costTradeoffSummary.estimatedCostLevel}\n\n`;
  result += '**What You Gain:**\n';
  for (const gain of output.costTradeoffSummary.gains) {
    result += `- ${gain}\n`;
  }
  result += '\n**What You Sacrifice:**\n';
  for (const sacrifice of output.costTradeoffSummary.sacrifices) {
    result += `- ${sacrifice}\n`;
  }

  return result;
}
