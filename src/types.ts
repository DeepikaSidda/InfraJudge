/**
 * Core type definitions for AWS Cloud Referee
 */

/**
 * User context containing all input parameters for architecture recommendation
 */
export interface UserContext {
  appType: string;        // e.g., "Startup", "SaaS", "Enterprise", "ML", "FinTech"
  budget: "Low" | "Medium" | "High";
  expectedUsers: number | string;
  traffic: "Low" | "Medium" | "High";
  securityLevel: "Low" | "Medium" | "High";
  workloadType: string;   // e.g., "API-based", "Web App", "Data Processing", "ML"
  projectDescription?: string;  // Optional detailed project description
}

/**
 * Validation result for user context
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

/**
 * Comparison of a single AWS service across standardized criteria
 */
export interface ServiceComparison {
  serviceName: string;
  cost: string;           // Description of cost characteristics
  scalability: string;    // Description of scaling behavior
  maintenance: string;    // Description of maintenance effort
  performance: string;    // Description of performance characteristics
  bestFor: string;        // Best use case description
}

/**
 * Comparison of all services within a single layer
 */
export interface LayerComparison {
  layerName: string;
  services: ServiceComparison[];
}

/**
 * Recommendation for a single service with justification
 */
export interface ServiceRecommendation {
  serviceName: string;
  reason: string;         // Why this service was chosen
  alternatives: {
    serviceName: string;
    rejectionReason: string;  // Why this alternative was rejected
  }[];
}

/**
 * Decision for a single layer
 */
export interface LayerDecision {
  layerName: string;
  recommendation: ServiceRecommendation;
}

/**
 * Final architecture recommendation combining all layers
 */
export interface ArchitectureRecommendation {
  compute: string;
  database: string;
  storage: string;
  apiLoadBalancing: string;
  rationale: string;      // Why this combination works together
  integration: string;    // How services integrate
}

/**
 * Ratings for a service across multiple criteria
 */
export interface ServiceRatings {
  costEfficiency: number;   // 1-5: how cost-effective
  scalability: number;      // 1-5: how well it scales
  easeOfUse: number;        // 1-5: how easy to set up and manage
  performance: number;      // 1-5: speed and reliability
  flexibility: number;      // 1-5: customization options
}

/**
 * Service with ratings and recommendation flag
 */
export interface ServiceWithRatings {
  service: string;
  cost: string;
  scalability: string;
  bestFor: string;
  ratings: ServiceRatings;
  overallScore: number;     // Average of all ratings (1-5)
  recommended: boolean;     // True if this is the recommended service for this layer
  reasoning: string;        // Explanation of why this service is/isn't recommended
}

/**
 * Complete formatted output for the user
 */
export interface FormattedOutput {
  userContextSummary: string;
  comparisonTables: {
    compute: ServiceWithRatings[] | string;      // Array of services with ratings or Markdown table (backward compatible)
    database: ServiceWithRatings[] | string;     // Array of services with ratings or Markdown table (backward compatible)
    storage: ServiceWithRatings[] | string;      // Array of services with ratings or Markdown table (backward compatible)
    apiLoadBalancing: ServiceWithRatings[] | string;  // Array of services with ratings or Markdown table (backward compatible)
  };
  decisionAnalysis: string;
  finalArchitecture: string;
  costTradeoffSummary: {
    estimatedCostLevel: "Low" | "Medium" | "High";
    gains: string[];
    sacrifices: string[];
  };
}

/**
 * Error response format
 */
export interface ErrorResponse {
  error: true;
  message: string;
  details?: Record<string, any>;
}
