import React, { createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User, RegisterUserData } from '../common/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ user: User | null; token: string | null }>(
    () => {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        // Ensure user role defaults to "guest" if undefined
        if (parsedAuth.user) {
          parsedAuth.user.role = parsedAuth.user.role || 'guest';
        }
        return parsedAuth;
      }
      return { user: null, token: null };
    },
  );

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      console.error('Login failed');
      throw new Error('Login failed');
    }

    const { access_token: accessToken } = await response.json();

    if (!accessToken) {
      console.error('Access token not found in response');
      throw new Error('Invalid response format');
    }

    try {
      const decodedUser = jwtDecode(accessToken) as User;
      // Default the role to "guest" if it is not provided
      const userWithRole = {
        ...decodedUser,
        role: decodedUser.role || 'guest',
      };
      const newAuth = { user: userWithRole, token: accessToken };
      setAuth(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth)); // Store both user and token in auth key
    } catch (error) {
      console.error('Failed to decode token:', error);
      throw new Error('Invalid token received from server');
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('auth');
  };

  const register = async (userData: RegisterUserData) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      },
    );

    if (!response.ok) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
