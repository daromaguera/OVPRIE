import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService } from '@/services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  full_name: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);

  // Getters
  const getUser = computed(() => user.value);
  const getToken = computed(() => token.value);
  const getIsAuthenticated = computed(() => isAuthenticated.value);

  // Actions
  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken;
        user.value = JSON.parse(storedUser);
        isAuthenticated.value = true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearAuth();
      }
    }
  };

  const setAuth = (newToken: string, newUser: User) => {
    token.value = newToken;
    user.value = newUser;
    isAuthenticated.value = true;
    
    // Store in localStorage
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    
    // Clear from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const logout = async () => {
    try {
      // Call logout API if token exists
      if (token.value) {
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      clearAuth();
    }
  };

  // Initialize auth on store creation
  initializeAuth();

  return {
    // State
    user,
    token,
    isAuthenticated,
    
    // Getters
    getUser,
    getToken,
    getIsAuthenticated,
    
    // Actions
    setAuth,
    clearAuth,
    logout,
    initializeAuth,
  };
}); 