# VitaQera — Development Roadmap

## 1. Purpose

This roadmap defines the planned development phases of VitaQera.

It provides a shared reference for the Project Architect, specialists, and the user.

The roadmap is a planning document, not proof that a feature has been implemented.

## 2. Development Principles

- Build incrementally.
- Prioritize backend foundations before mobile integration.
- Complete and validate each phase before advancing.
- Avoid implementing unrelated features prematurely.
- Maintain security, privacy, performance, and maintainability.
- Require user approval before project modifications.
- Keep roadmap progress synchronized with implementation checkpoints.

## 3. Development Phases

### Phase 1 — Project Foundation

Objectives:

- Establish the monorepo structure.
- Configure the mobile application.
- Configure the backend API.
- Establish shared packages and project conventions.
- Configure development and validation tooling.

Status: Existing foundation; verify current repository state.

### Phase 2 — Backend Authentication

Objectives:

- Configure Better Auth.
- Implement email/password registration and sign-in.
- Implement email OTP verification.
- Integrate Brevo transactional email.
- Implement session handling.
- Configure authentication security and rate limiting.
- Validate authentication endpoints and error handling.

Completion criteria:

- Registration and sign-in work.
- Email verification works.
- Sessions are handled securely.
- Authentication tests pass.

### Phase 3 — Authentication UI/UX

Objectives:

- Review and approve authentication design inspiration.
- Finalize authentication screens.
- Implement welcome and onboarding entry screens.
- Implement sign-up, sign-in, and OTP verification interfaces.
- Validate accessibility and responsive layouts.

Completion criteria:

- Authentication screens follow the approved design system.
- Main authentication flows are usable and validated.

### Phase 4 — Mobile Authentication Integration

Objectives:

- Connect mobile authentication screens to the backend.
- Implement session persistence and handling.
- Handle loading, success, and error states.
- Protect authenticated navigation.
- Test authentication on Android.

Completion criteria:

- Mobile registration and sign-in work with the backend.
- Email verification works end-to-end.
- Session handling and navigation are validated.

### Phase 5 — User Profile and Onboarding

Objectives:

- Implement profile setup.
- Collect relevant personal fitness information.
- Implement height, weight, birthday, and fitness goals.
- Validate onboarding data.
- Persist profile information securely.

### Phase 6 — Core Nutrition Features

Objectives:

- Implement food logging.
- Implement calorie and macronutrient tracking.
- Implement daily nutrition goals.
- Explore food and barcode lookup integrations.
- Establish food data validation.

### Phase 7 — Core Fitness Features

Objectives:

- Implement workout tracking.
- Implement exercises, sets, reps, and weights.
- Implement workout sessions and rest timers.
- Support relevant fitness goals.

### Phase 8 — Hydration Tracking

Objectives:

- Implement water intake logging.
- Configure daily hydration goals.
- Display hydration progress and history.

### Phase 9 — Progress Tracking

Objectives:

- Implement weight logging and history.
- Implement progress charts.
- Display nutrition and fitness trends.
- Track goals and milestones.
- Display relevant activity summaries.

### Phase 10 — Notifications

Objectives:

- Implement local notifications.
- Implement approved remote notification workflows.
- Create notification preferences.
- Support notification categories and scheduling.
- Implement quiet hours and frequency controls.

### Phase 11 — Advanced Features and Integrations

Potential objectives:

- Food image recognition.
- AI nutrition assistance and AI Coach.
- Barcode scanning enhancements.
- Smartwatch and fitness platform integrations.
- Strava integration.
- Additional approved external services.

These features require separate evaluation and approval before implementation.

### Phase 12 — Quality Assurance and Production Readiness

Objectives:

- Complete security reviews.
- Complete database and RLS testing.
- Perform API and mobile integration testing.
- Perform regression and performance testing.
- Validate accessibility.
- Review backups and recovery procedures.
- Prepare production deployment and release documentation.

Completion criteria:

- Critical issues are resolved.
- Required tests pass.
- Security findings are reviewed.
- Production readiness is approved by the user.

## 4. Phase Dependencies

The intended initial sequence is:

1. Project Foundation
2. Backend Authentication
3. Authentication UI/UX
4. Mobile Authentication Integration
5. User Profile and Onboarding

Later phases may be adjusted when technical dependencies or approved product decisions require it.

## 5. Progress Tracking

Each phase must have a corresponding implementation checkpoint.

Use these statuses:

- Not Started
- In Progress
- Blocked
- In Review
- Completed

A phase must not be marked Completed without evidence that its completion criteria have been met.

## 6. Roadmap Change Management

- The Project Architect coordinates roadmap updates.
- Specialists provide technical recommendations.
- The user approves significant scope, priority, and architectural changes.
- Completed work must remain recorded.
- Do not erase historical progress when changing priorities.
- Update related implementation checkpoints whenever roadmap progress changes.

## 7. Current Development Priority

The initial priority is to verify the existing project foundation and continue with backend authentication.

Do not assume that a phase is complete merely because its planned technologies or files exist.
