# VitaQera — Project Instructions

## 1. Project Identity

VitaQera is an Android-first personal fitness and nutrition application.

The project is a pnpm monorepo containing a mobile application, backend API, shared packages, documentation, and infrastructure.

Primary goals:

- Deliver a reliable, secure, maintainable fitness and nutrition application.
- Prioritize Android while keeping future platform expansion possible.
- Use a simple, phased implementation process.
- Keep architecture understandable and avoid unnecessary complexity.

## 2. Global Development Rules

- Inspect the existing implementation before recommending changes.
- Follow the established project architecture and conventions.
- Do not assume that a feature, dependency, configuration, or API exists without checking.
- Prefer official documentation for version-sensitive technologies.
- Verify compatibility before recommending packages or APIs.
- Avoid unnecessary abstractions, dependencies, and premature optimization.
- Never silently replace existing implementations or architectural decisions.
- Explain important trade-offs before recommending significant changes.
- Keep responses concise, practical, and technically accurate.

## 3. User Approval and Modification Policy

The user manually implements VitaQera application code.

Default behavior:

- Inspect, analyze, research, explain, review, and recommend.
- Provide complete code examples for the user to copy or type.
- Do not directly modify application source code unless explicitly authorized.
- Never install, remove, or upgrade dependencies without approval.
- Never modify environment variables, secrets, authentication behavior, database schemas, or migrations without approval.
- Never change architecture, external services, deployment settings, or production resources without approval.
- Never delete, rename, move, or overwrite existing files without approval.
- Never execute destructive commands without approval.

Explicit approval is required before every project modification.

An approval for one change does not authorize unrelated changes.

Before an approved modification:

1. Explain what will change.
2. Identify the affected files and systems.
3. Explain potential risks.
4. Wait for approval if it has not already been given.

After an approved modification:

1. Review the changes.
2. Run appropriate verification.
3. Report exactly what changed.
4. Report verification results and unresolved issues.

Never overwrite uncommitted user work.

### Approval Scope

- Approval applies only to the specific changes described and approved.
- Approval for one file or task does not authorize unrelated modifications.
- If implementation reveals additional required changes, stop and request approval.
- Do not interpret general instructions such as "continue" or "proceed" as approval for unspecified modifications.
- Read-only inspection and non-destructive verification are permitted under the configured tool permissions.
- When approval is unclear, ask before proceeding.

## 4. Git Safety

- Never commit, push, merge, rebase, reset, or switch branches automatically.
- Never modify Git history without explicit approval.
- Inspect the current branch and working tree before proposing Git operations.
- Preserve all existing user changes.
- Do not assume that main, staging, or develop has a particular state.

## 5. Technology Stack

Verify actual installed versions and configurations before making recommendations.

Known project technologies include:

### Mobile

- Expo
- React Native
- React
- TypeScript
- Expo Router
- Zustand
- React Native StyleSheet
- EAS Build

### Backend

- Hono
- Cloudflare Workers
- Better Auth
- TypeScript

### Database

- Neon PostgreSQL
- Drizzle ORM

### Email

- Brevo transactional email API

### Package Management

- pnpm
- Corepack
- Node.js

Do not assume every planned technology or feature is already implemented.

## 6. Repository Structure

Inspect the actual repository before relying on this outline.

Known areas include:

- apps/mobile — mobile application
- apps/api — backend API
- packages — shared packages
- docs — project documentation
- infrastructure — infrastructure configuration
- .opencode — project-local OpenCode configuration

Respect existing folder boundaries and naming conventions.

Do not create new architectural layers merely because they are common in other projects.

## 7. Mobile Design Guidelines

The approved visual direction is:

- Android-first.
- Light ocean-blue visual identity.
- Clean, modern, premium appearance.
- Sora for headings.
- Manrope for body text.
- theme.ts as the single source of truth for design tokens.
- Consistent spacing, typography, colors, and component behavior.
- Accessible layouts and clear interaction states.

User-facing language should be positive, encouraging, and motivating.

Avoid guilt-based, shaming, or discouraging fitness and nutrition language.

Do not introduce another design-token source without approval.

## 8. Backend and API Guidelines

- Keep API behavior predictable and consistent.
- Validate untrusted input.
- Enforce authentication and authorization on protected operations.
- Apply appropriate rate limiting and abuse protection.
- Avoid exposing secrets or sensitive user information.
- Keep business logic organized and testable.
- Follow the existing Hono architecture.
- Do not introduce unnecessary controllers, services, or middleware layers without a clear reason.

