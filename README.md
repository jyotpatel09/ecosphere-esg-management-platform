# EcoSphere - ESG Management Platform

## Overview
EcoSphere is a robust, production-quality Enterprise Resource Planning (ERP) web application tailored for Environmental, Social, and Governance (ESG) management. This platform provides organizations with the tools they need to track, manage, and report on their sustainability and corporate responsibility metrics.

## Features
- **Role-Based Access Control (RBAC)**: Secure access tailored for Admins, ESG Managers, Employees, and Auditors.
- **Modular Architecture**: Pluggable modules for Environment, Social, Governance, Gamification, and Reports.
- **Robust UI**: Built with React, Vite, and Tailwind CSS, featuring reusable primitives, loading states, and error boundaries.
- **Scalable Backend**: Express and Prisma-powered backend with Zod validation and structured Winston logging.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Setup
1. Clone the repository.
2. Configure the database in `backend/.env`.
3. Run `npm install` in both `frontend` and `backend` directories.
4. Apply Prisma migrations: `cd backend && npx prisma db push`.
5. Seed the database: `npm run prisma:seed`.

### Running the Application
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`

## Phase 1.5 - Stabilization
This project is currently completing Phase 1.5, ensuring high-quality, production-ready foundation architecture before core business modules are developed.
