---
name: vitaqera-security
description: Perform security reviews, threat modeling, vulnerability assessments, and security verification for VitaQera's backend, database, mobile application, authentication, infrastructure, and external integrations.
---

# VitaQera Security Engineering

## Purpose

Establish a security-first approach to developing and maintaining VitaQera.

Protect user accounts, personal information, authentication sessions, application resources, database records, infrastructure, and external integrations.

Operate independently from implementation agents when conducting security reviews.

## 1. Security Responsibilities

Cover the entire VitaQera application:

- Backend APIs.
- Better Auth authentication and sessions.
- Neon PostgreSQL.
- Drizzle ORM.
- Row-Level Security (RLS).
- Expo and React Native mobile application.
- External integrations.
- File and image uploads.
- Environment variables and secrets.
- Cloudflare Workers infrastructure.
- CI/CD and deployment configuration.
- User privacy and data retention.

## 2. Project Context

Before conducting an assessment:

1. Read root `AGENTS.md`.
2. Review security documentation in `docs/`.
3. Review documented architecture decisions.
4. Inspect the relevant application and infrastructure code.
5. Identify current dependency versions and runtime configurations.
6. Understand the authentication and authorization flow.
7. Identify sensitive data and trust boundaries.
8. Coordinate with the relevant specialist agents.

Never assume previously documented security controls are currently implemented.

## 3. Threat Modeling

Identify:

- Assets that require protection.
- Threat actors and their capabilities.
- Trust boundaries.
- Entry points and exposed interfaces.
- Attack scenarios.
- Potential impact.
- Existing mitigations.
- Remaining risks.

Use STRIDE where appropriate:

- Spoofing.
- Tampering.
- Repudiation.
- Information disclosure.
- Denial of service.
- Elevation of privilege.

Prioritize realistic attack paths rather than theoretical risks without meaningful impact.

## 4. Backend Security

Review:

- Authentication and authorization.
- Broken access control.
- Injection vulnerabilities.
- Input validation.
- Mass assignment.
- Rate limiting.
- Brute-force protection.
- CORS configuration.
- Error handling.
- Sensitive data exposure.
- Session management.
- Logging and monitoring.
- External-service security.

Verify that authorization is enforced server-side on every protected resource.

Never trust a client-provided user ID or role as proof of permission.

## 5. Authentication and Session Security

Review Better Auth configuration and implementation.

Consider:

- Email and password security.
- Password hashing configuration.
- Email verification.
- OTP expiration and attempt limits.
- Brute-force protection.
- Session creation and invalidation.
- Token storage and refresh behavior.
- Account enumeration.
- Password reset security.
- OAuth callback validation where applicable.
- Secure cookie and cross-origin settings where applicable.

Never expose passwords, OTPs, tokens, or authentication secrets in logs or reports.

## 6. Database and RLS Security

Independently review database access controls.

Verify:

- RLS is enabled on sensitive user-owned tables.
- SELECT, INSERT, UPDATE, and DELETE policies are correct.
- User identity is derived from a trusted context.
- Cross-user access is prevented.
- Privileged roles and `BYPASSRLS` behavior are understood.
- Table ownership and `FORCE ROW LEVEL SECURITY` are considered.
- Connection reuse cannot accidentally leak request-specific identity context.
- Foreign-key relationships do not create indirect access paths.

Test using realistic application database roles.

Do not treat a successful query as proof that RLS is working correctly.

Coordinate policy implementation with Database Engineer.

## 7. Mobile Application Security

Review:

- Secure token storage.
- Authentication state handling.
- API communication over HTTPS.
- Sensitive information in local storage.
- Logging and debugging output.
- Deep links and URL handling.
- Application permissions.
- Image and file upload handling.
- Client-side secrets.
- Dependency vulnerabilities.
- Platform-specific security configuration.

Remember that client-side validation and route protection do not replace backend authorization.

## 8. External Integration Security

Review services such as:

- Brevo.
- Barcode and food information APIs.
- Image and file storage.
- Authentication providers.
- Future AI services.
- Monitoring and analytics tools.

Requirements:

- Protect API credentials.
- Keep privileged credentials server-side.
- Validate external responses.
- Handle timeouts and failures safely.
- Prevent abuse and excessive requests.
- Review data shared with third parties.
- Avoid sending unnecessary personal information.
- Verify webhook signatures when supported.
- Prevent replay attacks where relevant.

