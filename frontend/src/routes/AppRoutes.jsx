import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

// Pages
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/UserList';
import Activities from '../pages/Activities';
import ComponentLibrary from '../pages/ComponentLibrary';
import UserForm from '../features/users/components/UserForm';

// Protected Route wrapper (para futuro uso con autenticación)
const ProtectedRoute = ({ children }) => {
  // Aquí irá la lógica de autenticación en el futuro
  return children;
};

// Layout wrapper para páginas que necesitan el layout principal
const LayoutRoute = ({ children, pageTitle }) => (
  <Layout pageTitle={pageTitle}>
    {children}
  </Layout>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas principales con Layout */}
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
        path="/users" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Gestión de Usuarios">
              <UserList />
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
