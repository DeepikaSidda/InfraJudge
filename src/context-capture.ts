/**
 * Context Capture Module
 * Handles user input validation and normalization
 */

import { UserContext, ValidationResult, ErrorResponse } from './types';
import { createErrorResponse } from './error-handling';

const VALID_BUDGET_VALUES = ['Low', 'Medium', 'High'] as const;
const VALID_TRAFFIC_VALUES = ['Low', 'Medium', 'High'] as const;
const VALID_SECURITY_VALUES = ['Low', 'Medium', 'High'] as const;

/**
 * Captures and normalizes raw input into a UserContext object
 */
export function captureContext(rawInput: Record<string, any>): UserContext {
  return {
    appType: rawInput.appType || '',
    budget: rawInput.budget || 'Medium',
    expectedUsers: rawInput.expectedUsers || 0,
    traffic: rawInput.traffic || 'Medium',
    securityLevel: rawInput.securityLevel || 'Medium',
    workloadType: rawInput.workloadType || ''
  };
}

/**
 * Validates a UserContext for completeness and correctness
 */
export function validateContext(context: UserContext): ValidationResult {
  const errors: string[] = [];

  // Check required string fields are non-empty
  if (!context.appType || context.appType.trim() === '') {
    errors.push('appType is required and cannot be empty');
  }

  if (!context.workloadType || context.workloadType.trim() === '') {
    errors.push('workloadType is required and cannot be empty');
  }

  // Validate budget enum
  if (!VALID_BUDGET_VALUES.includes(context.budget)) {
    errors.push(`budget must be one of: ${VALID_BUDGET_VALUES.join(', ')}`);
  }

  // Validate traffic enum
  if (!VALID_TRAFFIC_VALUES.includes(context.traffic)) {
    errors.push(`traffic must be one of: ${VALID_TRAFFIC_VALUES.join(', ')}`);
  }

  // Validate security level enum
  if (!VALID_SECURITY_VALUES.includes(context.securityLevel)) {
    errors.push(`securityLevel must be one of: ${VALID_SECURITY_VALUES.join(', ')}`);
  }

  // Validate expectedUsers is present (can be number or string)
  if (context.expectedUsers === undefined || context.expectedUsers === null) {
    errors.push('expectedUsers is required');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}


/**
 * Safely captures and validates context, returning either context or error
 */
export function captureAndValidateContext(rawInput: Record<string, any>): UserContext | ErrorResponse {
  try {
    const context = captureContext(rawInput);
    const validation = validateContext(context);
    
    if (!validation.valid) {
      return createErrorResponse(
        'Invalid user context provided',
        { errors: validation.errors }
      );
    }
    
    return context;
  } catch (error) {
    return createErrorResponse(
      'Failed to capture user context',
      { error: error instanceof Error ? error.message : String(error) }
    );
  }
}
