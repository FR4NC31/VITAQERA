# VitaQera — Architecture Decision Records

## 1. Purpose

Architecture Decision Records (ADRs) document important technical and architectural decisions made throughout VitaQera development.

They preserve the reasoning behind decisions and help prevent conflicting recommendations or unnecessary architectural changes.

## 2. What Requires an ADR?

Create an ADR when a decision significantly affects:

- Application architecture.
- Technology or framework selection.
- Authentication and authorization.
- Database design and security.
- API design and communication.
- External service integrations.
- Infrastructure and deployment.
- Data privacy and security.
- Scalability and long-term maintainability.

Minor implementation details do not require an ADR.

## 3. ADR Naming Convention

Use sequential numbering and descriptive names.

Format:

`NNNN-short-decision-name.md`

Examples:

- `0001-use-expo-for-mobile.md`
- `0002-use-hono-for-api.md`
- `0003-use-better-auth.md`
- `0004-use-neon-postgresql.md`

## 4. ADR Status

Use one of these statuses:

- **Proposed** — Awaiting approval.
- **Accepted** — Approved and currently applicable.
- **Rejected** — Considered but not selected.
- **Superseded** — Replaced by a newer decision.
- **Deprecated** — No longer applicable.

Only approved decisions should be marked Accepted.

## 5. ADR Template

Use this template for new decisions:

```markdown
# ADR-NNNN: Decision Title

## Status

Proposed

## Date

YYYY-MM-DD

## Context

What problem or requirement led to this decision?

## Decision

What was decided?

## Alternatives Considered

What other options were evaluated?

## Rationale

Why was this option selected?

## Consequences

What are the benefits, trade-offs, risks, and limitations?

## Approval

Who approved the decision, and when?
```

## 6. Decision Rules

- The Project Architect coordinates ADR creation.
- Specialists may propose decisions within their expertise.
- The user has final approval authority.
- Agents must check existing ADRs before recommending architectural changes.
- Do not silently replace an accepted decision.
- When a decision changes, create a new ADR referencing the superseded record.
- Preserve historical ADRs instead of deleting them.

## 7. ADR Index

List all ADRs here as they are created.

No formal ADRs have been recorded in this directory yet.

Existing project decisions may be documented as accepted ADRs after their original approval and supporting context have been verified.
