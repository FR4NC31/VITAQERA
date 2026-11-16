---
name: vitaqera-backend
description: Build, review, debug, and maintain VitaQera's backend using Hono, Cloudflare Workers, Better Auth, TypeScript, and backend integrations. Use for API architecture, endpoints, services, middleware, validation, authentication, authorization, and backend security.
---

# VitaQera Backend Engineering

## Purpose

Establish consistent backend engineering practices for VitaQera, prioritizing security, reliability, maintainability, and compatibility with the existing project architecture.

## 1. Technology Context

The current intended backend stack includes:

- Hono for HTTP APIs.
- Cloudflare Workers for server-side execution.
- TypeScript for application code.
- Better Auth for authentication and sessions.
- Neon PostgreSQL for managed database access.
- Drizzle ORM for database operations.
- Brevo for transactional email delivery.

These are reference decisions, not assumptions about the current implementation. Inspect the project and its documentation before making recommendations.

## 2. Project Context

Before implementation or review:

1. Read root `AGENTS.md`.
2. Review relevant documentation in `docs/`.
3. Inspect the existing API structure and conventions.
4. Review current dependencies and versions.
5. Check existing architecture decisions.
6. Coordinate with Database Engineer when database design or migrations are involved.
7. Coordinate with Security Engineer when authentication, authorization, or security controls are involved.

Do not introduce a new framework or service without explaining its purpose and obtaining approval.

## 3. Backend Architecture

Prefer clear separation of responsibilities:

- **Routes:** Define HTTP endpoints and connect request handling to application logic.
- **Controllers/Handlers:** Handle HTTP-specific concerns, request parsing, and responses when separation is useful.
- **Services:** Contain reusable business logic.
- **Middleware:** Handle cross-cutting concerns such as authentication, authorization, rate limiting, and request logging.
- **Validators:** Validate incoming data and enforce input constraints.
- **Database layer:** Handle database access through the established ORM and schema.

Do not create unnecessary layers for simple endpoints. Follow the existing project conventions and justify architectural changes.

## 4. API Design

All API endpoints must:

- Use appropriate HTTP methods and status codes.
- Validate request parameters, query strings, and bodies.
- Return consistent response structures.
- Handle expected and unexpected errors safely.
- Avoid exposing internal implementation details.
- Avoid returning sensitive information.
- Document important request and response contracts.

Prefer predictable REST API conventions unless the project documents another approach.

## 5. Authentication and Authorization

Use the approved Better Auth architecture.

Requirements:

- Verify authentication on protected endpoints.
- Derive user identity from trusted server-side session information.
- Never trust a client-provided user ID as proof of ownership.
- Enforce authorization on every protected resource.
- Keep session handling secure.
- Protect authentication endpoints against brute-force attempts.
- Apply appropriate rate limits.
- Handle email verification and OTP expiration correctly.
- Never log passwords, OTP codes, session tokens, or secrets.

Coordinate authentication architecture changes with Security Engineer.

## 6. Input Validation and Error Handling

- Validate all untrusted input at API boundaries.
- Reject malformed or unexpected input.
- Use clear and consistent validation errors.
- Avoid leaking stack traces, database errors, secrets, or internal infrastructure details.
- Handle database failures and external-service failures explicitly.
- Avoid silently swallowing exceptions.
- Use appropriate logging without exposing sensitive data.

## 7. Database Integration

- Follow the established Drizzle and Neon implementation.
- Use parameterized database operations.
- Avoid unsafe raw
