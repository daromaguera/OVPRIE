import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

/**
 * Guard for routes that require authentication
 * Redirects to login if user is not authenticated
 */
export const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  
  if (authStore.getIsAuthenticated) {
    next(); // User is authenticated, allow access
  } else {
    // User is not authenticated, redirect to login
    next({ name: 'Login' });
  }
};

/**
 * Guard for routes that should not be accessible when authenticated
 * Redirects to dashboard if user is already authenticated
 */
export const requireGuest = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  
  if (authStore.getIsAuthenticated) {
    // User is already authenticated, redirect to dashboard
    next({ name: 'Dashboard' });
  } else {
    next(); // User is not authenticated, allow access to auth pages
  }
};

/**
 * Optional auth guard - allows access regardless of auth status
 * Useful for public pages that can be accessed by both guests and authenticated users
 */
export const optionalAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  // Always allow access, regardless of authentication status
  next();
}; 