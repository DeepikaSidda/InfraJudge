#!/usr/bin/env node
/**
 * AWS Cloud Referee - Command Line Interface
 */

import { generateRecommendationString } from './src/cloud-referee';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('='.repeat(80));
  console.log('AWS Cloud Referee - Interactive Architecture Recommendation');
  console.log('='.repeat(80));
  console.log();

  try {
    const appType = await question('What type of application? (e.g., Startup, SaaS, Enterprise, ML): ');
    const budget = await question('Budget level? (Low/Medium/High): ');
    const expectedUsers = await question('Expected number of users? (e.g., 1000): ');
    const traffic = await question('Traffic level? (Low/Medium/High): ');
    const securityLevel = await question('Security requirements? (Low/Medium/High): ');
    const workloadType = await question('Workload type? (e.g., API-based, Web App, ML, Data Processing): ');

    console.log('\n' + '='.repeat(80));
    console.log('Generating recommendation...');
    console.log('='.repeat(80) + '\n');

    const recommendation = generateRecommendationString({
      appType,
      budget,
      expectedUsers,
      traffic,
      securityLevel,
      workloadType
    });

    console.log(recommendation);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

main();
