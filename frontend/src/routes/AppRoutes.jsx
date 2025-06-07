import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

// Auth Components
import Login from '../features/auth/pages/Login';
import { ProtectedRoute, PublicRoute } from '../components/auth/ProtectedRoute';

// Pages
import Dashboard from '../pages/Dashboard';
import UnifiedUserList from '../pages/UnifiedUserList';
import Activities from '../pages/Activities';
import ComponentLibrary from '../pages/ComponentLibrary';
import UserForm from '../features/users/components/UserForm';
import CreateUser from '../features/users/pages/CreateUser';

// Layout wrapper for pages that need the main layout
const LayoutRoute = ({ children, pageTitle }) => (
  <Layout pageTitle={pageTitle}>
    {children}
  </Layout>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      {/* Protected Routes with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Dashboard">
              <Dashboard />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Dashboard">
              <Dashboard />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRoles={['ADMIN']}>
            <LayoutRoute pageTitle="User Management">
              <UnifiedUserList />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/users/create" 
        element={
          <ProtectedRoute requiredRoles={['ADMIN']}>
            <LayoutRoute pageTitle="Create User">
              <CreateUser />
            </LayoutRoute>
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/activities" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Activities">
              <Activities />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/components" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Component Library">
              <ComponentLibrary />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/user-form" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="User Form">
              <UserForm />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route 
        path="*" 
        element={
          <LayoutRoute pageTitle="Page Not Found">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                404 - Page Not Found
              </h1>
              <p className="text-gray-600">
                The page you are looking for does not exist.
              </p>
            </div>
          </LayoutRoute>
        } 
      />
    </Routes>
  );
}
