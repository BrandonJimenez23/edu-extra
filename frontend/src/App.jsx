import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { DataModeProvider } from './contexts/DataModeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastContainer } from './components/ui';
import AppRoutes from './routes/AppRoutes';

/**
 * Main App component that provides routing, authentication context, and data mode context
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <DataModeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </DataModeProvider>
        
        {/* Toast container flotando por encima de todo */}
        <ToastContainer />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
