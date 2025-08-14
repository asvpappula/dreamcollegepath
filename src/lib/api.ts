const API_BASE_URL = '/api';

interface ApiResponse<T = any> {
  ok?: boolean;
  user?: T;
  error?: string;
  message?: string;
}

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  emailVerified: boolean;
  photoURL?: string;
}

// Generic API request helper
const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Auth API functions
export const authApi = {
  // Upsert user after Firebase authentication
  upsert: async (idToken: string): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/auth/upsert', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  // Get current user
  me: async (): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/auth/me');
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Send password reset email
  reset: async (email: string): Promise<ApiResponse> => {
    return apiRequest('/auth/reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Generic API functions for future use
export const api = {
  get: <T = any>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T = any>(endpoint: string, data?: any) => 
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T = any>(endpoint: string, data?: any) => 
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T = any>(endpoint: string) => 
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

export type { User, ApiResponse };