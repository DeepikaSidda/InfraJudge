/**
 * Error Handling Utilities
 * Provides consistent error handling across all modules
 */

import { ErrorResponse } from './types';

/**
 * Creates a standardized error response
 */
export function createErrorResponse(message: string, details?: Record<string, any>): ErrorResponse {
  return {
    error: true,
    message,
    details
  };
}

/**
 * Validates that an error response is properly formatted
 */
export function isErrorResponse(obj: any): obj is ErrorResponse {
  return obj && obj.error === true && typeof obj.message === 'string';
}
