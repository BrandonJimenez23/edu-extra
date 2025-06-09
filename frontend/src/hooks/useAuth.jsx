import { useState, useEffect, createContext, useContext } from 'react';
import authApi from '../api/authApi';

// Create Auth Context
const AuthContext = createContext({});

/**
 * Auth Provider Component
 * 
 * Provides authentication state and methods throughout the application.
 * Manages JWT tokens, user session, and automatic token refresh.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (token && refreshToken) {
          // Validate token or refresh if needed
          const userData = await authApi.validateToken();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        // Clear invalid tokens
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login user with email and password
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authApi.login(credentials);
      
      console.log('Login response received:', response);
      
      // Store tokens - backend returns 'token' not 'accessToken'
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Set user data from response
      setUser({
        fullName: response.fullName,
        email: response.email,
        role: response.role
      });
      
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authApi.register(userData);
      
      console.log('Register response received:', response);
      
      // Store tokens - backend returns 'token' not 'accessToken'
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      // Set user data from response
      setUser({
        fullName: response.fullName,
        email: response.email,
        role: response.role
      });
      
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    // Clear tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // Clear user state
    setUser(null);
    setError(null);
  };

  /**
   * Refresh authentication tokens
   */
  const refreshTokens = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authApi.refreshToken({ refreshToken });
      
      console.log('Refresh token response received:', response);
      
      // Update stored tokens - backend returns 'token' not 'accessToken'
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      
      return response;
    } catch (err) {
      // If refresh fails, logout user
      logout();
      throw err;
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('authToken');
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshTokens,
    isAuthenticated,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
