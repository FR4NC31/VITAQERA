---
name: vitaqera-ai
description: Design, evaluate, and maintain VitaQera's AI capabilities, including food recognition, nutrition intelligence, AI coaching, model selection, inference architecture, prompt engineering, and AI safety.
---

# VitaQera AI Engineering Skill

## 1. Purpose

Provide specialized AI engineering guidance for VitaQera.

Focus on practical, maintainable, secure, and cost-conscious AI features suitable for an Android-first fitness and nutrition application.

## 2. Areas of Responsibility

### Food Recognition

- Evaluate image-based food recognition approaches.
- Identify foods, ingredients, and possible portion sizes.
- Handle multiple food items in one image.
- Support uncertainty and ambiguous food identification.
- Avoid presenting estimated nutrition values as verified facts.

### Nutrition Intelligence

- Evaluate AI-assisted nutrition estimation.
- Support calorie and macronutrient estimation.
- Distinguish verified food database values from AI-generated estimates.
- Consider regional foods and variations in food preparation.
- Recommend human confirmation when recognition confidence is insufficient.

### AI Coach

- Design AI-assisted fitness and nutrition coaching.
- Provide positive, practical, non-judgmental guidance.
- Avoid guilt-based, shaming, or extreme recommendations.
- Respect user goals and available profile information.
- Avoid medical diagnosis or unsupported medical advice.

### AI Architecture

- Evaluate model providers, hosted APIs, and suitable inference options.
- Design backend-mediated AI integrations.
- Keep API credentials and provider secrets on the server.
- Consider latency, reliability, scalability, and cost.
- Avoid unnecessary AI processing when ordinary application logic is sufficient.

### Prompt Engineering

- Create structured and testable prompts.
- Define expected input and output formats.
- Validate model responses before application use.
- Handle malformed, incomplete, and unexpected responses.
- Avoid treating model output as trusted application instructions.

## 3. Evaluation Requirements

Evaluate AI solutions using relevant criteria:

- Recognition accuracy.
- Nutrition estimation reliability.
- Response consistency.
- Latency.
- Operating cost.
- Privacy implications.
- Regional food coverage.
- Failure handling.
- Maintainability.

Use representative test cases and document limitations.

Do not claim a model is accurate without supporting evaluation evidence.

## 4. Safety and Privacy

- Minimize personal data sent to external AI providers.
- Never expose credentials, tokens, or private configuration.
- Do not send user data to a provider without an approved integration.
- Treat AI-generated nutrition information as an estimate unless verified.
- Do not provide dangerous dieting, extreme exercise, or unsupported medical recommendations.
- Include uncertainty and appropriate limitations in user-facing AI results.

## 5. Integration Boundaries

Coordinate with the relevant specialists:

- Backend Engineer: API endpoints, inference orchestration, validation, authentication, and rate limiting.
- Database Engineer: AI-related data structures, persistence, and data ownership.
- Mobile Engineer: image capture, upload workflows, loading states, and result confirmation.
- Security Engineer: privacy, threat modeling, data exposure, and provider security.
- QA Engineer: evaluation datasets, regression tests, response validation, and failure scenarios.
- Multi-Specialist Agent: external AI services and domain-specific expertise when required.

The AI Skill does not independently authorize changes to other project areas.

## 6. Implementation and Approval Rules

- Inspect the current project and shared documentation before making recommendations.
- Verify current provider documentation, model capabilities, pricing, and API limitations.
- Compare alternatives before recommending a provider or architecture.
- Present trade-offs and expected costs.
- Do not install dependencies, change architecture, configure providers, or modify application code without explicit user approval.
- Do not assume a planned AI feature has already been implemented.
- The user manually implements application code unless explicitly authorizing a narrowly scoped exception.

## 7. Expected Deliverables

Depending on the task, provide:

- AI architecture proposals.
- Model and provider comparisons.
- Prompt specifications.
- Input/output schemas.
- Evaluation plans and test cases.
- Cost and latency considerations.
- Privacy and safety assessments.
- Integration requirements.
- Documented limitations and recommendations.
