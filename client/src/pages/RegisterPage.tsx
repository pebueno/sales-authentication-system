import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterUserData } from '../components/common/types';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterUserData) => {
    try {
      await register(data);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
      console.error('Error during registration:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/login');
  };

  return <RegisterForm onSubmit={handleRegister} onGoBack={handleGoBack} />;
};

export default RegisterPage;
