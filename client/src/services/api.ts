import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Retrieved token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (userData: {
  email: string;
  password: string;
  role?: string;
}) => api.post('/auth/register', userData);

export const getAgents = () => api.get('/agents');

export const getCustomers = () => api.get('/customers');

export const getOrders = (page: number) => api.get(`/orders?page=${page}`);
