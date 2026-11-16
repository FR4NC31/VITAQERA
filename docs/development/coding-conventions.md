# VitaQera — Coding Conventions

## 1. Purpose

This document establishes shared coding standards for VitaQera.

All agents and contributors should follow these conventions to maintain consistency, readability, maintainability, and reliability.

The existing repository configuration and approved architecture decisions take precedence over generic recommendations.

## 2. General Principles

- Write readable, maintainable, and type-safe code.
- Prefer simple solutions over unnecessary abstractions.
- Avoid duplicated logic.
- Use meaningful names for variables, functions, components, and files.
- Keep functions and components focused.
- Handle errors explicitly.
- Avoid unsafe type assertions and unnecessary use of `any`.
- Do not introduce dependencies without approval.

## 3. TypeScript

- Use TypeScript for mobile and backend development.
- Prefer explicit types for public interfaces and important contracts.
- Use type inference where it improves readability.
- Avoid `any` unless justified.
- Validate external and user-provided data at runtime.
- Keep shared types in appropriate shared packages when justified.
- Do not assume compile-time types guarantee runtime validation.

## 4. Naming Conventions

Follow existing repository conventions whenever they are established.

Recommended defaults:

| Element    | Convention                  | Example              |
| ---------- | --------------------------- | -------------------- |
| Variables  | camelCase                   | `userProfile`        |
| Functions  | camelCase                   | `calculateCalories`  |
| Components | PascalCase                  | `ProfileCard`        |
| Types      | PascalCase                  | `UserProfile`        |
| Constants  | Existing project convention | `DEFAULT_GOAL`       |
| Hooks      | `use` prefix                | `useAuth`            |
| Files      | Follow directory convention | `profile-screen.tsx` |

Do not rename existing files or symbols without approval.

## 5. Mobile Development

- Use Expo and React Native conventions.
- Follow Expo Router navigation patterns.
- Use reusable components where appropriate.
- Use Zustand only for suitable shared client state.
- Keep presentation, business logic, and data access appropriately separated.
- Use the approved design system.
- Use `theme.ts` as the source of truth for design tokens.
- Use Sora for headings and Manrope for body text, following the approved design.
- Prefer the established `@/` path aliases where configured.
- Support Android-first behavior and test platform-specific functionality.

## 6. Backend Development

- Follow Hono conventions.
- Keep route handlers focused.
- Separate business logic from HTTP transport concerns where appropriate.
- Validate request parameters, query strings, and bodies.
- Apply authentication and authorization server-side.
- Use consistent response and error handling.
- Avoid exposing internal implementation details or sensitive information.
- Keep external service integrations isolated and testable.

## 7. Database Development

- Follow PostgreSQL and Drizzle conventions.
- Use descriptive table and column names.
- Define appropriate constraints and indexes.
- Use migrations for approved schema changes.
- Enforce user-data ownership and isolation.
- Apply and test appropriate Row-Level Security policies.
- Never make production schema changes without approval.

## 8. Error Handling and Logging

- Handle expected errors explicitly.
- Avoid silently swallowing exceptions.
- Return consistent API errors.
- Do not log passwords, OTP codes, access tokens, API keys, or database credentials.
- Use appropriate log levels.
- Avoid exposing sensitive user information in logs.

## 9. Security and Privacy

- Never hardcode secrets.
- Never commit environment secrets.
- Validate untrusted input.
- Apply least-privilege access.
- Avoid trusting client-side authorization.
- Follow the approved security guidelines.
- Protect personal fitness and nutrition information.

## 10. Testing and Validation

- Add tests for important business logic.
- Test API behavior and authorization.
- Test database constraints and RLS policies.
- Validate mobile interactions and error states.
- Run relevant type checks, linting, and tests after approved changes.
- Report failures honestly.

## 11. Documentation

- Document non-obvious behavior.
- Keep API contracts updated.
- Record significant architecture decisions through ADRs.
- Update implementation checkpoints when meaningful progress occurs.
- Update the changelog for changes included in releases.

## 12. Change Control

- Inspect existing code before proposing modifications.
- Present a clear implementation plan.
- Obtain explicit approval before modifying project files.
- Keep changes within the approved scope.
- Do not perform Git operations without approval.
- Do not automatically implement application code on behalf of the user.
- Report files inspected, proposed changes, validation results, and remaining issues.
