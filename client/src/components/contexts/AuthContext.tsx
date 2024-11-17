import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User } from '../common/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token && !user) {
      try {
        const decodedUser: User = jwtDecode<User>(token); // Decode the JWT
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to decode token:', error);
        logout(); // Logout if decoding fails
      }
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { access_token } = await response.json();

    if (!access_token) {
      throw new Error('Access token not found in response');
    }

    try {
      const decodedUser: User = jwtDecode<User>(access_token);
      setUser(decodedUser);
      setToken(access_token);
      localStorage.setItem('token', access_token);
    } catch (error) {
      console.error('Failed to decode token after login:', error);
      throw new Error('Invalid token received from server');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<void> => {
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
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