## 9. Database and Privacy Guidelines

- Treat user fitness, nutrition, and account information as sensitive.
- Enforce user-level data isolation.
- Evaluate Row-Level Security where applicable.
- Never assume application-level authorization alone is sufficient.
- Review SELECT, INSERT, UPDATE, and DELETE policies.
- Examine database roles and trusted identity propagation.
- Consider migrations, indexes, constraints, backups, and recovery.
- Never execute destructive database operations without explicit approval.

## 10. Security Guidelines

Security must be considered throughout development.

Review:

- Authentication and session handling.
- Authorization and ownership checks.
- Input validation and output handling.
- API abuse and rate limiting.
- Secrets management.
- Database access and RLS.
- Mobile storage and network security.
- File uploads and external integrations.
- Dependency and supply-chain risks.
- Privacy and data retention.

Distinguish verified vulnerabilities from potential risks and recommendations.

Do not claim that an application is secure merely because tests pass.

### Secret Protection

- Never request real passwords, API keys, tokens, or database credentials in chat.
- Never expose secret values in terminal output, logs, reports, or generated documentation.
- Treat `.dev.vars`, `.env`, and other secret-bearing files as sensitive.
- Use redacted examples when discussing environment configuration.
- Do not transmit credentials or sensitive user data to unapproved external services.

## 11. Testing and Quality

- Verify behavior rather than relying on assumptions.
- Prefer focused tests before broader test suites.
- Use existing project scripts whenever possible.
- Inspect package.json before recommending commands.
- Run appropriate lint, typecheck, build, and test commands when authorized.
- Do not claim a test passed unless it was actually executed successfully.
- Report skipped tests, limitations, and failures honestly.

## 12. Documentation and Shared Knowledge

Before making recommendations:

- Check relevant project documentation.
- Review existing architecture decisions.
- Check implementation checkpoints and known issues.
- Respect previously approved decisions.

When new decisions are approved:

- Document the decision and its rationale.
- Preserve relevant historical decisions.
- Clearly identify superseded decisions.
- Avoid silently changing shared project knowledge.

## 13. Agent Coordination

The Project Architect is the primary coordinator of the VitaQera agent ecosystem.

Approved specialist agents:

1. vitaqera-architect
2. vitaqera-backend
3. vitaqera-database
4. vitaqera-mobile
5. vitaqera-uiux
6. vitaqera-qa
7. vitaqera-security
8. vitaqera-multispecialist

Coordination rules:

- Use one agent by default.
- Delegate only when specialist expertise materially helps.
- Avoid unnecessary parallel work.
- Give specialists clear, bounded assignments.
- Require evidence-based findings.
- Consolidate conflicting recommendations before presenting them.
- The Architect coordinates project-wide decisions and maintenance.

The Multi-Specialist agent has four distinct modes:

- AI Engineering
- Integration Engineering
- Fitness and Nutrition Domain
- DevOps

Activate only the relevant mode or modes for a task.

## 14. Agent and Skill Maintenance

Agents may inspect and analyze the project to identify:

- Outdated or deprecated dependencies.
- Vulnerable or incompatible packages.
- Unused dependencies.
- Deprecated APIs and configurations.
- Security and performance issues.
- Architectural and maintainability concerns.

Agents may design and propose project-specific agents and Skills.

However:

- Do not silently create, replace, or remove agents or Skills.
- Confirm the target runtime and platform before generating platform-specific configurations.
- Obtain approval before changing existing agent responsibilities, permissions, or architecture.
- The Project Architect coordinates agent and Skill maintenance.

## 15. Reporting Format

For technical tasks, prefer:

1. Objective
2. Findings
3. Recommended approach
4. Files affected
5. Risks or considerations
6. Verification
7. Next step

Be concise without omitting important technical details.

Never fabricate implementation status, test results, documentation, or tool execution.

## 16. Project Skills

Available project-specific Skills:

1. vitaqera-project-maintenance
2. vitaqera-backend
3. vitaqera-database
4. vitaqera-mobile
5. vitaqera-security
6. vitaqera-testing
7. vitaqera-uiux
8. vitaqera-ai
9. vitaqera-integrations
10. vitaqera-fitness-nutrition
11. vitaqera-devops

Rules:

- Load relevant Skills when their expertise applies.
- Do not load every Skill for every task.
- Combine Skills only when the task requires multiple disciplines.
- Follow the project's global approval and safety rules.
- Skills provide specialized guidance; they do not override AGENTS.md or approved architecture decisions.
