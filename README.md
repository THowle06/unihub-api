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

UniHub API is the backend service powering the UniHub platform.

It provides a RESTful API for managing university-related data including authentication, modules, assignments, grades and academic progress.
The API is designed to be consumed by multiple clients, including the UniHub web application and future mobile applications.

This project is being developed as a portfolio project to demonstrate professional backend software engineering practices including:

- REST API development
- Database modelling
- Authentication
- Automated testing
- CI/CD
- Containerisation
- Cloud deployment

---

## Project Status

🚧 **Currently in active development**

### Progress

- [x] Project planning
- [x] Requirements specification
- [x] System architecture
- [x] Database design
- [x] Project setup
- [ ] Authentication
- [ ] Core API implementation
- [ ] Production deployment

---

## Current Features

- Express REST API
- Environment configuration and validation
- Prisma ORM integration
- PostgreSQL database support
- Health check endpoints
- Automated testing with Vitest and Supertest
- GitHub Actions CI pipeline
- Docker container support
- Docker Compose local development environment

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
       Clients
          │
          ▼
   Express REST API
          │
          ▼
Controllers / Services
          │
          ▼
    Prisma Client
          │
          ▼
 PostgreSQL Database
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
- Docker Compose
- GitHub Actions

---

## Getting Started

### Prerequisites

- Node.js 24+
- npm
- PostgreSQL (or a Neon database)
- Docker (optional)

### Installation

Clone the repository:

```bash
git clone https://github.com/THowle06/unihub-api.git
cd unihub-api
```

Install dependencies:

```bash
npm install
```

### Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Populate the required environment variables before starting the application.

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## Docker

Build the application image:

```bash
docker build -t unihub-api .
```

Run the container:

```bash
docker run --env-file .env -p 3000:3000 unihub-api
```

Alternatively, run both the API and a local PostgreSQL database using Docker Compose:

```bash
docker compose up --build
```

---

## Available Scripts

| Command                 | Description                   |
| ----------------------- | ----------------------------- |
| `npm run dev`           | Start the development server  |
| `npm run build`         | Compile the application       |
| `npm start`             | Run the compiled application  |
| `npm test`              | Execute the test suite        |
| `npm run test:coverage` | Generate test coverage        |
| `npm run lint`          | Run ESLint                    |
| `npm run lint:fix`      | Automatically fix lint issues |
| `npm run format`        | Format the codebase           |
| `npm run format:check`  | Check formatting              |
| `npm run typecheck`     | Run TypeScript type checking  |

---

## API Health Endpoints

| Endpoint               | Description                    |
| ---------------------- | ------------------------------ |
| `GET /health`          | Returns API health information |
| `GET /health/database` | Verifies database connectivity |

---

## Continuous Integration

Every push and pull request to the `main` branch automatically executes:

- Dependency installation
- Prisma Client generation
- ESLint
- Prettier formatting checks
- TypeScript type checking
- Vitest test suite
- Code coverage reporting to Codecov

---

## Repository Structure

```text
.
├── docs/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── lib/
│   ├── middleware/
│   ├── modules/
│   │   └── health/
│   ├── types/
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
