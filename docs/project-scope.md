# UniHub Project Scope Document

## Project Overview

UniHub is a full-stack web application designed to help university students manage their academic workload from a single platform. The application will provide tools for tracking modules, assignmengs, grades, examinations, study progress, and academic performance metrics.

The goal of UniHub is to replace the fragmented workflow many students currently use, where academic information is spread across university portals, calendars, note-taking applications, spreadsheets, and personal task management systems.

UniHub will act as a centralised academic dashboard that enables students to organise their studies, monitor progress, and make informed decisions about workload and academic performance.

## Problem Statement

University students often struggle to manage multiple modules, deadlines, assessments, and grades across various systems.

Common issues include:

- Missing assignment deadlines.
- Poor visibility of upcoming workload.
- Difficulty tracking grade progression.
- Lack of insight into academic performance trends.
- Academic information scattered across multiple applications.

Existing solutions frequently focus on either task management or note-taking rather than providing a dedicated academic management platform.

UniHub aims to solve this problem by providing a unified system specifically tailored to university students.

## Project Objectives

The project aims to:

1. Provide a centralised academic management platform.
2. Enable students to track modules and assessments.
3. Improve visibility of academic workload.
4. Allow students to monitor grades and performance.
5. Demonstrate modern full-stack software engineering practices.
6. Serve as a professional portfolio project suitable for graduate and internship applications.

## Target Users

### Primary Users

University students who need a structured way to manage academic responsibilities.

### Secondary Users

Students preparing for examinations who require visibility into workload, deadlines, and academic performance.

## Minimum Viable Product

The initial release will contain the following functionality:

### User Management

Users shall be able to:

- Regiser an account.
- Log in securely.
- Log out.
- Manage profile information.

### Module Managememnt

Users shall be able to:

- Create modules.
- Edit modules.
- Delete modules.
- View module information.

### Assignment Management

Users shall be able to:

- Create assignments.
- Assign deadlines.
- Associate assignments with modules.
- Track completion status.
- Record assignment weighting.

### Grade Tracking

Users shall be able to:

- Record assignment grades.
- View module averages.
- Calculate weighted averages.
- Monitor overall academic performance.

### Dashboard

Users shall be able to view:

- Upcoming deadlines.
- Active modules.
- Assignment completion statistics.
- Current academic averages.

## Future Features

The following features are considered out of scope for the MVP but may be implemented if time permits.

### Revision Planner

- Study scheduling.
- Revision goals.
- Exam preparation tracking.

### Analytics

- Predicted final classification.
- Grade trend analysis.
- Workload forecasting.

### Notifications

- Upcoming deadline reminders.
- Assignment alerts.
- Examination reminders.

### Calendar Integration

- Google Calendar synchronisation.
- Academic timetable management.

### AI Features

- Revision plan generation.
- Study recommendations.
- Workload estimation assistance.

## Out of Scope

The following functionality will not be included in the MVP.

- Mobile applications.
- Real-time collaboration.
- Messaging systems.
- Social networking features.
- Learning management system integration.
- Payment systems.
- Multi-tenant institutional support.

These features significantly increase complexity and are not required to achieve project objectives.

## Technical Scope

### Frontend

The frontend application will be developed using:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Tanstack Query

### Backend

The backend application will be developed using:

- Node.js
- Express
- TypeScript

### Database

Persistent data storage will be provided by:

- PostgreSQL
- Prisma ORM

### Authentication

Authentication and session management will be provided using:

- Better Auth
- Secure session-based authentication
- Role-based access control (future enhancement)

### Testing

The application will included automated testing using:

- Vitest
- React Testing Library
- Supertest

### CI/CD

Continuous Integration and Continuous Deployment will be implemented using:

- GitHub Actions
- Automated linting
- Automated testing
- Automated build verification
- Automated deployment to production environments

### Deployment

The application will be deployed using:

- Vercel (Frontend)
- Render (Backend)
- Neon PostgreSQL (Database)

Source control and deployment workflows will be managed through GitHub.

## Engineering Practices

The project will follow modern software engineering practices commonly used within industry.

### Version Control

- Git will be used for source control.
- Development will be feature-branch based.
- Pull requests will be used for all major features.

### Code Quality

- ESLint will enforce conding standards.
- Prettier will provide consistent formatting.
- TypeScript will provide static type checking.

### Continuous Integration

Every commit and pull request shall trigger:

- Dependency installation
- Linting
- Automated tests
- Production build validation

### Continuous Deployment

Successful merges into the main branch shall automatically deploy:

- Frontend application
- Backend application

### Documentation

Project documentation shall be maintained throughout development and updated alognside feature implementation.

## Success Criteria

The project will be considered successful if:

1. Users can register and authenticate securely.
2. Users can manage modules and assignments.
3. Users can track grades and academic performance.
4. The application is publicly deployed and accessible.
5. The project contains automated unit and integration tests.
6. GitHub Actions successfully validates all pull requests and commits.
7. The application is automatically deployed through a CI/CD pipeline.
8. The project follows a documented architecture.
9. The repository demonstrates professional software engineering practices.
10. The application can be used effectively by a university student for an academic semester.

## Deliverables

The final project shall include:

- Frontend application.
- Backend REST API.
- PostgreSQL database schema.
- Better Auth authentication system.
- Automated unit and integration tests.
- GitHub Actions CI/CD workflows.
- Automated deployment pipeline.
- Database documentation.
- API documentation.
- User documentation.
- Professional GitHub Repository.

## Project Vision

To create a modern academic management platform that helps students organise their university life while demonstrating professional full-stack software engineering practices including authentication, testing, CI/CD, cloud deployment, database design, and maintainable application architecture.
