# VitaQera — Versioning and Release Management

## 1. Purpose

This document defines how VitaQera manages application versions, feature releases, bug fixes, release notes, and project milestones.

The goal is to maintain a consistent version history and make changes traceable.

## 2. Versioning Strategy

VitaQera follows Semantic Versioning:

`MAJOR.MINOR.PATCH`

| Segment | Meaning                                           | Example |
| ------- | ------------------------------------------------- | ------- |
| MAJOR   | Breaking changes or major release milestones      | 1.0.0   |
| MINOR   | New features and backward-compatible improvements | 0.2.0   |
| PATCH   | Bug fixes and backward-compatible corrections     | 0.2.1   |

### Development Versioning

While VitaQera remains in the `0.x.x` development stage:

- MINOR represents a significant development release or feature milestone.
- PATCH represents bug fixes and small backward-compatible improvements.
- MAJOR represents the transition to a new major release.

Examples:

| Version | Meaning                         |
| ------- | ------------------------------- |
| 0.1.0   | Initial development baseline    |
| 0.2.0   | New feature release             |
| 0.2.1   | Bug fix release                 |
| 0.2.2   | Additional bug fix              |
| 0.3.0   | Next feature milestone          |
| 1.0.0   | First stable production release |

These are examples, not preassigned release commitments.

## 3. Version Ownership

The Project Architect coordinates version management.

Responsibilities:

- Review completed features and fixes.
- Recommend release version increments.
- Coordinate release readiness.
- Ensure the changelog is updated.
- Verify affected package and application versions.
- Coordinate release documentation.

The user approves release decisions and production releases.

## 4. Change Classification

Every meaningful project change should be classified.

| Change Type     | Description                                              |
| --------------- | -------------------------------------------------------- |
| Feature         | New user-facing or system functionality                  |
| Improvement     | Enhancement to existing functionality                    |
| Fix             | Correction of a confirmed defect                         |
| Security        | Security-related correction or improvement               |
| Performance     | Performance optimization                                 |
| Refactor        | Internal restructuring without intended behavior changes |
| Documentation   | Documentation-only change                                |
| Infrastructure  | Hosting, CI/CD, configuration, or operational change     |
| Breaking Change | Change requiring compatibility adjustments               |

## 5. Release Version Rules

### MINOR Release

Increase MINOR when introducing a meaningful feature or development milestone.

Example:

`0.1.0` → `0.2.0`

### PATCH Release

Increase PATCH when correcting bugs or making small backward-compatible changes.

Example:

`0.2.0` → `0.2.1`

### MAJOR Release

Increase MAJOR when introducing a major stable release or significant breaking changes.

Example:

`0.9.0` → `1.0.0`

The Project Architect must explain the recommended version change before a release.

## 6. Release Workflow

1. Identify completed changes.
2. Review feature and bug-fix status.
3. Confirm acceptance criteria.
4. Run relevant automated tests.
5. Review security and compatibility implications.
6. Update `CHANGELOG.md`.
7. Recommend the next version.
8. Review application and package version requirements.
9. Obtain user approval.
10. Prepare the approved release.
11. Deploy or distribute only after separate approval.
12. Verify the release.
13. Record release information.

A version recommendation does not automatically authorize version changes, Git operations, or deployment.

## 7. Application and Package Versions

VitaQera is a monorepo, so versioning must account for multiple applications and packages.

Rules:

- Verify which package or application is affected.
- Update only relevant version fields.
- Keep application versions consistent with the intended release strategy.
- Do not automatically change every package version.
- Review Expo and Android version/build requirements before mobile releases.
- Document independent package releases when applicable.

The Project Architect should recommend a versioning strategy for shared packages when independent publishing becomes necessary.

## 8. Changelog Requirements

Every release must have an appropriate changelog entry.

The changelog should:

- Describe meaningful changes.
- Group changes by category.
- Identify breaking changes.
- Include important security corrections.
- Reference related issues or implementation checkpoints when available.
- Distinguish completed changes from planned work.

Never record an unimplemented feature as released.

## 9. Release Readiness

Before approving a release, verify:

- Required features are complete.
- Known critical and high-severity issues are addressed or explicitly accepted.
- Automated tests pass.
- Type checks and linting pass.
- Database migrations are reviewed.
- Security review findings are evaluated.
- Documentation is updated.
- Application version and build metadata are correct.
- Rollback or recovery considerations are documented.

## 10. Release Records

For each release, record:

- Version.
- Release date.
- Release type.
- Summary.
- Added features.
- Improvements.
- Bug fixes.
- Security changes.
- Breaking changes.
- Known limitations.
- Verification results.
- Related implementation checkpoints.

## 11. Approval and Change Control

- The Project Architect coordinates release planning.
- Specialists verify changes within their responsibilities.
- QA validates release readiness.
- Security reviews relevant security changes.
- The user approves version changes and releases.
- Production deployment requires explicit approval.
- No automatic commits, tags, merges, pushes, or deployments.

## 12. Maintenance

