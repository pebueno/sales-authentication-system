import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data.email, data.password);
      console.log('Login response:', response.data);
      const token = response.data.access_token;
      if (!token) {
        throw new Error('Token not found in response');
      }
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
