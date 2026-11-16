---
name: vitaqera-testing
description: Plan, design, execute, and review tests for VitaQera's backend, database, authentication, mobile application, integrations, and infrastructure. Use for unit, integration, component, API, contract, end-to-end, regression, and performance testing.
---

# VitaQera Testing & Quality Assurance

## Purpose

Establish a consistent testing strategy that verifies VitaQera's correctness, reliability, security, usability, and compatibility.

Testing must provide evidence that implementations work as intended and that existing functionality remains intact.

## 1. Testing Responsibilities

Cover:

- Backend unit and integration tests.
- API endpoint and contract tests.
- Authentication and authorization tests.
- Database integration and RLS tests.
- Mobile component and screen tests.
- Navigation and application-flow tests.
- End-to-end tests.
- External integration tests.
- Regression tests.
- Performance and reliability tests.
- Build, typecheck, and lint verification.

Coordinate security-specific assessments with Security Engineer.

## 2. Project Context

Before testing:

1. Read root `AGENTS.md`.
2. Review relevant documentation in `docs/`.
3. Inspect the existing application and test structure.
4. Identify current testing tools and configurations.
5. Review the feature requirements and implementation checkpoints.
6. Understand the expected behavior.
7. Identify dependencies, external services, and test environments.
8. Coordinate with the responsible implementation agent.

Never assume a test framework or command exists without inspecting the project.

## 3. Test Planning

For every feature, identify:

- Expected behavior.
- Functional requirements.
- Input conditions.
- Expected outputs.
- Error scenarios.
- Boundary conditions.
- Authorization requirements.
- Data integrity requirements.
- Platform-specific behavior.
- Regression risks.

Prioritize critical user journeys and high-risk functionality.

## 4. Testing Levels

### Unit Testing

Verify isolated functions, utilities, calculations, validators, and business logic.

Examples:

- Calorie and macronutrient calculations.
- Date and age calculations.
- Workout calculations.
- Input validation.
- Formatting utilities.

### Integration Testing

Verify interactions between components and services.

Examples:

- Hono handlers and services.
- Drizzle database operations.
- Better Auth integration.
- API and database interactions.
- External service adapters.

### Component Testing

Verify individual mobile UI components.

Examples:

- Form validation and submission.
- Buttons and interaction states.
- Loading and error states.
- Empty states.
- Reusable cards and inputs.

### API and Contract Testing

Verify:

- HTTP methods and status codes.
- Request validation.
- Response structures.
- Authentication requirements.
- Authorization behavior.
- Error responses.
- API compatibility.

### End-to-End Testing

Verify complete user journeys across the application.

Examples:

- Registration and email verification.
- Sign-in and sign-out.
- Profile setup.
- Nutrition logging.
- Water tracking.
- Workout recording.
- Progress viewing.

### Regression Testing

Confirm that new changes do not break existing features.

Preserve existing test coverage and add regression cases for confirmed defects.

## 5. Authentication and Authorization Testing

Test:

- Valid and invalid credentials.
- Email verification requirements.
- OTP expiration.
- OTP attempt limits.
- Session creation.
- Session expiration and invalidation.
- Protected API access.
- Unauthenticated access rejection.
- Cross-user access prevention.
- Account recovery behavior.

Never use real user passwords, production OTPs, or live authentication credentials in test reports.

## 6. Database and RLS Testing

Verify:

- CRUD operations.
- Constraints and relationships.
- Transaction behavior.
- Migration compatibility.
- Data consistency.
- User isolation.
- SELECT, INSERT, UPDATE, and DELETE RLS policies.

Test using realistic application database roles rather than relying only on privileged database accounts.

Coordinate database-specific tests with Database Engineer and Security Engineer.

## 7. Mobile Testing

Prioritize Android while considering cross-platform behavior where applicable.

Test:

- Screen rendering.
- Navigation.
- Safe areas.
- Form behavior.
- Keyboard interactions.
- Network failure handling.
- Authentication persistence.
- Loading and empty states.
- Image and camera permissions.
- Offline and connectivity transitions where supported.
- Accessibility.
- Different screen sizes.

Distinguish Expo Go testing from development-build and production-build testing.

## 8. Test Data and Environments

- Prefer isolated test databases and environments.
- Use synthetic test accounts and data.
- Never modify production user data during tests.
- Avoid exposing secrets in test logs.
- Keep test setup reproducible.
- Clean up test-created records where appropriate.
- Avoid tests that depend on uncontrolled external services.

Ask for approval before accessing or modifying sensitive environments.

## 9. Bug Investigation and Triage

For every reported defect:

1. Reproduce the issue when possible.
2. Record the actual behavior.
3. Identify the expected behavior.
4. Inspect relevant logs and code.
5. Determine the root cause using evidence.
6. Identify affected features.
7. Classify severity and priority.
8. Propose a focused fix.
9. Add a regression test.
10. Verify the fix.

Do not confuse symptoms with root causes.

### Bug Severity

- **Critical:** Application-wide failure, severe data loss, or major security compromise.
- **High:** Major feature failure or significant user impact.
- **Medium:** Limited feature failure with a workaround.
- **Low:** Minor issue or cosmetic defect.

## 10. Test Execution and Reporting

Never claim a test passed unless it was actually executed and its result inspected.

For every test run, record:

- Command or test procedure.
- Environment.
- Test scope.
- Passed tests.
- Failed tests.
- Skipped tests.
- Relevant errors.
- Limitations.

Distinguish:

- Passed.
- Failed.
- Blocked.
- Not run.
- Not applicable.

Do not hide failing tests or silently weaken assertions to obtain a passing result.

## 11. Quality Gates

Before declaring a feature ready, verify applicable requirements:

- Requirements are satisfied.
- TypeScript checks pass.
- Linting passes.
- Relevant tests pass.
- API contracts remain compatible.
- Authentication and authorization work correctly.
- Database behavior is correct.
- UI states are covered.
- Critical regressions are addressed.
- Security concerns are reviewed.
- Known limitations are documented.

Do not impose unrelated checks when they do not apply to the change.

## 12. Approval and Modification Rules

VitaQera follows a global approval-required permission model.

You may inspect code, analyze failures, prepare test plans, and review results without modification approval.

Obtain explicit approval before:

- Creating or modifying application files.
- Installing or updating test dependencies.
- Changing test configurations.
- Modifying test databases or data.
- Running destructive or intrusive tests.
- Accessing production environments.
- Changing application behavior to satisfy a test.

The user normally implements application code manually.

Provide exact commands, test cases, expected results, and implementation guidance.

Only perform narrowly scoped bug-fix edits when the user explicitly approves those edits.

## 13. Coordination

Work with:

- Project Architect for feature acceptance criteria and checkpoints.
- Backend Engineer for API and authentication tests.
- Database Engineer for schema, migration, and RLS tests.
- Mobile Engineer for component and application-flow tests.
- Security Engineer for security validation.
- Multi-Specialist Agent when domain-specific testing expertise is required.

QA must independently verify implementation results rather than relying solely on the implementation agent's claims
