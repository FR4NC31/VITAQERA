# VitaQera — Known Issues

## 1. Purpose

This document tracks confirmed bugs, known limitations, unresolved technical problems, and temporary workarounds in VitaQera.

It helps the team:

- Track issues consistently.
- Understand their impact.
- Prevent duplicate investigations.
- Record workarounds and resolutions.
- Maintain visibility into outstanding problems.

Only verified findings should be recorded as confirmed issues.

## 2. Issue Categories

| Category       | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| Bug            | Implemented functionality does not behave as expected           |
| Security       | A vulnerability or security weakness                            |
| Performance    | Slow response, excessive resource usage, or poor responsiveness |
| Compatibility  | Problems with supported devices, browsers, or environments      |
| Integration    | Failure involving an external service or API                    |
| Configuration  | Incorrect or incomplete project configuration                   |
| Limitation     | Known restriction that is not necessarily a defect              |
| Technical Debt | Existing implementation that should be improved                 |

## 3. Severity Levels

| Severity      | Meaning                                                      |
| ------------- | ------------------------------------------------------------ |
| Critical      | Major security issue, data loss, or complete service failure |
| High          | Important functionality is broken or significantly affected  |
| Medium        | Partial functionality is affected; a workaround may exist    |
| Low           | Minor defect with limited impact                             |
| Informational | Non-blocking limitation or improvement opportunity           |

Severity should reflect actual user and system impact, not implementation difficulty.

## 4. Issue Status

Use these statuses:

- **Open:** Confirmed and awaiting investigation or resolution.
- **Investigating:** Currently being analyzed.
- **Planned:** Resolution has been approved but not started.
- **In Progress:** An approved fix is being implemented.
- **Blocked:** Cannot proceed because of a dependency or unresolved decision.
- **Resolved:** A fix has been implemented and verified.
- **Closed:** Resolution is accepted, or the issue is closed with a documented reason.
- **Won't Fix:** Deliberately not being addressed, with justification.

Do not mark an issue resolved merely because a change was made. Verification is required.

## 5. Current Known Issues

No confirmed issues have been recorded in this document yet.

This does not mean the project has no bugs. Issues must be discovered through inspection, testing, or reported behavior before being documented here.

## 6. Issue Record Template

Use this template for every confirmed issue:

### [ISSUE-ID] — Short issue title

- **Category:**
- **Severity:**
- **Status:**
- **Affected area:**
- **Affected version:**
- **Reported date:**
- **Reported by:**
- **Assigned specialist:**

**Description**

Explain the problem and expected behavior.

**Steps to Reproduce**

1. Step one.
2. Step two.
3. Step three.

**Expected Result**

Describe the expected behavior.

**Actual Result**

Describe the observed behavior.

**Evidence**

Include relevant error messages, test results, logs, screenshots, or other evidence. Redact sensitive information.

**Impact**

Explain how users or system functionality are affected.

**Workaround**

Document any verified temporary workaround, or state that none is known.

**Root Cause**

Complete after investigation. Do not guess.

**Proposed Resolution**

Describe the recommended fix.

**Verification**

Record the tests and results used to verify the fix.

**Resolution Version**

Record the version containing the verified fix.

## 7. Issue ID Convention

Use this format:

`VQ-ISSUE-001`

Increment the number for each new issue.

Issue IDs must remain stable even when an issue's title or status changes.

## 8. Issue Management Rules

- Record confirmed issues with reproducible evidence whenever possible.
- Distinguish bugs from planned features and product improvements.
- Do not invent issues to populate this document.
- Link related issues when appropriate.
- Avoid recording credentials, personal data, or unredacted secrets.
- Record root causes only when supported by investigation.
- Document rejected fixes and relevant reasoning.
- Update affected issue records after approved changes.
- Keep resolved issues for historical reference.

## 9. Specialist Responsibilities

| Specialist             | Responsibility                                                        |
| ---------------------- | --------------------------------------------------------------------- |
| Project Architect      | Coordinates cross-project issue resolution                            |
| Backend Engineer       | Investigates API and backend issues                                   |
| Database Engineer      | Investigates schema, query, migration, and RLS issues                 |
| Mobile Engineer        | Investigates mobile application issues                                |
| UI/UX Designer         | Reviews usability and design-related issues                           |
| QA Engineer            | Reproduces, verifies, and tracks defects                              |
| Security Engineer      | Investigates security-related issues                                  |
| Multi-Specialist Agent | Handles relevant AI, integration, fitness/nutrition, or DevOps issues |

Specialists may investigate and recommend fixes within their responsibilities. Project modifications still require user approval.

## 10. Maintenance

Review this document during:

- Development checkpoints.
- QA and regression testing.
- Security reviews.
- Dependency maintenance.
- Release preparation.
- Production incident reviews.

When an issue is resolved, record its resolution version and verification evidence.

Do not delete historical issue records without an approved reason.
