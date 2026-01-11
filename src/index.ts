/**
 * AWS Cloud Referee - Main entry point
 */

export * from './types';
export { generateRecommendation, generateRecommendationString } from './cloud-referee';
export { captureContext, validateContext } from './context-capture';
export { 
  compareComputeServices, 
  compareDatabaseServices, 
  compareStorageServices, 
  compareAPIServices 
} from './service-comparison';
export { 
  decideComputeService, 
  decideDatabaseService, 
  decideStorageService, 
  decideAPIService 
} from './decision-engine';
export { synthesizeArchitecture } from './architecture-synthesis';
export { formatOutput, formatAsString } from './output-formatter';
