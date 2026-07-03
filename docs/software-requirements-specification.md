# Software Requirements Specification (SRS)

## UniHub

**Version:** 1.0
**Status:** Draft
**Author:** Project Team
**Last Updated:** June 2026

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for UniHub.

UniHub is a web-based academic management platform designed to help university students organise modules, assignments, grades, examinations, and academic progress within a single application.

This document establishes the requirements that will guide system design, implementation, testing, and deployment.

### 1.2 Scope

UniHub will provide a centralised platform for managing academic information.

The system will enable students to:

- Manage academic modules.
- Track assignments and coursework.
- Record grades and assessment results.
- Monitor academic performance.
- View upcoming deadlines.
- Analyse progress through a dashboard.

The application will be accessible through modern web browsers and will utilise secure user authentication.

### 1.3 Intended Audience

This document is intended for:

- Developers
- Project maintainers
- Testers
- Future contributors
- Potential employers reviewing the project

### 1.4 Definitions

| Term       | Definition                                                   |
| ---------- | ------------------------------------------------------------ |
| Module     | A university course or subject.                              |
| Assignment | Coursework associated with a module.                         |
| Grade      | A mark awarded for an assignment.                            |
| User       | An authenticated student using the system.                   |
| Dashboard  | The primary overview screen displaying academic information. |
| MVP        | Minimum Viable Product.                                      |

## 2. System Overview

UniHub is a full-stack web application consisting of:

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- Better Auth

### CI/CD

- GitHub Actions

## 3. Functional Requirements

### 3.1 Authentication

#### FR-001

The system shall allow users to register an account.

#### FR-002

The system shall allow users to authenticate using email and password.

#### FR-003

The system shall maintain authenticated sessions using Better Auth.

#### FR-004

The system shall allow users to log out.

#### FR-005

The system shall allow users to update profile information.

#### FR-006

The system shall prevent unauthenticated users from accessing protected resources.

### 3.2 Module Management

#### FR-007

The system shall allow users to create modules.

#### FR-008

The system shall allow users to edit modules.

#### FR-009

The system shall allow users to delete modules.

#### FR-010

The system shall allow users to view all modules associated with their account.

#### FR-011

The system shall store the following module information:

- Module code
- Module title
- Academic year
- Semester
- Credit value

### 3.3 Assignment Management

#### FR-012

The system shall allow users to create assignments.

#### FR-013

The system shall associate assignments with a module.

#### FR-014

The system shall allow users to edit assignment information.

#### FR-015

The system shall allow users to delete assignments.

#### FR-016

The system shall allow users to mark assignments as complete.

#### FR-017

The system shall store:

- Assignment title
- Due date
- Weighting
- Status
- Notes

### 3.4 Grade Management

#### FR-018

The system shall allow users to record assignment grades.

#### FR-019

The system shall allow users to edit grades.

#### FR-020

The system shall calculate weighted module averages.

#### FR-021

The system shall display module performance statistics.

#### FR-022

The system shall calculate overall academic averages.

### 3.5 Dashboard

#### FR-023

The system shall display upcoming assignment deadlines.

#### FR-024

The system shall display active modules.

#### FR-025

The system shall display assignment completion statistics.

#### FR-026

The system shall display current academic averages.

#### FR-027

The system shall display recent academic activity.

### 3.6 Search and Filtering

#### FR-028

The system shall allow users to search modules.

#### FR-029

The system shall allow users to search assignments.

#### FR-030

The system shall allow users to filter assignments by status.

#### FR-031

The system shall allow users to sort assignments by due date.

### 3.7 Data Ownership

#### FR-032

Users shall only be able to access their own data.

#### FR-033

Users shall not be able to view another user's modules, assignments, or grades.

## 4. Non-Functional Requirements

### 4.1 Security

#### NFR-001

Authentication shall be managed using Better Auth.

#### NFR-002

Passwords shall never be stored in plain text.

#### NFR-003

All protected endpoints shall require authentication.

#### NFR-004

User data shall be isolated to authorised users only.

#### NFR-005

Environment variables shall be used for secrets and configuration.

### 4.2 Performance

#### NFR-006

API requests should complete within two seconds under normal operating conditions.

#### NFR-007

Dashboard data should load within three seconds under normal operating conditions.

### 4.3 Reliability

#### NFR-008

The application shall handle unexpected server errors gracefully.

#### NFR-009

The system shall provide meaningful error messages for invalid user actions.

#### NFR-010

The application shall maintain data consistency within the database.

### 4.4 Usability

#### NFR-011

The application shall support modern desktop browsers.

#### NFR-012

The application shall support modern mobile browsers.

#### NFR-013

The user interface shall remain consistent across all pages.

### 4.5 Maintainability

#### NFR-014

The codebase shall use TypeScript throughout the application.

#### NFR-015

The project shall follow a documented folder structure.

#### NFR-016

The codebase shall use ESLint and Prettier.

#### NFR-017

The application shall include automated testing.

### 4.6 CI/CD

#### NFR-018

GitHub Actions shall automatically run on pull requests and pushes.

#### NFR-019

GitHub Actions shall execute:

- Linting
- Unit tests
- Integration tests
- Production build verification

#### NFR-020

The deployment pipeline shall automatically deploy successful builds to production.

## 5. User Stories

### Authentication

#### US-001

As a student, I want to create an account so that I can securely access my academic data.

#### US-002

As a student, I want to log in so that I can manage my university information.

### Module Management

#### US-003

As a student, I want to create modules so that I can organise my academic workload.

#### US-004

As a student, I want to edit module information so that my records remain accurate.

### Assignment Management

#### US-005

As a student, I want to record assignments so that I can track coursework deadlines.

#### US-006

As a student, I want to mark assignments as complete so that I can monitor my progress.

### Grade Management

#### US-007

As a student, I want to record grades so that I can track my academic performance.

#### US-008

As a student, I want to view averages so that I can understand how I am performing academically.

### Dashboard

#### US-009

As a student, I want to see upcoming deadlines so that I do not miss important submissions.

#### US-010

As a student, I want to view a summary dashboard so that I can quickly understand my academic situation.

## 6. Acceptance Criteria

### AC-001: User Registration

Given a user is not registered

When they submit valid registration details

Then a new account shall be created

And the user shall be able to log in

### AC-002: User Authentication

Given a registered user

When valid credentials are provided

Then access shall be granted

And an authenticated session shall be established

### AC-003: Module Creation

Given an authenticated user

When they submit valid module details

Then a new module shall be created

And appear within their module list

### AC-004: Assignment Creation

Given an authenticated user

When they create an assignment

Then the assignment shall be linked to the selected module

And appear within assignment listings

### AC-005: Grade Recording

Given an assignment exists

When a grade is entered

Then the grade shall be stored

And relevant averages shall be recalculated

### AC-006: Dashboard Display

Given an authenticated user

When they access the dashboard

Then the dashboard shall display:

- Active modules
- Upcoming deadlines
- Academic statistics
- Assignment progress

## 7. Assumptions and Constraints

### Assumptions

- Users possess internet access.
- Users have a modern web browser.
- Users understand basic university terminology.

### Constraints

- Development will be undertaken by a single developer.
- Initial deployment will utilise free hosting tiers.
- The MVP will prioritise core academic management features.

## 8. Future Enhancements

The following features are outside the MVP scope but may be added in future releases:

- Revision planner
- Calendar integration
- Email notifications
- Academic analytics
- Study session tracking
- Goal management
- AI-assisted study planning
- Mobile application

## 9. Approval

This document defines the baseline requirements for UniHub Version 1.0 and shall be used as the primary reference for design and implementation decisions.
