---
name: vitaqera-project-maintenance
description: Safely inspect, audit, maintain, and improve the VitaQera project. Use for dependency and framework maintenance, deprecated APIs, compatibility checks, code quality, architecture reviews, configuration audits, and maintenance planning.
---

# VitaQera Project Maintenance

## Purpose

Provide a consistent, evidence-based process for inspecting and maintaining the entire VitaQera project without compromising existing work, security, stability, or architecture.

## Scope

This Skill covers:

- Project-wide codebase inspection and analysis.
- Dependency updates and maintenance.
- Deprecated, outdated, vulnerable, or incompatible dependencies.
- Deprecated APIs and outdated framework configurations.
- Unused dependencies, files, and code.
- TypeScript, linting, formatting, and build issues.
- Performance and code-quality concerns.
- Architecture and maintainability reviews.
- Configuration and tooling audits.
- Maintenance planning and verification.

## 1. Mandatory Project Context

Before making recommendations:

1. Read the root `AGENTS.md`.
2. Review relevant documentation in `docs/`.
3. Inspect the current project structure.
4. Identify the actual installed versions and configurations.
5. Review existing architecture decisions and implementation checkpoints.
6. Inspect the relevant application or package before making conclusions.

Never assume previous project information is still current.

## 2. Inspection and Analysis

Inspect the entire project when the task requires a project-wide audit.

Identify potential issues involving:

- Outdated, deprecated, vulnerable, or incompatible dependencies.
- Unused or duplicate packages.
- Deprecated framework APIs.
- Inconsistent package versions.
- Incorrect or outdated configurations.
- TypeScript and linting problems.
- Performance bottlenecks.
- Security weaknesses.
- Unnecessary complexity.
- Maintainability and architectural problems.

Use official documentation and reliable sources to verify version-sensitive findings.

Do not classify a dependency as problematic simply because a newer version exists.

## 3. Evidence-Based Findings

Every significant finding must include:

- **Finding:** What was discovered.
- **Location:** Relevant file, package, dependency, or configuration.
- **Evidence:** How the issue was verified.
- **Impact:** Why it matters.
- **Priority:** Critical, High, Medium, or Low.
- **Recommendation:** Proposed solution.
- **Risk:** Potential consequences of the change.

Clearly distinguish verified problems from suggestions and potential improvements.

## 4. Approval Before Changes

VitaQera follows a global approval-required permission model.

You may inspect, analyze, research, and prepare recommendations without modification approval.

You MUST obtain explicit user approval before:

- Installing, removing, or updating dependencies.
- Changing application code or configuration.
- Changing architecture or project structure.
- Modifying environment variables or authentication behavior.
- Changing database schemas or migrations.
- Deleting, renaming, or moving files.
- Changing security controls.
- Performing Git operations.
- Deploying or modifying production resources.

Never interpret a maintenance request as automatic permission to modify the project.

Present the proposed changes and wait for approval.

## 5. Safe Maintenance Workflow

Follow this sequence:

1. Understand the maintenance request.
2. Inspect the relevant project areas.
3. Verify findings against official documentation where appropriate.
4. Identify dependencies and affected components.
5. Evaluate compatibility and breaking changes.
6. Prepare a prioritized maintenance report.
7. Present the proposed changes.
8. Obtain explicit approval.
9. Perform only the approved changes.
10. Run relevant verification checks.
11. Report the results and remaining concerns.

Do not silently
