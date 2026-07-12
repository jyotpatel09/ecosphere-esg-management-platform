# EcoSphere Architecture

## System Overview
EcoSphere follows a classic Client-Server architecture utilizing a modern tech stack designed for scalability and maintainability.

### Frontend
- **Framework**: React 18 with Vite for rapid development and optimized builds.
- **State Management**: Zustand for global state (Authentication, User Session) and local React state for UI components.
- **Routing**: React Router v6 with nested routes and RBAC-protected layout boundaries.
- **Styling**: Tailwind CSS for utility-first, responsive, and accessible styling.
- **Validation**: Zod with React Hook Form.

### Backend
- **Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma Client for type-safe database access and migrations.
- **Authentication**: JWT-based stateless authentication.
- **Logging**: Winston structured logger.

## Directory Structure
- `frontend/src/modules/*`: Domain-specific business logic and pages.
- `frontend/src/components/*`: Reusable, generic UI primitives.
- `backend/src/controllers/*`: Request handling and response formatting.
- `backend/src/middleware/*`: Authentication, authorization, error handling, and Zod validation.
