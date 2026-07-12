# EcoSphere API Documentation

All API responses follow a standardized format.

## Standardized Responses

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## Authentication Endpoints

### `POST /api/auth/login`
- **Description**: Authenticates a user and returns a JWT.
- **Body**: `{ email, password }`
- **Response**: User object and JWT.

### `GET /api/auth/profile`
- **Description**: Retrieves the authenticated user's profile.
- **Headers**: `Authorization: Bearer <token>`
