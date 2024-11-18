import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';
import Layout from './components/Layout';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AgentPage = lazy(() => import('./pages/AgentPage'));
const CustomerPage = lazy(() => import('./pages/CustomerPage'));
const NotAuthorized = lazy(() => import('./pages/NotAuthorized'));

const ROLES = {
  Admin: 'admin',
  Agent: 'agent',
  Customer: 'customer',
  Guest: 'guest',
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            {/* Guest-Only Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Guest]} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<NotAuthorized />} />

            {/* Protected Routes */}
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Agent]} />
              }
            >
              <Route path="/agent" element={<AgentPage />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]} />
              }
            >
              <Route path="/customer" element={<CustomerPage />} />
            </Route>

            {/* Redirect invalid paths */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
