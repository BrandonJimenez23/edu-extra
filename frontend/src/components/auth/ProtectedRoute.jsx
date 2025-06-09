import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

/**
 * ProtectedRoute Component
 * 
 * Wrapper component that protects routes requiring authentication.
 * Redirects unauthenticated users to login page.
 */
export function ProtectedRoute({ children, requiredRoles = [] }) {
    const { isAuthenticated, hasAnyRole, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-ribbon-500"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Check role-based access if roles are specified
    if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Access Denied
                    </h1>
                    <p className="text-gray-600">
                        You don't have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    return children;
}

/**
 * PublicRoute Component
 * 
 * Wrapper component for public routes (like login) that should
 * redirect authenticated users to dashboard.
 */
export function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-ribbon-500"></div>
            </div>
        );
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated()) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    return children;
}
