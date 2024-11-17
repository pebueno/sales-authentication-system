import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from './components/contexts/AuthContext';
import Loader from './components/Loader';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AgentPage = lazy(() => import('./pages/AgentPage'));
const CustomerPage = lazy(() => import('./pages/CustomerPage'));

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getRoleRedirect = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/agent'; // Default page for admins (can navigate to others)
      case 'agent':
        return '/agent';
      case 'customer':
        return '/customer';
      case 'guest':
        return '/login';
      default:
        return '/login';
    }
  };

  const ProtectedRoute = ({
    children,
    roles,
  }: {
    children: React.ReactNode;
    roles: string[];
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (!roles.includes(user?.role || '')) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? getRoleRedirect() : '/login'} />
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/agent"
            element={
              <ProtectedRoute roles={['admin', 'agent']}>
                <AgentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute roles={['admin', 'customer']}>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