Review this policy when:

- VitaQera reaches stable production.
- Independent package publishing is introduced.
- Release workflows change.
- Distribution requirements change.
- Versioning conventions need revision.

## 13. Evidence-Based Versioning and Release Records

All versioning and release records must be evidence-based.

- Never guess the current project version.
- Verify version values from the actual package manifests and application configuration.
- Never assume a feature, bug fix, or improvement has been implemented.
- Never assign a release version based solely on a roadmap or planned milestone.
- Never create changelog entries for unverified changes.
- Verify completed work using implementation evidence, relevant tests, and acceptance criteria.
- Distinguish proposed releases from approved and published releases.
- Record actual release dates only after verifying the release.
- If information cannot be verified, mark it as `Unverified` or `Not yet recorded`.
- Ask the user when a decision requires information that cannot be established from project evidence.

**Evidence takes priority over assumptions, memory, roadmaps, and previous AI-generated suggestions.**

## 14. Git Branching Strategy

VitaQera uses a structured branching strategy to organize features, bug fixes, maintenance, and releases.

### 14.1 Permanent Branches

| Branch    | Responsibility                           |
| --------- | ---------------------------------------- |
| `main`    | Production-ready code                    |
| `staging` | Release candidate testing and validation |
| `develop` | Integration of approved development work |

These are the intended permanent branches. Their actual existence and current status must be verified in Git.

### 14.2 Temporary Branch Naming

Use the following prefixes:

| Prefix      | Purpose                                                 | Example                    |
| ----------- | ------------------------------------------------------- | -------------------------- |
| `feat/`     | New feature                                             | `feat/food-scanner`        |
| `fix/`      | General bug fix                                         | `fix/login-validation`     |
| `hotfix/`   | Urgent production correction                            | `hotfix/auth-token-expiry` |
| `refactor/` | Code restructuring                                      | `refactor/api-services`    |
| `docs/`     | Documentation changes                                   | `docs/api-reference`       |
| `test/`     | Test additions or corrections                           | `test/auth-integration`    |
| `chore/`    | Maintenance tasks                                       | `chore/update-tooling`     |
| `perf/`     | Performance improvements                                | `perf/dashboard-rendering` |
| `security/` | Security improvements                                   | `security/rate-limiting`   |
| `build/`    | Build system changes                                    | `build/android-config`     |
| `ci/`       | CI/CD changes                                           | `ci/test-workflow`         |
| `style/`    | Formatting and styling changes without behavior changes | `style/mobile-components`  |
| `revert/`   | Reverting a previous change                             | `revert/food-scanner`      |

### 14.3 Branch Naming Rules

- Use lowercase names.
- Separate words with hyphens.
- Use a descriptive name.
- Avoid spaces and special characters.
- Keep branch names reasonably short.
- Include an issue identifier when one exists and is useful.

Examples:

- `feat/VQ-101-food-scanner`
- `fix/VQ-102-otp-validation`
- `hotfix/VQ-103-session-security`

### 14.4 Branch Workflow

**Normal development:**

1. Start from the latest approved `develop` branch.
2. Create a temporary branch using the appropriate prefix.
3. Implement the approved scope.
4. Run relevant tests and checks.
5. Review the changes.
6. Merge into `develop` only after approval.

**Release preparation:**

1. Select an approved release candidate from `develop`.
2. Integrate it into `staging`.
3. Run regression, integration, and acceptance tests.
4. Resolve release-blocking issues.
5. Obtain release approval.
6. Merge the approved release into `main`.
7. Record the actual release version and date.
8. Synchronize `develop` with approved production changes when necessary.

**Production hotfix:**

1. Create a `hotfix/` branch from the current production `main`.
2. Make only the approved urgent correction.
3. Run focused tests and relevant regression checks.
4. Obtain approval.
5. Merge the verified hotfix into `main`.
6. Update the release version and changelog as appropriate.
7. Backport or merge the correction into `staging` and `develop` to prevent the defect from returning.

### 14.5 Branch Protection and Review

- Protect permanent branches where repository capabilities allow.
- Require appropriate review before merging.
- Run relevant automated checks before merging.
- Do not bypass required checks without explicit approval.
- Avoid unrelated changes in the same branch.
- Keep changes focused on the branch's stated purpose.

### 14.6 Git Operation Approval

The user retains control of Git operations.

Agents may inspect Git status, branch history, diffs, and repository structure when permitted.

However, agents must not automatically:

- Create or delete branches.
- Switch branches.
- Commit changes.
- Merge branches.
- Rebase or reset branches.
- Push or pull changes.
- Create tags.
- Rewrite Git history.

These operations require explicit user approval.

### 14.7 Evidence and Traceability

- Branch names do not prove that a feature is complete.
- A merged branch does not automatically mean a release has been published.
- Release versions must be verified against project records.
- Changelog entries must reflect actual changes.
- Preserve relevant issue, pull request, and commit references when available.

Never assume a branch exists or that a merge succeeded without checking Git.
