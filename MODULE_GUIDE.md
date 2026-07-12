# EcoSphere Module Guide

This guide outlines the ownership, responsibilities, and architecture of the modular system within EcoSphere.

## Core Platform
- **Ownership**: Platform Engineering Team
- **Responsibilities**: Authentication, RBAC, Layouts, Shared UI Primitives, Global Error Handling, Logging, and Database configuration.

## Environmental Module
- **Path**: `frontend/src/modules/environment/`, `backend/src/routes/environment.routes.ts`
- **Responsibilities**: Tracking carbon footprint, energy consumption, waste management, and water usage.

## Social Module
- **Path**: `frontend/src/modules/social/`
- **Responsibilities**: Employee wellbeing, diversity metrics, community engagement, and labor practices.

## Governance Module
- **Path**: `frontend/src/modules/governance/`
- **Responsibilities**: Board diversity, anti-corruption policies, compliance tracking, and risk management.

## Reports
- **Responsibilities**: Aggregating data across all modules into exportable, compliance-ready formats (PDF, CSV).

## Settings
- **Responsibilities**: Global application settings, user management, and configuration.

## Coding Conventions
1. **Never mutate shared state directly**. Always use Zustand actions.
2. **Standardized Responses**: All API endpoints must return `{ success, message, data/error }`.
3. **No loose typings**: Use Zod for runtime validation and strict TypeScript interfaces for compile-time checking.
