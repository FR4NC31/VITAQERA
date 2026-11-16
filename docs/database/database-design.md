# VitaQera — Database Design

## 1. Purpose

This document defines the database design principles and records the current and planned data domains of VitaQera.

It serves as the shared reference for database architecture, schema development, migrations, data integrity, and access control.

The actual Drizzle schema and PostgreSQL database are the sources of truth for implemented structures.

## 2. Database Technology

Selected technologies:

- Neon PostgreSQL — managed relational database.
- Drizzle ORM — schema definitions and database access.
- Drizzle Kit — schema migrations and database tooling.

Agents must verify the installed versions and current configuration before making recommendations.

## 3. Database Design Principles

- Use relational modeling where appropriate.
- Define clear relationships between entities.
- Enforce data integrity through database constraints.
- Use appropriate indexes.
- Avoid unnecessary duplication.
- Keep migrations controlled and reviewable.
- Protect user-specific information.
- Apply least-privilege database access.
- Use transactions for operations that must succeed or fail together.

## 4. Data Domains

The following are planned or relevant product data domains. They are not confirmation that all corresponding tables have been implemented.

### 4.1 Authentication

Managed through Better Auth and its database adapter.

Previously established authentication tables include:

- `user`
- `session`
- `account`
- `verification`

Agents must inspect the current Drizzle schema and migrations to verify their definitions and relationships.

Do not independently recreate or modify Better Auth-managed tables without evaluating framework requirements.

### 4.2 User Profile

Potential information:

- User profile details.
- Birthday.
- Height.
- Current weight.
- Target weight.
- Fitness goals.
- User preferences.

### 4.3 Nutrition

Potential information:

- Food records.
- Food serving information.
- Calories.
- Macronutrients.
- Daily nutrition goals.
- Food logs.
- Barcode and food-provider references.

### 4.4 Fitness and Workouts

Potential information:

- Exercise definitions.
- Workout sessions.
- Workout exercises.
- Sets and repetitions.
- Weight used during exercises.
- Rest periods.
- Workout history.

### 4.5 Hydration

Potential information:

- Water intake records.
- Daily hydration goals.
- Intake timestamps.
- Hydration history.

### 4.6 Progress Tracking

Potential information:

- Weight history.
- Body measurements.
- Progress milestones.
- Historical fitness and nutrition summaries.

### 4.7 Notifications

Potential information:

- Notification preferences.
- Notification categories.
- Scheduling preferences.
- Notification history.
- Quiet hours.

### 4.8 Push Notification Devices and Tokens

VitaQera is expected to use Expo Push Notifications for remote notifications.

The database design should support a dedicated `push_notification_tokens` table.

Potential fields:

| Field           | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| id              | Unique token record identifier                        |
| user_id         | Associated user                                       |
| expo_push_token | Expo push token                                       |
| device_id       | Application-managed device identifier, when available |
| platform        | Android or iOS                                        |
| is_active       | Whether the token is currently active                 |
| created_at      | Token registration timestamp                          |
| updated_at      | Last token update timestamp                           |
| last_used_at    | Last successful use timestamp                         |

Requirements:

- Allow multiple devices per user.
- Associate every token with its authenticated owner.
- Prevent duplicate active token registrations where appropriate.
- Update tokens when the device's Expo push token changes.
- Deactivate tokens when they become invalid.
- Process Expo push receipts and remove or deactivate tokens reported as `DeviceNotRegistered`.
- Protect token records using appropriate database access controls and RLS.
- Never trust a client-provided user ID when registering or modifying tokens.
- Do not store Expo access credentials or other server secrets in this table.
- Validate the actual Expo SDK behavior and token format before implementation.

This is a planned data structure, not confirmation that the table has been implemented.

## 5. Relationships and Data Ownership

Every user-specific record must have a clearly defined ownership relationship.

Requirements:

- Associate personal records with the authenticated user.
- Enforce ownership on the backend.
- Prevent users from reading or modifying another user's records.
- Define appropriate foreign keys and deletion behavior.
- Avoid trusting client-provided user IDs.
- Review cascading operations carefully.

The actual entity relationships must be documented after reviewing the implemented schema.

## 6. Row-Level Security (RLS)

RLS is an important database security boundary for user-owned data.

Requirements:

- Evaluate RLS for every user-owned table.
- Define SELECT policies.
- Define INSERT policies.
- Define UPDATE policies.
- Define DELETE policies.
- Ensure the authenticated identity is securely established.
- Do not trust arbitrary client-provided identity values.
- Review database roles that bypass RLS.
- Evaluate privileged application and migration roles separately.
- Test policies using realistic application access patterns.

RLS must complement, not replace, backend authorization.

## 7. Constraints and Indexes

Use appropriate database constraints and indexes.

Consider:

- Primary keys.
- Foreign keys.
- Unique constraints.
- NOT NULL constraints.
- CHECK constraints.
- Indexes for frequently queried columns.
- Composite indexes for common query patterns.
- Indexes supporting ownership and access-control queries.

Do not add indexes without considering actual query patterns and write overhead.

## 8. Migrations

All approved schema changes must use controlled migrations.

Rules:

1. Inspect the existing schema.
2. Explain the proposed change.
3. Identify affected tables and relationships.
4. Evaluate data migration and compatibility risks.
5. Obtain explicit user approval.
6. Generate and review the migration.
7. Apply only to the approved environment.
8. Validate the resulting schema and application behavior.

Never make unapproved production schema changes.

## 9. Data Integrity and Transactions

- Validate data before persistence.
- Use database constraints as a second layer of protection.
- Use transactions for related operations.
- Handle duplicate requests appropriately.
- Avoid partial writes where consistency is required.
- Define appropriate timestamp and timezone handling.
- Use consistent measurement units and conversions.

## 10. Privacy and Retention

- Store only necessary personal information.
- Restrict access to sensitive records.
- Protect database credentials.
- Avoid logging personal data unnecessarily.
- Define retention and deletion behavior.
- Protect backups and recovery procedures.

The intended backup requirements are an RPO of 24 hours and a retention target of 90 days, subject to provider and service-plan verification.

## 11. Database Testing

Required testing areas include:

- Schema and migration validation.
- Foreign-key integrity.
- Constraint validation.
- Query correctness.
- Transaction behavior.
- User ownership enforcement.
- RLS policies for all CRUD operations.
- Cross-user access prevention.
- Privileged role and BYPASSRLS behavior.
- Backup and recovery procedures.

## 12. Documentation Maintenance

When database structures are implemented or changed:

- Update this document.
- Record significant design decisions in ADRs.
- Keep schema documentation synchronized with Drizzle definitions.
- Document important relationships and indexes.
- Record migration and validation evidence.
- Identify planned structures separately from implemented structures.

Never invent table names, columns, relationships, or migration status.
