# Implementation Plan: Enhanced Service Comparison Display

## Overview

This implementation enhances the InfraJudge recommendation system to display comprehensive service comparisons with all AWS alternatives, detailed ratings, and trade-off analysis.

## Tasks

- [ ] 1. Create service ratings database
  - Create new file `public/service-ratings.js` with complete ratings data for all AWS services
  - Include ratings for: Lambda, EC2, ECS, DynamoDB, RDS, S3, EBS, EFS, API Gateway, ALB
  - Each service should have: costEfficiency, scalability, easeOfUse, performance, flexibility (1-5 scale)
  - Include pros, cons, and bestFor descriptions for each service
  - _Requirements: 2.1, 2.2_

- [ ] 2. Enhance backend output formatter
  - [ ] 2.1 Update `src/output-formatter.ts` to include all service alternatives
    - Modify `formatOutput` function to include `layerComparisons` array
    - Create `formatLayerComparisons` function that returns all services per layer
    - Ensure each layer includes: Compute (Lambda, EC2, ECS), Database (DynamoDB, RDS), Storage (S3, EBS, EFS), API (API Gateway, ALB)
    - Mark recommended service with `isRecommended: true`
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 2.2 Write property test for layer comparisons
    - **Property 1: All Services Displayed**
    - **Validates: Requirements 1.2**

- [ ] 3. Create frontend comparison components
  - [ ] 3.1 Add `renderComparisonCard` function to `public/app.js`
    - Display service layer name
    - Show recommended service (highlighted)
    - Show alternative services
    - Include comparison table
    - Include trade-off analysis section
    - _Requirements: 1.1, 1.3, 3.1_

  - [ ] 3.2 Add `renderServiceDetails` function to `public/app.js`
    - Display service name and overall score
    - Show "Recommended" badge for recommended service
    - Render 5 rating bars (Cost, Scalability, Ease of Use, Performance, Flexibility)
    - Display pros and cons lists
    - Show "Best For" description
    - _Requirements: 2.1, 2.2, 2.3, 4.3_

  - [ ] 3.3 Add `renderComparisonTable` function to `public/app.js`
    - Create table with columns: Service, Overall Score, Cost, Scalability, Performance, Best For
    - Highlight recommended service row
    - Use color-coded rating cells (green/yellow/red)
    - Make table responsive for mobile
    - _Requirements: 3.2, 3.3_

  - [ ]* 3.4 Write unit tests for rendering functions
    - Test comparison card rendering with valid data
    - Test service details rendering
    - Test comparison table rendering
    - Test error handling for missing data
    - _Requirements: 1.1, 2.1, 3.2_

- [ ] 4. Add rating visualization components
  - [ ] 4.1 Add `renderRatingBar` function to `public/app.js`
    - Create progress bar visualization for ratings
    - Use color gradient based on rating value (1-5)
    - Show rating label and numeric value
    - Add smooth animation on load
    - _Requirements: 2.2, 2.4_

  - [ ] 4.2 Add `renderRatingCell` function for table cells
    - Create compact rating display for table cells
    - Use color-coded badges (green for 4-5, yellow for 3, red for 1-2)
    - Show numeric value
    - _Requirements: 2.4, 3.2_

  - [ ] 4.3 Add `calculateOverallScore` function
    - Calculate average of 5 rating criteria
    - Round to one decimal place
    - Return formatted string
    - _Requirements: 2.3_

  - [ ]* 4.4 Write property test for overall score calculation
    - **Property 4: Overall Score Calculation**
    - **Validates: Requirements 2.3**

- [ ] 5. Implement trade-off analysis display
  - [ ] 5.1 Add `renderTradeoffAnalysis` function to `public/app.js`
    - Display reasoning for recommended service selection
    - Show "Why this service?" section
    - Show "When to choose alternatives" section
    - Include specific scenarios for each alternative
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 5.2 Add `getComparisonReason` function
    - Return detailed comparison text for service pairs
    - Reference specific rating differences
    - Provide actionable guidance
    - _Requirements: 4.2, 4.3_

