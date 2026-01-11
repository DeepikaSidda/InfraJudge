/**
 * AWS Cloud Referee - Main Pipeline
 * Orchestrates the complete recommendation process
 */

import { UserContext, FormattedOutput, ErrorResponse } from './types';
import { captureAndValidateContext } from './context-capture';
import { 
  compareComputeServices, 
  compareDatabaseServices, 
  compareStorageServices, 
  compareAPIServices 
} from './service-comparison';
import { 
  decideComputeService, 
  decideDatabaseService, 
  decideStorageService, 
  decideAPIService 
} from './decision-engine';
import { synthesizeArchitecture } from './architecture-synthesis';
import { formatOutput, formatAsString } from './output-formatter';
import { createErrorResponse, isErrorResponse } from './error-handling';

/**
 * Main function to generate AWS architecture recommendation
 * @param rawInput - User context input
 * @returns Formatted recommendation or error response
 */
export function generateRecommendation(rawInput: Record<string, any>): FormattedOutput | ErrorResponse {
  try {
    // Step 1: Capture and validate context
    const contextOrError = captureAndValidateContext(rawInput);
    if (isErrorResponse(contextOrError)) {
      return contextOrError;
    }
    const context = contextOrError as UserContext;

    // Step 2: Compare services across all layers
    const comparisons = [
      compareComputeServices(context),
      compareDatabaseServices(context),
      compareStorageServices(context),
      compareAPIServices(context)
    ];

    // Step 3: Make decisions for each layer
    const decisions = [
      decideComputeService(context, comparisons[0]),
      decideDatabaseService(context, comparisons[1]),
      decideStorageService(context, comparisons[2]),
      decideAPIService(context, comparisons[3])
    ];

    // Step 4: Synthesize architecture
    const architecture = synthesizeArchitecture(decisions);

    // Step 5: Format output
    const output = formatOutput(context, comparisons, decisions, architecture);

    return output;
  } catch (error) {
    return createErrorResponse(
      'Failed to generate recommendation',
      { error: error instanceof Error ? error.message : String(error) }
    );
  }
}

/**
 * Generates recommendation and returns as formatted string
 * @param rawInput - User context input
 * @returns Formatted string recommendation or error message
 */
export function generateRecommendationString(rawInput: Record<string, any>): string {
  const result = generateRecommendation(rawInput);
  
  if (isErrorResponse(result)) {
    return `Error: ${result.message}\n${result.details ? JSON.stringify(result.details, null, 2) : ''}`;
  }
  
  return formatAsString(result);
}
