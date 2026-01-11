/**
 * Example usage of AWS Cloud Referee
 */

import { generateRecommendationString } from './src/cloud-referee';

// Example 1: Startup with low budget
console.log('='.repeat(80));
console.log('EXAMPLE 1: Startup with Low Budget');
console.log('='.repeat(80));

const startupContext = {
  appType: 'Startup',
  budget: 'Low',
  expectedUsers: 1000,
  traffic: 'Low',
  securityLevel: 'Medium',
  workloadType: 'API-based'
};

console.log(generateRecommendationString(startupContext));

// Example 2: Enterprise with high security
console.log('\n\n' + '='.repeat(80));
console.log('EXAMPLE 2: Enterprise with High Security');
console.log('='.repeat(80));

const enterpriseContext = {
  appType: 'Enterprise',
  budget: 'High',
  expectedUsers: 100000,
  traffic: 'High',
  securityLevel: 'High',
  workloadType: 'Web App'
};

console.log(generateRecommendationString(enterpriseContext));

// Example 3: ML workload
console.log('\n\n' + '='.repeat(80));
console.log('EXAMPLE 3: ML Workload');
console.log('='.repeat(80));

const mlContext = {
  appType: 'ML',
  budget: 'Medium',
  expectedUsers: 5000,
  traffic: 'Medium',
  securityLevel: 'Medium',
  workloadType: 'Machine Learning'
};

console.log(generateRecommendationString(mlContext));

// Example 4: Invalid context (missing fields)
console.log('\n\n' + '='.repeat(80));
console.log('EXAMPLE 4: Invalid Context (Error Handling)');
console.log('='.repeat(80));

const invalidContext = {
  appType: '',
  budget: 'Low'
  // Missing required fields
};

console.log(generateRecommendationString(invalidContext));
