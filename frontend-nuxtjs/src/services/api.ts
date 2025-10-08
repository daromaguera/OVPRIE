// API Service Configuration
// TODO: Confirm API base URL and authentication strategy

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

interface LoginCredentials {
  username: string; // Can be either username or email address
  password: string;
  remember_device?: boolean;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    // ASSUMPTION: Using environment variable for API URL, fallback to localhost
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = localStorage.getItem('auth_token');

      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized - clear auth and redirect to login
        if (response.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/auth';
          return {
            status: 'error',
            message: 'Session expired. Please login again.',
          };
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Helper method to get stored token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Helper method to set token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Helper method to clear token
  clearToken(): void {
    localStorage.removeItem('auth_token');
  }
}

export const apiService = new ApiService();
export type { ApiResponse, LoginCredentials, LoginResponse }; 