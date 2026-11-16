---
name: vitaqera-mobile
description: Build, review, debug, and maintain VitaQera's Android-first mobile application using Expo, React Native, Expo Router, TypeScript, Zustand, and native capabilities. Use for mobile architecture, screens, navigation, state management, API integration, UI implementation, performance, accessibility, and mobile testing.
---

# VitaQera Mobile Engineering

## Purpose

Establish consistent mobile engineering practices for VitaQera, prioritizing usability, performance, accessibility, security, maintainability, and a polished Android-first experience.

## 1. Technology Context

The intended mobile stack includes:

- Expo for the application platform.
- React Native for native application interfaces.
- Expo Router for file-based navigation.
- TypeScript for application code.
- Zustand for client-side state management.
- React Native StyleSheet for styling.
- Better Auth for authentication integration with the backend.

These are reference decisions. Inspect the current project and installed versions before making recommendations.

## 2. Project Context

Before implementation or review:

1. Read root `AGENTS.md`.
2. Review relevant documentation in `docs/`.
3. Inspect the existing mobile application structure.
4. Review navigation, themes, components, features, and state management.
5. Check installed dependencies and Expo SDK compatibility.
6. Review existing implementation checkpoints.
7. Coordinate with UI/UX Designer for design decisions.
8. Coordinate with Backend Engineer for API integration.
9. Coordinate with QA Engineer for testing strategy.

Never assume previous project information is still current.

## 3. Mobile Architecture

Follow the established project architecture.

Prefer clear separation between:

- App routes and layouts.
- Reusable UI components.
- Feature-specific components and logic.
- Hooks.
- State management.
- API services.
- Shared utilities.
- Theme and design tokens.

Keep components focused and reusable when appropriate.

Avoid unnecessary abstractions, excessive component nesting, and duplicated business logic.

Do not introduce a new architectural pattern without explaining why it is needed.

## 4. Expo and React Native Compatibility

- Verify compatibility with the installed Expo SDK.
- Check React Native and React version requirements.
- Use Expo-compatible packages.
- Prefer supported Expo APIs.
- Check whether native configuration or development builds are required.
- Avoid unsupported assumptions about Expo Go.
- Review platform-specific behavior for Android and iOS.

Use official Expo and React Native documentation for version-sensitive decisions.

## 5. UI and Design System

VitaQera's approved visual direction:

- Android-first experience.
- Light ocean-blue visual identity.
- Modern, polished, premium feel.
- Sora for headings.
- Manrope for body text.
- `theme.ts` as the single source of truth for design tokens.

Requirements:

- Reuse existing theme tokens.
- Maintain consistent spacing, typography, colors, radii, and component behavior.
- Avoid arbitrary hardcoded design values when a token exists.
- Support different screen sizes.
- Respect safe areas and system UI.
- Maintain visual consistency across screens.
- Use clear loading, error, empty, and success states.

Coordinate visual decisions with UI/UX Designer.

## 6. Design Inspiration Workflow

When the user provides screenshots, Figma designs, websites, or other inspiration:

1. Examine the reference carefully.
2. Identify its layout, visual hierarchy, typography, spacing, colors, components, and interactions.
3. Evaluate usability, accessibility, and Android suitability.
4. Compare it against VitaQera's existing design system.
5. Explain which elements should be reused, adapted, or avoided.
6. Present a recommendation:
   - APPROVE
   - APPROVE WITH MODIFICATIONS
   - REJECT
7. Wait for the user's decision.

Never assume a reference is approved simply because it was submitted.

Approval of a design reference does not automatically authorize modifications to project files.

## 7. Navigation and State Management

- Follow existing Expo Router conventions.
- Keep route responsibilities clear.
- Use Zustand for shared client-side state where appropriate.
- Avoid duplicating server data unnecessarily.
- Separate local UI state from persistent application data.
- Handle loading, error, and unauthenticated states.
- Protect authenticated routes appropriately.
- Avoid unnecessary global state.

## 8. Backend and API Integration

- Use established API service conventions.
- Keep API calls outside presentational components where appropriate.
- Handle network failures and timeouts.
- Validate API response assumptions.
- Manage authentication sessions securely.
- Handle token expiration and session refresh according to the approved backend design.
- Avoid exposing server secrets in the mobile application.
- Avoid trusting client-side checks as authorization.

Coordinate API contracts with Backend Engineer.

## 9. Performance

Consider:

- Unnecessary re-renders.
- Large lists and list virtualization.
- Image loading and caching.
- Expensive calculations.
- Animation performance.
- Bundle size.
- Memory usage.
- Network requests.
- Startup and navigation performance.

Measure actual problems before introducing optimization complexity.

## 10. Accessibility and User Experience

Ensure:

- Readable text and adequate contrast.
- Appropriate touch target sizes.
- Screen-reader labels.
- Clear navigation and feedback.
- Keyboard-friendly forms.
- Appropriate error messages.
- Predictable interactions.
- Reduced-motion considerations where applicable.

Use positive, motivating language. Avoid guilt, shame, or judgment around fitness, food, body measurements, or progress.

## 11. VitaQera Product Context

VitaQera is a personal fitness and nutrition application.

Relevant feature areas include:

- User profile and body measurements.
- Weight tracking and progress history.
- Calories and macronutrient tracking.
- Food and barcode scanning.
- Water tracking.
- Workout guidance and workout sessions.
- Notifications and reminders.
- Nutrition and fitness insights.

Inspect the existing roadmap before implementing or recommending features.

Do not expand the approved release scope without user approval.

## 12. Security and Privacy

- Store sensitive tokens using appropriate secure storage.
- Never store passwords in plain text.
- Avoid logging authentication credentials or personal data.
- Protect sensitive screens and session handling.
- Validate data received from APIs.
- Use HTTPS for production API communication.
- Avoid
