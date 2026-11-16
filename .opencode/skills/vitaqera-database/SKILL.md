---
name: vitaqera-database
description: Design, review, and maintain VitaQera's PostgreSQL database architecture, Neon configuration, Drizzle ORM schemas, migrations, row-level security, data integrity, and database performance.
---

# VitaQera Database Engineering Skill

## 1. Purpose

Provide specialized database engineering guidance for VitaQera.

Prioritize data integrity, security, maintainability, performance, and reliable database operations.

## 2. Technology Context

Known database technologies include:

- Neon PostgreSQL.
- Drizzle ORM.
- Drizzle Kit for schema and migration workflows.
- Cloudflare Workers using the Neon serverless driver.

These are known project technologies. Always inspect the repository and verify installed versions before recommending implementation changes.

## 3. Database Architecture

Responsibilities include:

- Relational database design.
- Table and column definitions.
- Primary and foreign keys.
- Unique constraints.
- Check constraints.
- Index selection.
- Relationships and cardinality.
- Normalization and appropriate denormalization.
- Transaction boundaries.
- Query performance.
- Data lifecycle and retention.

Prefer explicit constraints and predictable data ownership.

Avoid unnecessary complexity and duplicated sources of truth.

## 4. Drizzle ORM and Migrations

- Follow the project's established Drizzle conventions.
- Keep schema definitions organized and maintainable.
- Review generated SQL before applying migrations.
- Check migration ordering and dependencies.
- Identify destructive or irreversible changes.
- Consider existing production data before proposing schema changes.
- Never assume a migration has been applied just because a migration file exists.
- Do not edit migration history or apply migrations without explicit approval.

## 5. Row-Level Security (RLS)

RLS is a core security responsibility.

For tables containing user-owned data:

- Define appropriate SELECT policies.
- Define appropriate INSERT policies.
- Define appropriate UPDATE policies.
- Define appropriate DELETE policies.
- Ensure users cannot access another user's records.
- Validate ownership using trusted identity information.
- Never trust a user ID supplied by the client without server-side verification.
- Review database roles and determine whether they can bypass RLS.
- Distinguish application roles from administrative or migration roles.
- Verify how connection pooling and session context affect policy enforcement.

Test policies under realistic application access patterns.

Do not claim a table is protected merely because RLS is enabled. Verify the actual policies and execution role.

## 6. VitaQera Data Domains

Consider the database requirements of:

### User and Authentication

- User profiles.
- Better Auth tables.
- Sessions and accounts.
- Verification records.
- User-owned data relationships.

### Fitness

- Workout plans.
- Workout sessions.
- Exercises.
- Sets, repetitions, and weights.
- Rest periods.
- Activity history.

### Nutrition

- Food records.
- Meals.
- Ingredients.
- Calories and macronutrients.
- Food recognition results.
- Nutrition estimates and their sources.

### Hydration

- Water intake records.
- Daily hydration summaries.

### Progress

- Weight history.
- Body measurements.
- Goals.
- Milestones.
- Historical progress records.

### Notifications

- Notification preferences.
- Notification records.
- Expo Push Notification device tokens.

For remote push notifications, support multiple devices per user and appropriate token lifecycle management.

Token records should support ownership, platform, device identification, active status, timestamps, and invalidation when a provider reports an unusable token.

Never store Expo server credentials in user token records.

## 7. Data Integrity and Privacy

- Enforce user ownership and referential integrity.
- Use appropriate numeric precision for measurements and nutrition values.
- Store timestamps consistently and handle user time zones deliberately.
- Define deletion and retention behavior.
- Avoid storing unnecessary personal information.
- Protect sensitive records through access policies.
- Consider backup and restoration requirements.

Known operational targets include:

- Recovery Point Objective (RPO): 24 hours.
- Backup retention target: 90 days.
- Account deletion window: 30 days.

Verify actual provider capabilities and configured backup policies before claiming these targets are achieved.

## 8. Performance and Reliability

Review:

- Query plans and expensive queries.
- Index usefulness and write overhead.
- Connection management.
- Neon serverless driver behavior.
- Transaction handling.
- Connection pooling.
- Pagination.
- Data growth.
- Migration safety.

Avoid premature optimization. Support performance recommendations with evidence where possible.

## 9. Testing Requirements

Recommend appropriate tests for:

- Schema constraints.
- Foreign-key relationships.
- Migration behavior.
- CRUD operations.
- Transactions.
- RLS isolation.
- Cross-user access prevention.
- Data deletion.
- Query behavior.
- Backup restoration.

Use a dedicated test environment and test database.

Never run destructive tests against production data.

## 10. Specialist Coordination

Coordinate with:

- Backend Engineer: database access, queries, transactions, and API integration.
- Security Engineer: RLS, privileged roles, access control, and database security.
- QA Engineer: migration, integrity, isolation, and regression testing.
- Project Architect: architecture decisions and cross-layer data ownership.

The Database Skill owns database engineering recommendations, not independent authorization to change other project areas.

## 11. Approval Rules

- Inspect the existing schema and shared database documentation first.
- Verify actual migrations and database state before making claims.
- Explain migration impact and potential data loss.
- Present proposed schema and policy changes before implementation.
- Obtain explicit user approval before modifying schemas, migrations, database configuration, data, or production resources.
- Never expose database credentials or secrets.
- Do not assume a proposed table or feature already exists.

## 12. Expected Deliverables

Depending on the task, provide:

- ERD and relationship descriptions.
- Schema proposals.
- Drizzle schema recommendations.
- Migration plans.
- SQL and RLS policy reviews.
- Index and query recommendations.
- Data integrity assessments.
- Security findings.
- Test plans.
- Backup and recovery recommendations.
