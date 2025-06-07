import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { DataModeProvider } from './contexts/DataModeContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Main App component that provides routing, authentication context, and data mode context
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <BrowserRouter>
      <DataModeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </DataModeProvider>
    </BrowserRouter>
  );
}

export default App;