- [ ] 6. Update main results display
  - [ ] 6.1 Modify `showResults` function in `public/app.js`
    - Add comparison cards section after architecture diagram
    - Display one comparison card per service layer (Compute, Database, Storage, API)
    - Maintain existing sections (context summary, architecture, cost summary)
    - Ensure proper animation delays for staggered appearance
    - _Requirements: 1.1, 6.1, 6.2_

  - [ ] 6.2 Update CSS in `public/styles.css`
    - Add styles for `.comparison-card`
    - Add styles for `.service-details`, `.recommended`, `.alternative`
    - Add styles for `.ratings-grid`, `.rating-bar`
    - Add styles for `.comparison-table`
    - Add styles for `.pros-cons`, `.best-for`
    - Ensure responsive design for mobile devices
    - _Requirements: 1.3, 2.2, 3.2_

- [ ] 7. Add error handling and fallbacks
  - [ ] 7.1 Add `renderFallbackComparison` function
    - Handle missing comparison data gracefully
    - Display simplified view when detailed data unavailable
    - Show error message to user
    - _Requirements: 1.1_

  - [ ] 7.2 Add validation in `renderComparisonCard`
    - Check for required data fields
    - Validate rating values are in range 1-5
    - Catch and log rendering errors
    - Fall back to simplified view on error
    - _Requirements: 2.2_

  - [ ]* 7.3 Write unit tests for error handling
    - Test fallback rendering with missing data
    - Test validation of rating values
    - Test error state rendering
    - _Requirements: 2.2_

- [ ] 8. Checkpoint - Test basic comparison display
  - Ensure all tests pass, ask the user if questions arise.
  - Manually test the recommendation form with various inputs
  - Verify all service alternatives are displayed
  - Verify ratings and comparison tables render correctly

- [ ] 9. Optional: Add AWS Bedrock integration
  - [ ] 9.1 Create `src/ai-comparison.ts` file
    - Install AWS SDK: `npm install @aws-sdk/client-bedrock-runtime`
    - Implement `generateAIComparison` function
    - Use Claude 3 Sonnet model for comparisons
    - Include user context in AI prompt
    - _Requirements: 5.1, 5.2_

  - [ ] 9.2 Add AI insights to output formatter
    - Call `generateAIComparison` for each service layer
    - Add `aiInsights` field to output
    - Implement fallback to rule-based comparison on error
    - _Requirements: 5.3_

  - [ ] 9.3 Display AI insights in frontend
    - Add AI insights section to comparison cards
    - Show "AI-Powered Insights" badge
    - Display insights in expandable section
    - _Requirements: 5.1, 5.4_

  - [ ]* 9.4 Write integration tests for AI features
    - Test AI comparison generation
    - Test fallback to rule-based comparison
    - Test AI insights display
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 10. Final testing and polish
  - [ ] 10.1 Test complete recommendation flow
    - Test with various project requirements
    - Verify comparisons are relevant to user input
    - Test responsive design on mobile devices
    - _Requirements: 1.1, 2.1, 3.1, 4.1_

  - [ ] 10.2 Add loading states for comparisons
    - Show skeleton loaders while data loads
    - Add smooth transitions when data appears
    - _Requirements: 6.1_

  - [ ] 10.3 Optimize performance
    - Minimize DOM manipulations
    - Lazy load comparison tables
    - Optimize CSS animations
    - _Requirements: 6.1_

  - [ ]* 10.4 Write end-to-end tests
    - Test full user flow from form submission to comparison display
    - Test all service layers display correctly
    - Test interaction with comparison tables
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1_

- [ ] 11. Final checkpoint - Complete feature
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all requirements are met
  - Test with real user scenarios
  - Document any known limitations

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- AI integration (tasks 9.x) is optional and can be added later
- Focus on core comparison display first (tasks 1-8) before adding AI features

