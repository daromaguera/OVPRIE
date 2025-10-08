# Authentication System Guide

## Overview
The authentication system keeps users logged in using localStorage and prevents them from accessing login pages when already authenticated.

## How It Works

### 🔐 **Authentication Flow**

1. **Login**: User enters credentials → API validates → Token stored in localStorage
2. **Session Persistence**: Token and user data stored in localStorage
3. **Route Protection**: Guards prevent unauthorized access to protected routes
4. **Auto-logout**: Expired tokens automatically redirect to login

### 📁 **Key Files**

- `src/stores/auth.ts` - Authentication state management
- `src/router/guards.ts` - Route protection guards
- `src/router/index.ts` - Router configuration with guards
- `src/services/api.ts` - API service with token handling
- `src/components/auth/LoginForm.vue` - Login form with auth store integration

## Features

### ✅ **Automatic Login Persistence**
- Token stored in localStorage
- User data cached for quick access
- Automatic session restoration on page reload

### 🛡️ **Route Protection**
- **Protected Routes**: Require authentication (dashboard, etc.)
- **Guest Routes**: Only accessible when NOT authenticated (login, register)
- **Public Routes**: Accessible to everyone

### 🔄 **Automatic Redirects**
- Authenticated users → Redirected to dashboard from login
- Unauthenticated users → Redirected to login from protected pages
- Expired tokens → Automatic logout and redirect

### 🚪 **Logout Functionality**
- Clears localStorage
- Calls logout API
- Redirects to login page

## Usage Examples

### **Using the Auth Store**

```typescript
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Check if user is authenticated
if (authStore.getIsAuthenticated) {
  console.log('User is logged in');
}

// Get user information
const user = authStore.getUser;
console.log('User:', user?.username, user?.role);

// Logout
await authStore.logout();

// Access state directly (Pinia feature)
console.log('Token:', authStore.token);
console.log('User:', authStore.user);
```

### **Route Protection**

```typescript
// In router configuration
{
  path: '/dashboard',
  component: Dashboard,
  meta: { requiresAuth: true } // Requires authentication
}

{
  path: '/auth',
  component: Login,
  meta: { requiresGuest: true } // Only for non-authenticated users
}
```

### **API Calls with Authentication**

```typescript
import { apiService } from '@/services/api';

// Token automatically included in requests
const response = await apiService.login(credentials);

// 401 responses automatically handle logout
if (response.status === 'error') {
  // Handle error
}
```

## Components

### **LoginForm.vue**
- Handles login submission
- Stores authentication data
- Redirects to dashboard on success

### **LogoutButton.vue**
- Logout functionality
- Can be placed in navigation

### **UserInfo.vue**
- Displays current user information
- Shows username and role

## Configuration

### **Environment Variables**
```env
VITE_API_URL=http://localhost:3001/api
```

### **Route Guards**
- `requireAuth` - Protects routes requiring authentication
- `requireGuest` - Protects routes for non-authenticated users
- `optionalAuth` - Allows access regardless of auth status

## Security Features

### 🔒 **Token Management**
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Token expiration handling

### 🛡️ **Session Security**
- Automatic logout on 401 responses
- Clear localStorage on logout
- Route-level protection

### 🔄 **State Management**
- Pinia-based reactive authentication state
- Automatic state restoration
- Centralized auth logic
- DevTools integration
- Better TypeScript support

## Testing the System

### **1. Login Flow**
1. Navigate to `/auth`
2. Enter valid credentials
3. Should redirect to `/dashboard`
4. Refresh page - should stay logged in

### **2. Route Protection**
1. Logged in user visits `/auth` → Redirected to `/dashboard`
2. Logged out user visits `/dashboard` → Redirected to `/auth`

### **3. Logout Flow**
1. Click logout button
2. Should clear localStorage
3. Redirect to login page
4. Can't access protected routes

### **4. Token Expiration**
1. Wait for token to expire (or manually delete from localStorage)
2. Try to access protected route
3. Should redirect to login

## Troubleshooting

### **Common Issues**

1. **User stuck on login page**
   - Check localStorage for `auth_token`
   - Clear localStorage and try again

2. **Can't access protected routes**
   - Verify token exists in localStorage
   - Check if token is valid

3. **Automatic logout issues**
   - Check API responses for 401 status
   - Verify logout API endpoint

### **Debug Commands**
```javascript
// Check authentication state
console.log('Token:', localStorage.getItem('auth_token'));
console.log('User:', localStorage.getItem('auth_user'));

// Clear authentication
localStorage.removeItem('auth_token');
localStorage.removeItem('auth_user');
```

## Best Practices

1. **Always use the auth store** for authentication state
2. **Don't manually manipulate localStorage** - use store methods
3. **Handle API errors gracefully** - especially 401 responses
4. **Test authentication flows** thoroughly
5. **Use route guards** for all protected routes

## Future Enhancements

- [ ] Add refresh token functionality
- [ ] Implement remember me feature
- [ ] Add session timeout warnings
- [ ] Implement role-based route protection
- [ ] Add biometric authentication support 