# NestJS Authentication Setup

## Overview
Complete authentication system for the OVPRDIE application with JWT tokens, password hashing, and role-based access control.

## Features Implemented

### 🔐 Authentication Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based user types
- Remember device functionality
- Secure token storage
- CORS configuration for frontend

### 🛡️ Security Features
- Password validation and hashing
- JWT token expiration (24h)
- Input validation with DTOs
- Protected routes with guards
- CORS protection

## Installation & Setup

### 1. Install Dependencies
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs @types/bcryptjs @types/passport-jwt @types/passport-local class-validator class-transformer
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3307
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=ovprdie

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup
Ensure your MySQL database is running and the `ovprdie` database exists:
```sql
CREATE DATABASE IF NOT EXISTS ovprdie;
```

### 4. Run Database Seeding
```bash
npm run seed
```

This will create test users:
- **Admin**: `admin@ovprdie.com` / `admin123`
- **Researcher**: `researcher@ovprdie.com` / `researcher123`

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`
Login with username/email and password.

**Request Body:**
```json
{
  "username": "admin@ovprdie.com",
  "password": "admin123",
  "remember_device": true
}
```

**Success Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin@ovprdie.com",
      "email": "admin@ovprdie.com",
      "role": "admin"
    }
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Invalid credentials. Please check your username and password."
}
```

#### POST `/api/auth/logout`
Logout user (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
```json
{
  "status": "success",
  "message": "Logout successful"
}
```

## User Types & Roles

The system supports the following user types:

| User Type | Role | Description |
|-----------|------|-------------|
| 1 | researcher | Researcher |
| 2 | research_director | Research Director and Vice President |
| 3 | staff_clerk | Staff/Clerk |
| 4 | center_head | Center Heads and Project Leaders |
| 5 | extension_coordinator | Extension Coordinator |
| 32 | admin | Administrator |

## File Structure

```
src/
├── auth/
│   ├── auth.module.ts          # Authentication module
│   ├── auth.service.ts         # Authentication business logic
│   ├── auth.controller.ts      # Authentication endpoints
│   ├── jwt.strategy.ts         # JWT authentication strategy
│   ├── local.strategy.ts       # Local authentication strategy
│   ├── jwt-auth.guard.ts       # JWT route protection
│   ├── local-auth.guard.ts     # Local route protection
│   └── dto/
│       └── login.dto.ts        # Login validation DTO
├── seed/
│   ├── seed.module.ts          # Seed module
│   └── seed.service.ts         # Database seeding logic
└── user/
    └── user.entity.ts          # User database entity
```

## Usage Examples

### Protecting Routes
```typescript
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('protected')
@UseGuards(JwtAuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData(@Request() req) {
    return { message: 'This is protected data', user: req.user };
  }
}
```

### Getting User Information
```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return {
    user_id: req.user.user_id,
    email: req.user.email,
    user_type: req.user.user_type
  };
}
```

## Testing

### 1. Start the Development Server
```bash
npm run start:dev
```

### 2. Test Login Endpoint
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@ovprdie.com",
    "password": "admin123",
    "remember_device": true
  }'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Frontend Integration

The backend is configured to work with the Vue.js frontend:

1. **CORS**: Configured for `http://localhost:5173` (Vite default)
2. **API Prefix**: All routes are prefixed with `/api`
3. **Response Format**: Matches the frontend's expected format

## Security Considerations

### Production Checklist
- [ ] Change JWT_SECRET to a strong, unique key
- [ ] Set up proper environment variables
- [ ] Disable database synchronize in production
- [ ] Set up proper CORS origins
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up HTTPS
- [ ] Implement refresh tokens
- [ ] Add password reset functionality

### TODO Items
- [ ] Implement refresh token functionality
- [ ] Add password reset endpoints
- [ ] Add email verification
- [ ] Implement rate limiting
- [ ] Add audit logging
- [ ] Create user management endpoints
- [ ] Add role-based route protection

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Ensure proper Authorization header format

3. **CORS Errors**
   - Check FRONTEND_URL in environment
   - Verify frontend is running on correct port
   - Check browser console for CORS details

### Debug Mode
```bash
npm run start:debug
```

This will start the server in debug mode with additional logging. 