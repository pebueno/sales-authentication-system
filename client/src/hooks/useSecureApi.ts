import axios from 'axios';
import { useAuth } from '../components/contexts/AuthContext';

const useAuthentication = () => {
  const { token, logout } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        alert('You do not have permission to perform this action.');
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export default useAuthentication;
