# VitaQera — Project Overview

## 1. Project Description

VitaQera is an Android-first personal fitness and nutrition application designed to help users manage their fitness activities, nutrition habits, and personal progress in one place.

The application aims to provide a simple, motivating, and accessible experience for tracking health-related activities and building sustainable habits.

## 2. Product Vision

Help users understand and improve their fitness and nutrition habits through accessible tracking tools, useful insights, and encouraging guidance.

VitaQera should make personal fitness management easier without overwhelming users with unnecessary complexity.

## 3. Target Platform

### Primary Platform

- Android mobile application.

### Future Expansion

- iOS support may be considered.
- Additional platform support depends on future product requirements.

## 4. Core Product Areas

### 4.1 User Accounts and Authentication

- Email and password registration.
- Email verification using OTP codes.
- Secure sign-in and session management.
- Approved third-party authentication options.

### 4.2 User Profile

- Personal profile information.
- Birthday and automatically calculated age.
- Height and current weight.
- Target weight and other approved body measurements.
- User preferences and fitness goals.

### 4.3 Nutrition Tracking

- Daily calorie tracking.
- Macronutrient tracking.
- Food search and logging.
- Barcode-based food lookup.
- Food photo uploads.
- Meal and nutrition summaries.

### 4.4 Fitness and Workout Tracking

- Exercise guidance.
- Optional equipment information.
- Workout sessions.
- Sets, repetitions, and weights.
- Rest timer.
- Workout history and activity summaries.

### 4.5 Hydration Tracking

- Daily water goals.
- Quick water logging.
- Custom water quantities.
- Daily hydration progress.

### 4.6 Progress Tracking

- Weight history.
- Progress charts.
- Body measurements.
- Goal tracking.
- Milestones.
- Nutrition and activity trends.

### 4.7 Notifications

- Local and remote notifications.
- Notification center.
- Notification categories and preferences.
- Do Not Disturb settings.
- Frequency and timezone-aware scheduling.
- Sound and vibration preferences.

## 5. Product Principles

VitaQera follows these principles:

1. Simplicity — Keep interactions understandable and efficient.
2. Consistency — Maintain consistent behavior and visual design.
3. Privacy — Protect personal, fitness, and nutrition information.
4. Reliability — Provide predictable and dependable functionality.
5. Accessibility — Support readable layouts and accessible interactions.
6. Motivation — Encourage users without guilt, shame, or unrealistic expectations.
7. Maintainability — Prefer clear architecture and manageable complexity.

## 6. Visual Identity

The approved visual direction:

- Light ocean-blue color identity.
- Clean, modern, premium appearance.
- Sora typography for headings.
- Manrope typography for body text.
- `theme.ts` as the single source of truth for design tokens.
- Consistent spacing, typography, colors, and component behavior.

The UI/UX Designer coordinates visual design decisions and reviews design inspiration before implementation.

## 7. Technical Architecture

VitaQera uses a pnpm monorepo.

Known technologies include:

### Mobile Application

- Expo
- React Native
- React
- TypeScript
- Expo Router
- Zustand
- React Native StyleSheet
- EAS Build

### Backend API

- Hono
- Cloudflare Workers
- Better Auth
- TypeScript

### Database

- Neon PostgreSQL
- Drizzle ORM

### Transactional Email

- Brevo API

All installed versions and implementation details must be verified against the actual repository.

## 8. Development Philosophy

VitaQera follows a phased development process.

- Inspect before changing.
- Plan before implementing.
- Review architecture and security.
- Implement in manageable steps.
- Validate with appropriate tests.
- Document approved decisions and progress.

The user manually implements application code using provided guidance and code examples unless a specific modification is explicitly authorized.

## 9. Initial Release Scope

The initial product focuses on personal fitness and nutrition.

Social features and community functionality are deferred until separately approved.

Feature priorities and release milestones are maintained in `docs/development/roadmap.md`.

## 10. Security and Privacy

Fitness, nutrition, account, and profile information must be treated as sensitive user data.

The project must consider:

- Authentication and authorization.
- User-level data isolation.
- Secure API communication.
- Secrets management.
- Database security and Row-Level Security.
- Data retention and deletion.
- Secure file uploads.
- External provider data sharing.

See `docs/security/security-guidelines.md` for detailed guidance.

## 11. Project Documentation

Shared project knowledge is maintained under `docs/`.

Documentation should reflect verified implementation details and approved decisions.

Do not present planned features as completed functionality.

When a decision is superseded, preserve its history and document the replacement.

## 12. Current Project Status

Implementation status must be verified against the actual repository.

This document describes the product direction and known technical context. It does not certify that every listed feature or integration is implemented.

The Project Architect coordinates project-wide planning, documentation, and development checkpoints.
