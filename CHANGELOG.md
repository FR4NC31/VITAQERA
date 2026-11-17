# VitaQera — Changelog

All notable changes to VitaQera are documented in this file.

This changelog follows the project's versioning policy in `docs/development/versioning-and-releases.md`.

Only verified and approved changes should be recorded.

## Unreleased

Changes that have been implemented and verified but have not yet been assigned to a published release.

### Added

- No verified entries recorded.

### Changed

- No verified entries recorded.

### Fixed

- No verified entries recorded.

### Security

- No verified entries recorded.

### Removed

- No verified entries recorded.

---

## [0.2.0] - 2026-11-17

Development milestone: backend authentication.

### Added

- Monorepo foundation with mobile app, API, shared packages, documentation, and project tooling (CP-001).
- Hono API on Cloudflare Workers with a health endpoint and Neon PostgreSQL access through Drizzle (CP-001).
- Email/password authentication with Better Auth, including session management (CP-002).
- Email OTP verification delivered through Brevo (CP-002).
- Database-backed rate limiting keyed on the Cloudflare client IP, shared across Workers isolates (CP-002).
- Automated tests for the OTP email service and authentication configuration (CP-002).

### Changed

- OTP lifetime now comes from one shared constant used by both the plugin and the email (CP-002).
- OTP email subjects and sender use consistent VitaQera branding and user-facing wording (CP-002).
- OTP request payload typing is shared between the plugin callback and the email service (CP-002).
- Generated type declaration files are excluded from formatting checks (CP-002).
- Repository line endings are enforced as LF through `.gitattributes`, so formatting checks pass on Windows checkouts (CP-002).

### Fixed

- `advanced.ipAddress` configuration typo that made rate-limit keys fall back to a single shared bucket (CP-002).
- Missing unique constraint on `rate_limit.key`, which allowed duplicated counters (CP-002).

### Security

- OTP codes are stored hashed with a 5-minute expiry and a 3-attempt limit (CP-002).
- Session cookies are issued with `HttpOnly` and `SameSite=Lax` (CP-002).

### Removed

- Duplicate authentication configuration file superseded by the single Better Auth configuration (CP-002).

Known limitations: Better Auth 1.7.17 does not hash session tokens, Brevo sender domain authentication is pending, and `BREVO_SENDER_EMAIL` in `wrangler.jsonc` is still a placeholder.

---

---

## Release History

Releases are listed above in reverse chronological order.

Future releases should use the following structure:

```markdown
## [VERSION] - YYYY-MM-DD

### Added

- New features.

### Changed

- Improvements or behavior changes.

### Fixed

- Bug fixes.

### Security

- Security-related changes.

### Removed

- Removed functionality.

### Breaking Changes

- Changes requiring compatibility adjustments.
```

## Changelog Rules

1. Record only changes supported by project evidence.
2. Never invent release versions or dates.
3. Never list planned functionality as completed.
4. Move verified changes from `Unreleased` into the appropriate release when a release is approved.
5. Preserve previously published release history.
6. Reference related issue IDs or implementation checkpoints when available.
7. Document breaking changes clearly.
8. Keep entries concise and understandable.
9. Do not include credentials, secrets, or personal information.
10. Follow the evidence-based versioning requirements.
