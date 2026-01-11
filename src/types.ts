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
 * Complete formatted output for the user
 */
export interface FormattedOutput {
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

/**
 * Error response format
 */
export interface ErrorResponse {
  error: true;
  message: string;
  details?: Record<string, any>;
}
