import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../components/contexts/AuthProvider';

/**
 * Custom hook to access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

/**
 * Hook for API interactions with attached authentication tokens
 * Returns an Axios instance with token preconfigured
 */
export const useAuthenticatedApi = () => {
  const { auth, logout } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Attach token to requests
  api.interceptors.request.use((config: any) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });

  // Handle 401 errors globally
  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  return api;
};
