import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useAuth, useAuthenticatedApi } from '../src/hooks/useAuth';
import AuthProvider from '../src/components/contexts/AuthProvider';
import {AuthContextType} from '../src/components/common/types';

jest.mock('axios');

const mockAuthContext: AuthContextType = {
    auth: {
      token: 'mock-token',
      user: { id: 1, name: 'Mock User' },
    },
    login: jest.fn(),
    logout: jest.fn(),
  };
  

describe('useAuth', () => {
  it('throws an error if not wrapped in AuthProvider', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.error).toEqual(
      new Error('useAuth must be used within AuthProvider'),
    );
  });

  it('provides the authentication context when wrapped in AuthProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider value={mockAuthContext}>{children}</AuthProvider>
      );
      

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.auth).toEqual(mockAuthContext.auth);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });
});

describe('useAuthenticatedApi', () => {
  let api: ReturnType<typeof useAuthenticatedApi>;
  beforeEach(() => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider value={mockAuthContext}>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuthenticatedApi(), { wrapper });
    api = result.current;
  });

  it('adds authorization token to requests', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      interceptors: {
        request: { use: jest.fn((callback) => callback({ headers: {} })) },
        response: { use: jest.fn() },
      },
      get: jest.fn(),
    });

    const config = { headers: {} };
    await act(async () => {
      api.interceptors.request.use((config) => config);
    });

    expect(config.headers.Authorization).toBe('Bearer mock-token');
  });

  it('handles 401 errors by logging out and redirecting to /login', async () => {
    const mockLogout = jest.fn();
    mockAuthContext.logout = mockLogout;

    const errorResponse = {
      response: { status: 401 },
    };

    api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );

    await act(async () => {
      try {
        throw errorResponse;
      } catch (error) {
        expect(mockLogout).toHaveBeenCalled();
        expect(window.location.href).toBe('/login');
      }
    });
  });
});
