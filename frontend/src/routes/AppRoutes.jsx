import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

// Pages
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/UserList';
import Activities from '../pages/Activities';
import DesignSystem from '../pages/DesginSystem';
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
            <LayoutRoute pageTitle="Actividades">
              <Activities />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/design-system" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Sistema de Diseño">
              <DesignSystem />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas específicas */}
      <Route 
        path="/user-form" 
        element={
          <ProtectedRoute>
            <LayoutRoute pageTitle="Formulario de Usuario">
              <UserForm />
            </LayoutRoute>
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta 404 */}
      <Route 
        path="*" 
        element={
          <LayoutRoute pageTitle="Página no encontrada">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                404 - Página no encontrada
              </h1>
              <p className="text-gray-600">
                La página que buscas no existe.
              </p>
            </div>
          </LayoutRoute>
        } 
      />
    </Routes>
  );
}
