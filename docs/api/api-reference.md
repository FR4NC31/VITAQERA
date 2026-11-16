# VitaQera — API Reference

## 1. Purpose

This document defines the API documentation standards and records the API endpoints implemented by VitaQera.

It serves as a shared contract between the mobile application, backend API, and testing workflows.

Only verified and implemented endpoints should be documented as active API endpoints.

## 2. API Technology

- Runtime: Cloudflare Workers.
- Framework: Hono.
- Language: TypeScript.
- Authentication: Better Auth.
- Database: Neon PostgreSQL.
- ORM: Drizzle ORM.

Verify the actual implementation before changing this information.

## 3. API Conventions

### Base URL

Development and production base URLs must be documented separately.

Do not assume a production URL until it has been configured and approved.

### HTTP Methods

| Method | Purpose                             |
| ------ | ----------------------------------- |
| GET    | Retrieve resources                  |
| POST   | Create resources or perform actions |
| PUT    | Replace a resource                  |
| PATCH  | Partially update a resource         |
| DELETE | Delete a resource                   |

Use the method that best represents the operation.

### Response Format

Use consistent JSON response structures.

Recommended success format:

```json
{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}
```

Recommended error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid"
  }
}
```

These are proposed conventions. Verify the existing API response implementation before adopting them.

## 4. Authentication

Authentication is managed through Better Auth.

Expected capabilities:

- Registration.
- Sign-in.
- Email verification using OTP.
- Session management.
- Sign-out.
- Session validation.
- Planned Google sign-in support.

Document the actual Better Auth endpoints, request formats, response formats, and session behavior after inspecting the configuration.

Do not invent custom authentication routes when Better Auth already provides the required functionality.

## 5. API Endpoint Groups

The following groups represent planned API domains, not confirmed implemented endpoints.

| API Group      | Responsibility                                |
| -------------- | --------------------------------------------- |
| Authentication | Registration, sign-in, verification, sessions |
| Profile        | User profile and personal information         |
| Nutrition      | Food records, calories, and macros            |
| Fitness        | Exercises and workout sessions                |
| Hydration      | Water intake and daily goals                  |
| Progress       | Weight history, measurements, and trends      |
| Notifications  | Preferences and notification management       |
| Push Devices   | Expo push token registration and management   |

## 6. Endpoint Documentation Template

Document each verified endpoint using this structure:

```markdown
### METHOD /endpoint/path

**Purpose:** Description of the endpoint.

**Authentication:** Required / Not Required

**Authorization:** Ownership and permission requirements.

**Path Parameters:**

- Parameter name and type.

**Query Parameters:**

- Parameter name and type.

**Request Body:**

- Field names, types, and validation rules.

**Success Response:**

- HTTP status and response structure.

**Error Responses:**

- Possible HTTP status codes and error codes.

**Validation:**

- Required fields and constraints.

**Security Notes:**

- Authentication, authorization, rate limiting, and data protection.

**Tests:**

- Relevant test coverage.
```

## 7. Validation and Error Handling

- Validate request bodies, parameters, and query strings.
- Return appropriate HTTP status codes.
- Use consistent error codes.
- Avoid exposing internal errors or sensitive information.
- Handle unauthenticated and unauthorized requests correctly.
- Document expected validation failures.

## 8. API Security Requirements

- Enforce authentication where required.
- Enforce resource ownership and authorization.
- Apply appropriate rate limits.
- Validate untrusted input.
- Protect sensitive operations.
- Use HTTPS in production.
- Never expose secrets or internal infrastructure details.
- Avoid trusting client-provided user identifiers.

## 9. Mobile API Integration

The mobile application must:

- Use approved API base URLs.
- Handle loading and error states.
- Handle authentication expiration.
- Validate and safely process API responses.
- Avoid storing sensitive credentials insecurely.
- Avoid duplicating backend business rules.
- Follow the documented API contracts.

## 10. Testing Requirements

API testing should cover:

- Successful requests.
- Validation failures.
- Authentication failures.
- Authorization failures.
- Cross-user access attempts.
- Rate limiting.
- Database failures.
- External integration failures.
- Response consistency.
- Regression behavior.

## 11. API Change Management

- Review API contract changes before implementation.
- Identify mobile and backend compatibility impacts.
- Obtain approval before changing existing API behavior.
- Update this document when endpoints or contracts change.
- Add tests for new and modified endpoints.
- Document breaking changes.
- Coordinate API changes with mobile integration.

## 12. Accuracy Rules

- Inspect actual Hono routes and Better Auth configuration.
- Do not invent endpoint paths or request fields.
- Clearly distinguish planned endpoints from implemented endpoints.
- Keep request and response examples consistent with actual code.
- Update documentation alongside approved API changes.
