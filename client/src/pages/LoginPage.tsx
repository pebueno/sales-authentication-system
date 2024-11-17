import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../components/contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid login credentials');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      <button className="link" onClick={handleRegister}>
        Don’t have an account? Register
      </button>
    </div>
  );
};

export default LoginPage;
