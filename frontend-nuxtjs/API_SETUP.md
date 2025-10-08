# API Setup and Configuration

## Overview
The login form has been updated with API integration, form validation, and proper error handling.

## Files Created/Modified

### 1. API Service (`src/services/api.ts`)
- Handles HTTP requests using native fetch API
- Includes authentication token management
- Provides login/logout methods
- Configurable base URL via environment variables

### 2. Validation Utilities (`src/utils/validation.ts`)
- Form validation functions
- Email, password, and username validation
- Reusable validation rules

### 3. Updated LoginForm (`src/components/auth/LoginForm.vue`)
- Real-time form validation
- API integration with loading states
- Error handling and user feedback
- Password visibility toggle
- Remember device functionality

## Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
```

### Backend API Endpoints Expected

The login form expects the following API structure:

**POST /api/auth/login**
```json
{
  "username": "string",
  "password": "string", 
  "remember_device": "boolean"
}
```

**Response (Success)**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "username": "user123",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

**Response (Error)**
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

## Features Implemented

### Form Validation
- **Username/Email**: Required, accepts both email addresses and usernames (3-50 characters, alphanumeric + underscore)
- **Password**: Required, minimum 6 characters
- Real-time validation on blur and input
- Visual error indicators

### User Experience
- Loading states during API calls
- Disabled form during submission
- Password visibility toggle
- Remember device checkbox
- Error messages for API failures
- Success navigation to dashboard

### Security
- Token-based authentication
- Secure token storage in localStorage
- Automatic token inclusion in subsequent requests

## Usage

1. **Install Dependencies** (if using axios):
   ```bash
   npm install axios
   ```

2. **Configure API URL**:
   - Create `.env` file with `VITE_API_URL`
   - Update to match your backend endpoint

3. **Update Backend**:
   - Ensure login endpoint matches expected format
   - Implement proper JWT token generation
   - Add CORS configuration if needed

## TODO Items

- [ ] Confirm API base URL and authentication strategy
- [ ] Implement global state management for user data
- [ ] Add refresh token functionality
- [ ] Implement proper logout flow
- [ ] Add route guards for protected pages
- [ ] Consider using axios instead of fetch for better error handling

## Assumptions Made

- Backend API follows RESTful conventions
- JWT tokens are used for authentication
- API responses follow the specified format
- Dashboard route exists at `/dashboard`
- Forgot password route exists at `/forgot-password` 