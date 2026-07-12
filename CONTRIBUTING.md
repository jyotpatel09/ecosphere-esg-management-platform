# Contributing to EcoSphere

Thank you for investing your time in contributing to our project!

## Development Workflow
1. Clone the repository.
2. Install dependencies in both `/frontend` and `/backend`.
3. Create a feature branch from `main`.
4. Ensure you follow the architecture defined in `ARCHITECTURE.md` and `MODULE_GUIDE.md`.

## Coding Standards
- **Formatting**: Run `npm run format` before committing.
- **Linting**: Ensure `npm run lint` passes with 0 errors. Do not disable rules without architect approval.
- **Typing**: Strict TypeScript is required. `any` is forbidden in new code.
- **Responses**: Always use the `formatSuccess` and `formatError` utilities for backend responses.

## Submitting Changes
- Ensure all build steps pass.
- Submit a Pull Request with a detailed description of the changes.
