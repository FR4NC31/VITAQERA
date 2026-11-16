# VitaQera — Technology Stack

## 1. Purpose

This document records the technologies, frameworks, libraries, and infrastructure used by VitaQera.

It serves as the shared technical reference for all project agents and contributors.

The actual repository configuration and dependency manifests are the source of truth. Agents must verify the current implementation before making technical recommendations.

## 2. Mobile Application

| Technology                      | Purpose                           |
| ------------------------------- | --------------------------------- |
| Expo                            | Mobile application framework      |
| React Native                    | Cross-platform mobile development |
| React                           | UI component architecture         |
| TypeScript                      | Static typing                     |
| Expo Router                     | File-based navigation             |
| Zustand                         | Client-side state management      |
| React Native StyleSheet         | Component styling                 |
| Expo Application Services (EAS) | Build and deployment workflows    |

**Platform priority:** Android first, with iOS considered for future support.

## 3. Backend API

| Technology         | Purpose                               |
| ------------------ | ------------------------------------- |
| Cloudflare Workers | Backend runtime and hosting           |
| Hono               | API framework                         |
| TypeScript         | Backend development                   |
| Better Auth        | Authentication and session management |
| Brevo              | Transactional email delivery          |

## 4. Database

| Technology      | Purpose                                |
| --------------- | -------------------------------------- |
| Neon PostgreSQL | Managed relational database            |
| Drizzle ORM     | Database queries and schema management |
| Drizzle Kit     | Database migrations and tooling        |

Database security must include appropriate access controls, user-data isolation, and Row-Level Security (RLS) where applicable.

## 5. Development Tools

| Tool       | Purpose                                       |
| ---------- | --------------------------------------------- |
| Node.js    | JavaScript runtime                            |
| pnpm       | Package management and monorepo workspace     |
| Git        | Version control                               |
| OpenCode   | Project-specific AI agent workflow            |
| Wrangler   | Cloudflare Workers development and deployment |
| TypeScript | Type checking                                 |
| ESLint     | Code quality and linting                      |
| Prettier   | Code formatting                               |

## 6. Repository Architecture

VitaQera uses a pnpm monorepo.

The repository contains:

- `apps/mobile` — Expo mobile application.
- `apps/api` — Backend API.
- `packages` — Shared packages and reusable code.
- `docs` — Project documentation.
- `infrastructure` — Infrastructure configuration.
- `.opencode` — Project-specific agents and Skills.

Agents must inspect the actual repository before assuming these directories or their contents remain unchanged.

## 7. Authentication and Email

Current authentication direction:

- Email and password authentication.
- Email verification using OTP codes.
- Better Auth for authentication and session management.
- Brevo for transactional email.
- Google sign-in planned for Android.

Authentication behavior and provider configuration must follow approved project decisions.

## 8. Infrastructure and Deployment

Current infrastructure direction:

- Cloudflare Workers for API hosting.
- Neon for managed PostgreSQL.
- Wrangler for local development and deployment.
- EAS for mobile builds.

Production deployment and infrastructure changes require explicit user approval.

## 9. Dependency Maintenance

All dependencies must be maintained through a controlled review process.

Agents should:

1. Inspect package manifests and lockfiles.
2. Identify outdated, deprecated, vulnerable, unused, or incompatible dependencies.
3. Check official documentation and release notes.
4. Evaluate compatibility with the existing stack.
5. Report recommended updates and potential breaking changes.
6. Obtain approval before modifying dependencies.
7. Run relevant validation after approved changes.

A newer version does not automatically mean an upgrade is necessary.

## 10. Accuracy and Updates

- This document describes the intended and previously established technology stack.
- Actual installed versions must be verified from the repository.
- Do not invent package versions or claim that planned integrations are implemented.
- Update this document when an approved technology decision changes.
- Record significant architectural technology decisions in Architecture Decision Records (ADRs).
