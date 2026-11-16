# VitaQera — Security Guidelines

## 1. Purpose

This document establishes security and privacy requirements for VitaQera.

All agents and contributors must follow these guidelines when designing, reviewing, testing, and maintaining the application.

Security must be considered throughout development, not only before production release.

## 2. Security Principles

- Least privilege.
- Defense in depth.
- Secure by default.
- Explicit authentication and authorization.
- Data minimization.
- Privacy by design.
- Secure communication.
- Auditable security decisions.

## 3. Authentication and Sessions

- Use the approved Better Auth configuration.
- Require email verification according to approved authentication flows.
- Protect registration, sign-in, and OTP endpoints against abuse.
- Enforce OTP expiration and attempt limits.
- Use secure password hashing provided by the authentication framework.
- Protect session tokens and cookies.
- Validate sessions on the server.
- Implement appropriate session expiration and revocation.
- Never expose authentication secrets to the mobile application.
- Never log passwords, OTP codes, or session tokens.

## 4. Authorization and Access Control

- Enforce authorization on the backend.
- Never rely exclusively on mobile UI restrictions.
- Verify resource ownership for every user-specific operation.
- Never trust a client-provided user ID as proof of identity.
- Apply least-privilege access to services and database roles.
- Protect administrative and privileged operations.
- Test unauthorized and cross-user access attempts.

## 5. API Security

- Validate all incoming request data.
- Apply appropriate authentication and authorization middleware.
- Configure CORS for approved origins.
- Use HTTPS in production.
- Apply rate limits to sensitive endpoints.
- Protect against brute-force attacks.
- Return safe and consistent error responses.
- Avoid exposing stack traces or internal infrastructure details.
- Apply appropriate request size and resource limits.
- Validate external service responses.

## 6. Database Security

- Protect database credentials.
- Use secure connection configuration.
- Apply appropriate PostgreSQL privileges.
- Implement Row-Level Security (RLS) where applicable.
- Review SELECT, INSERT, UPDATE, and DELETE policies.
- Ensure users cannot access another user's records.
- Review privileged roles and BYPASSRLS capabilities.
- Test RLS under realistic application database roles.
- Use migrations for approved schema changes.
- Protect backups and recovery credentials.

## 7. Mobile Application Security

- Never embed server-side secrets in the application.
- Store sensitive local credentials using appropriate secure storage.
- Avoid exposing tokens through logs or debugging tools.
- Validate API responses and handle failures safely.
- Protect sensitive screens and authenticated navigation.
- Avoid storing unnecessary personal information locally.
- Review deep links and external navigation.
- Evaluate permissions before requesting device access.

## 8. Sensitive Data and Privacy

VitaQera may process:

- Account and authentication information.
- Profile information.
- Birthday and age-related information.
- Height and weight records.
- Fitness goals and workout history.
- Nutrition and food records.
- Hydration history.
- User preferences.

Requirements:

- Collect only necessary information.
- Restrict access to authorized services.
- Protect data in transit and at rest.
- Avoid unnecessary exposure in logs and analytics.
- Establish appropriate retention and deletion procedures.
- Do not transmit personal data to unapproved external services.
- Obtain appropriate user consent for relevant integrations.

## 9. Secrets Management

- Store development secrets in approved local environment files.
- Store production secrets in appropriate hosting secret management.
- Never commit `.dev.vars`, `.env`, or other secret-bearing files.
- Never request real credentials in chat.
- Never print secrets in terminal output, reports, or documentation.
- Use redacted examples in shared documentation.
- Rotate compromised credentials promptly through an approved process.

## 10. External Integrations

Before approving an integration:

- Review the provider's security and privacy practices.
- Identify the data being shared.
- Review authentication and API key requirements.
- Evaluate data retention and deletion policies.
- Consider rate limits and abuse scenarios.
- Protect webhooks and validate their authenticity.
- Handle retries and duplicate requests safely.
- Obtain user approval before implementation.

## 11. Security Testing

Security validation should include:

- Authentication and session testing.
- Authorization and access-control testing.
- Cross-user data isolation testing.
- RLS policy testing.
- Input validation testing.
- Rate-limit and brute-force testing.
- API security testing.
- Mobile storage and network security testing.
- Dependency vulnerability reviews.
- External integration security testing.

Critical findings must be addressed before production release.

## 12. Dependency and Supply-Chain Security

- Review dependency vulnerabilities.
- Check package provenance and trusted sources where applicable.
- Evaluate transitive dependencies.
- Review deprecated and abandoned packages.
- Assess compatibility before upgrades.
- Do not automatically upgrade dependencies.
- Obtain approval before dependency changes.

## 13. Backup and Recovery

The intended operational requirements are:

- Recovery Point Objective (RPO): 24 hours.
- Backup retention target: 90 days.
- Support the approved data deletion and retention policy.
- Restrict backup access.
- Protect backup credentials.
- Verify backup integrity.
- Test recovery procedures periodically.

These requirements must be validated against the actual database provider and selected service plan.

## 14. Incident Handling

When a potential security incident is discovered:

1. Stop unsafe activity where appropriate.
2. Preserve relevant evidence without exposing secrets.
3. Assess the affected systems and data.
4. Notify the user of the findings and potential impact.
5. Recommend containment and remediation.
6. Obtain approval for project or production changes.
7. Verify remediation.
8. Document the incident and lessons learned.

Do not claim an incident is resolved without supporting evidence.

## 15. Approval and Change Control

- The Security Engineer may inspect and audit the project independently.
- Security findings must include evidence, severity, impact, and remediation recommendations.
- Project modifications require explicit user approval.
- Production security changes require explicit approval.
- Significant security architecture decisions must be documented through ADRs.
- Security requirements take precedence over convenience when resolving genuine security risks.
