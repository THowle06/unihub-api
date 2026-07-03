# UniHub API

[![CI](https://github.com/THowle06/unihub-api/actions/workflows/ci.yml/badge.svg)](https://github.com/THowle06/unihub-api/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/THowle06/unihub-api/graph/badge.svg)](https://codecov.io/gh/THowle06/unihub-api)

![GitHub last commit](https://img.shields.io/github/last-commit/THowle06/unihub-api)
![GitHub repo size](https://img.shields.io/github/repo-size/THowle06/unihub-api)
![GitHub issues](https://img.shields.io/github/issues/THowle06/unihub-api)
![GitHub License](https://img.shields.io/github/license/THowle06/unihub-api)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000)
![Neon](https://img.shields.io/badge/Neon-00E599?logo=neondatabase&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)

---

## Overview

UniHub API is the backend service that powers the UniHub platform.

It provides a RESTful API for managing university-related data, including authentication, modules, assignments, grades, and academic progress. The API is designed to be consumed by multiple clients, including the UniHub web application and future mobile applications.

This project is being developed as a portfolio project to demonstrate backend software engineering practices, including API design, database modelling, authentication, testing, CI/CD, containerisation, and cloud deployment.

---

## Project Status

🚧 **Currently in active development**

Current phase:

- [x] Project planning
- [x] Requirements specification
- [x] System architecture
- [x] Database design
- [ ] Project setup
- [ ] Authentication
- [ ] Core API implementation
- [ ] Testing
- [ ] Production deployment

---

## Planned Features

### Authentication

- User registration
- User login
- Session management
- Protected endpoints
- Role-based authorisation

### Academic Management

- Module management
- Assignment management
- Grade recording
- Academic progress tracking

### API

- RESTful endpoints
- Input validation
- Centralised error handling
- Pagination
- Filtering
- Sorting

### Infrastructure

- Automated testing
- CI/CD pipeline
- Docker support
- Cloud deployment

---

## Architecture

The API follows a layered architecture.

```text
Client Applications
        │
        ▼
REST API (Express)
        │
        ▼
Business Logic
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

---

## Technology Stack

### Runtime

- Node.js
- TypeScript

### Framework

- Express

### Authentication

- Better Auth

### Database

- PostgreSQL
- Prisma ORM
- Neon

### Testing

- Vitest
- Supertest

### Infrastructure

- Docker
- GitHub Actions
- Render

---

## Repository Structure

```text
.
├── docs/
├── prisma/
├── scripts/
├── src/
│   ├── config/
│   ├── lib/
│   ├── middleware/
│   ├── modules/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## Documentation

Project documentation is available in the `docs/` directory.

| Document                            | Description                                |
| ----------------------------------- | ------------------------------------------ |
| Project Scope                       | Defines project objectives and boundaries  |
| Software Requirements Specification | Functional and non-functional requirements |
| Database Design                     | Database schema and relationships          |
| System Architecture                 | High-level architecture                    |
| API Specification                   | Endpoint definitions                       |
| DevOps                              | Deployment and CI/CD                       |

---

## Development Workflow

Development follows a structured software engineering process.

```text
Requirements
      ↓
Architecture
      ↓
Implementation
      ↓
Testing
      ↓
Deployment
```

Development is managed using:

- GitHub Issues
- GitHub Projects
- GitHub Milestones
- Pull Requests

---

## Roadmap

### Version 1.0

- Authentication
- User management
- Module management
- Assignment management
- Grade management
- REST API documentation
- Production deployment

### Future Enhancements

- Calendar integration
- Notifications
- Email verification
- Password reset
- Background jobs
- File uploads
- Search
- Analytics
- API versioning

---

## Related Projects

| Repository   | Description                            |
| ------------ | -------------------------------------- |
| `unihub-web` | React frontend for the UniHub platform |

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## Author

**Tyler Howle**

BSc Computer Science
University of Nottingham