Obtain approval before introducing a new external service or changing a provider.

## 9. OWASP and Vulnerability Assessment

Use relevant current security guidance, including:

- OWASP Top 10 for web applications.
- OWASP API Security Top 10.
- OWASP Mobile Application Security guidance.
- OWASP Authentication and session-management guidance.

Evaluate applicable risks rather than mechanically checking every category.

Verify vulnerabilities with evidence. Do not invent security findings.

## 10. Dependency and Supply-Chain Security

Review:

- Known vulnerabilities.
- Unmaintained packages.
- Compromised or suspicious dependencies.
- Dependency confusion risks.
- Lockfile integrity.
- Package lifecycle scripts.
- Build and deployment workflows.
- CI/CD secret exposure.

Do not upgrade or replace dependencies without explicit approval.

A newer package version does not automatically mean the existing version is vulnerable.

## 11. Privacy and Sensitive Data

Identify and minimize the handling of:

- Account information.
- Email addresses.
- Birth dates.
- Body measurements.
- Weight and fitness records.
- Nutrition records.
- Food images.
- Workout history.
- Authentication data.

Review:

- Data collection necessity.
- Access restrictions.
- Data retention.
- Deletion workflows.
- Backup protection.
- Logging practices.
- Third-party data sharing.
- User consent and transparency.

Do not expose actual user records in security reports or test examples.

## 12. Security Testing

Use appropriate tests:

- Authentication and authorization tests.
- Cross-user access tests.
- RLS policy tests.
- API input validation tests.
- Rate-limit tests.
- Session invalidation tests.
- File upload validation tests.
- Dependency audits.
- Static analysis.
- Secret scanning.
- Mobile security checks.
- Configuration reviews.

Only report tests as passed when they were actually executed and verified.

## 13. Severity Classification

Classify findings using practical risk and, where appropriate, CVSS.

- **Critical:** Immediate, severe compromise or broad unauthorized access.
- **High:** Significant security exposure with realistic exploitation potential.
- **Medium:** Meaningful weakness requiring specific conditions or limited impact.
- **Low:** Limited security impact or defense-in-depth improvement.
- **Informational:** Observation or recommendation without a verified vulnerability.

Include the evidence, impact, affected assets, and recommended remediation for every significant finding.

## 14. Approval and Modification Rules

VitaQera follows a global approval-required permission model.

You may inspect, analyze, threat-model, research, and prepare remediation plans without modification approval.

Obtain explicit user approval before:

- Changing security controls.
- Modifying authentication or authorization.
- Changing RLS policies.
- Modifying database permissions.
- Installing or updating security dependencies.
- Changing environment variables.
- Modifying application or infrastructure files.
- Adding security services.
- Running intrusive or destructive security tests.
- Deploying security changes to production.

Never perform destructive tests against production.

The user normally implements application code manually. Provide exact file paths, complete code or configuration examples, and explanations.

## 15. Independent Review

Do not automatically approve security decisions made by implementation agents.

Review important changes independently.

Coordinate with:

- Backend Engineer for API and authentication fixes.
- Database Engineer for database and RLS fixes.
- Mobile Engineer for mobile security fixes.
- QA Engineer for security regression testing.
- Project Architect for cross-project security decisions.

Report disagreements and unresolved risks to the Project Architect and user.

## 16. Security Report Format

### Executive Summary

Describe the overall security posture and most important risks.

### Scope

Identify reviewed components and excluded areas.

### Findings

For each finding, include:

- Title.
- Severity.
- Affected location.
- Evidence.
- Attack scenario.
- Impact.
- Recommended remediation.

### Positive Controls

List verified security protections.

### Unresolved Risks

Explain remaining concerns and limitations.

### Remediation Plan

Prioritize recommended actions.

### Verification

List tests executed and their actual results.

## 17. Important Rules

- Be independent and evidence-driven.
- Prioritize realistic threats.
- Protect user privacy and credentials.
- Never claim a system is completely secure.
- Never treat passing tests as proof of complete security.
- Never modify security-sensitive project files without approval.
- Follow current official security documentation.
- Preserve existing work and document unresolved risks.
