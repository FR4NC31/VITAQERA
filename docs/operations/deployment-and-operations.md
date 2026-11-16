# VitaQera — Deployment and Operations

## 1. Purpose

This document defines the operational standards and deployment procedures for VitaQera.

It covers development environments, infrastructure, deployment, secrets, monitoring, backups, recovery, and production operations.

Actual infrastructure configuration and provider settings must be verified before performing operational tasks.

## 2. Infrastructure Overview

Selected infrastructure:

| Service                         | Responsibility                                                         |
| ------------------------------- | ---------------------------------------------------------------------- |
| Cloudflare Workers              | Backend API hosting                                                    |
| Wrangler                        | Local development and Worker deployment                                |
| Neon PostgreSQL                 | Managed database                                                       |
| Brevo                           | Transactional email                                                    |
| Expo Application Services (EAS) | Mobile builds and distribution                                         |
| GitHub                          | Source control and CI/CD workflows, subject to repository verification |

These services represent the intended infrastructure. Their production readiness and configuration must be verified.

## 3. Environments

VitaQera should maintain clearly separated environments.

### Development

- Local mobile development.
- Local API development using Wrangler.
- Development database or isolated test database.
- Development-only credentials.
- Test email and external service configurations where available.

### Staging

- Production-like configuration.
- Separate database and credentials.
- Integration and acceptance testing.
- Release candidate validation.

### Production

- Approved production infrastructure.
- Production database and secrets.
- HTTPS communication.
- Monitoring and backup procedures.
- Restricted deployment permissions.

Never use production credentials or data for ordinary development testing.

## 4. Environment Variables and Secrets

- Keep local secrets in approved environment files.
- Keep production secrets in the hosting provider's secret management.
- Never commit `.dev.vars`, `.env`, or other secret-bearing files.
- Never expose secrets in logs or deployment output.
- Maintain separate credentials for each environment.
- Document variable names and purposes without documenting secret values.
- Rotate compromised credentials promptly.
- Obtain approval before changing production secrets.

## 5. Backend Development and Deployment

The backend uses Hono on Cloudflare Workers.

Expected workflow:

1. Inspect the current API implementation.
2. Validate TypeScript types.
3. Run linting and automated tests.
4. Review environment and binding configuration.
5. Review database migration requirements.
6. Validate the intended deployment environment.
7. Obtain explicit user approval.
8. Deploy only to the approved environment.
9. Verify health checks and critical API functionality.
10. Record deployment results.

Wrangler commands and deployment configuration must be verified against the installed version and project scripts.

## 6. Database Operations

Neon PostgreSQL is the selected managed database.

Operational requirements:

- Maintain separate database environments where applicable.
- Protect connection strings and credentials.
- Review migrations before applying them.
- Validate schema compatibility.
- Monitor database availability and performance.
- Review connection usage and limits.
- Protect backups.
- Test recovery procedures.
- Avoid destructive operations without explicit approval.

## 7. Mobile Builds and Distribution

Expo Application Services is the selected mobile build and distribution platform.

Expected workflow:

1. Validate the mobile application.
2. Run relevant tests and type checks.
3. Review app configuration and version.
4. Verify Android build settings.
5. Create an approved build.
6. Test the resulting application.
7. Obtain approval before external distribution or production release.

Google Play distribution remains subject to account access and release readiness.

## 8. CI/CD

CI/CD should automate appropriate validation steps.

Potential pipeline stages:

- Dependency installation.
- Formatting checks.
- Linting.
- Type checking.
- Unit tests.
- Integration tests.
- API tests.
- Mobile validation.
- Build verification.

Deployment stages must be protected by explicit approval.

Do not introduce or modify CI/CD workflows without user approval.

## 9. Monitoring and Logging

Operational monitoring should cover:

- API availability.
- Request failures.
- Error rates.
- Response latency.
- Worker execution failures.
- Database connectivity.
- External service failures.
- Authentication abuse indicators.
- Resource and usage limits.

Logging requirements:

- Use appropriate log levels.
- Avoid logging passwords, OTP codes, tokens, and secrets.
- Minimize exposure of personal information.
- Preserve enough diagnostic context for troubleshooting.
- Restrict access to operational logs.

## 10. Backups and Recovery

Intended database backup requirements:

- Recovery Point Objective (RPO): 24 hours.
- Backup retention target: 90 days.
- Recovery procedures must be documented and tested.
- Backup access must be restricted.
- Backup credentials must be protected.
- Recovery must be validated before declaring success.

Verify actual Neon plan capabilities, retention limits, and recovery options before treating these targets as guaranteed.

## 11. Incident and Rollback Procedures

When a deployment or operational incident occurs:

1. Identify the affected environment and service.
2. Assess the impact.
3. Preserve relevant logs and evidence.
4. Notify the user.
5. Recommend containment and recovery actions.
6. Obtain approval before making operational changes.
7. Execute the approved recovery or rollback.
8. Verify service functionality.
9. Document the incident and corrective actions.

Never claim a successful rollback or recovery without verification.

## 12. Cost and Resource Management

- Prefer cost-effective infrastructure.
- Monitor provider usage and billing limits.
- Review Worker execution and database consumption.
- Evaluate external API usage.
- Monitor storage and email delivery usage.
- Avoid unnecessary paid services.
- Obtain approval before introducing paid infrastructure or services.

## 13. Production Readiness

Before production deployment, verify:

- Authentication and authorization.
- Database access controls and RLS.
- Secrets management.
- HTTPS configuration.
- Rate limiting.
- Automated test results.
- Security review findings.
- Backup and recovery readiness.
- Monitoring and error handling.
- Release version and changelog.
- User approval.

## 14. Operational Change Control

- The Multi-Specialist Agent's DevOps mode coordinates infrastructure recommendations.
- The Project Architect coordinates cross-project changes.
- The Security Engineer reviews relevant security implications.
- The Database Engineer reviews database-related operational changes.
- The user retains final approval authority.
- Never deploy, change production infrastructure, modify secrets, or perform rollback operations without explicit approval.

## 15. Documentation Maintenance

Update this document when approved operational changes affect:

- Hosting providers.
- Environment configuration.
- Deployment procedures.
- CI/CD workflows.
- Monitoring.
- Backup and recovery.
- Production infrastructure.
- Operational security requirements.

Record significant architectural or infrastructure decisions through ADRs.
