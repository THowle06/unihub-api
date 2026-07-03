# API Specification Document

## UniHub

**Version**: 1.0
**Status**: Draft
**Last Updated**: June 2026

---

## 1. Purpose

This document defines the REST API contract for UniHub.

The API provides functionality for:

- Authentication
- User management
- Module management
- Assignment management
- Grade management
- Dashboard analytics

The API shall be consumed by the UniHub React frontend.

## 2. API Standards

### Base URL

Development:

```text
http://localhost:3000/api
```

Production:

```text
https://api.unihub.app/api
```

### Content Type

All requests and responses shall use:

```http
Content-Type: application/json
```

### Authentication

Authentication shall be managed using Better Auth session cookies.

Protected endpoints require an authenticated session.

### API Versioning

Versioning shall be URL-based:

Example:

```text
/api/v1/modules
```

Initial release:

```text
v1
```

## 3. Response Standards

### Successful Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Module not found"
  }
}
```

## 4. Authentication Endpoints

> Note: Better Auth provides many of these routes automatically. This section documents how UniHub interacts with authentication.

### Register User

#### Endpoint

```http
POST /api/v1/auth/register
```

#### Request

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com"
  }
}
```

### Login User

#### Endpoint

```http
POST /api/v1/auth/login
```

#### Request

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com"
    }
  }
}
```

### Logout User

#### Endpoint

```http
POST /api/v1/auth/logout
```

#### Authentication

Required

#### Response

```json
{
  "success": true
}
```

### Current User

#### Endpoint

```http
GET /api/v1/auth/me
```

#### Authentication

Required

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com"
  }
}
```

## 5. Module Endpoints

### Get All Modules

#### Endpoint

```http
GET /api/v1/modules
```

#### Authentication

Required

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "moduleCode": "COMP2010",
      "title": "Data Structures",
      "semester": 1,
      "credits": 20
    }
  ]
}
```

### Get Module By ID

#### Endpoint

```http
GET /api/v1/modules/:id
```

#### Authentication

Required

### Create Module

#### Endpoint

```http
POST /api/v1/modules
```

#### Request

```json
{
  "moduleCode": "COMP2010",
  "title": "Data Structures",
  "semester": 1,
  "credits": 20
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

### Update Module

#### Endpoint

```http
PUT /api/v1/modules/:id
```

#### Authentication

Required

### Delete Module

#### Endpoint

```http
DELETE /api/v1/modules/:id
```

#### Authentication

Required

## 6. Assignment Endpoints

### Get Assignments

#### Endpoint

```http
GET /api/v1/assignments
```

#### Query Parameters

```text
?status=COMPLETED
?moduleId=uuid
?sort=dueDate
```

#### Authentication

Required

### Create Assignment

#### Endpoint

```http
POST /api/v1/assignments
```

#### Request

```json
{
  "moduleId": "uuid",
  "title": "Coursework 1",
  "description": "Implement sorting algorithms",
  "dueDate": "2026-11-10T23:59:00Z",
  "weighting": 25
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

### Get Assignment

#### Endpoint

```http
GET /api/v1/assignments/:id
```

#### Authentication

Required

### Update Assignment

#### Endpoint

```http
PUT /api/v1/assignments/:id
```

#### Authentication

Required

### Delete Assignment

#### Endpoint

```http
DELETE /api/v1/assignments/:id
```

#### Authentication

Required

### Update Assignment Status

#### Endpoint

```http
PATCH /api/v1/assignments/:id/status
```

#### Request

```json
{
  "status": "COMPLETED"
}
```

## 7. Grade Endpoints

### Get Grades

#### Endpoint

```http
GET /api/v1/grades
```

#### Authentication

Required

### Create Grade

#### Endpoint

```http
POST /api/v1/grades
```

#### Request

```json
{
  "assignmentId": "uuid",
  "score": 74,
  "feedback": "Good implementation"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid"
  }
}
```

### Update Grade

#### Endpoint

```http
PUT /api/v1/grades/:id
```

#### Authentication

Required

### Delete Grade

#### Endpoint

```http
DELETE /api/v1/grades/:id
```

#### Authentication

Required

## 8. Dashboard Endpoints

The dashboard aggregates information from multiple resources.

### Dashboard Summary

#### Endpoint

```http
GET /api/v1/dashboard
```

#### Authentication

Required

#### Response

```json
{
  "success": true,
  "data": {
    "activeModules": 5,
    "totalAssignments": 18,
    "completedAssignments": 11,
    "overallAverage": 71.4
  }
}
```

### Upcoming Deadlines

#### Endpoint

```http
GET /api/v1/dashboard/deadlines
```

#### Authentication

Required

#### Response

```json
{
  "success": true,
  "data": [
    {
      "assignmentId": "uuid",
      "title": "Coursework 2",
      "dueDate": "2026-11-20"
    }
  ]
}
```

## 9. HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthenticated       |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

## 10. Validation Rules

### Module

| Field      | Rule     |
| ---------- | -------- |
| moduleCode | Required |
| title      | Required |
| semester   | 1-2      |
| credits    | >0       |

### Assignment

| Field     | Rule     |
| --------- | -------- |
| title     | Required |
| dueDate   | Required |
| weighting | 0-100    |

### Grade

| Field    | Rule     |
| -------- | -------- |
| score    | 0-100    |
| feedback | Optional |

## 11. Security Requirements

All protected endpoints shall:

- Require authentication
- Verify ownership of requested resources
- Reject unauthorised access attempts

Example:

A user requesting:

```http
GET /api/v1/modules/123
```

must only receive data if module `123` belongs to them.

## 12. Future Endpoints

Future releases may add:

```http
/api/v1/exams
/api/v1/goals
/api/v1/study-sessions
/api/v1/notifications
/api/v1/calendar
```
