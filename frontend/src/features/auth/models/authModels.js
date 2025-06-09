/**
 * Authentication Models and Data Shapes
 * 
 * This file contains all the data models and shapes related to authentication.
 * These models map to the backend authentication API responses and requests.
 */

// ===== DATA SHAPES =====

/**
 * Login Request Shape - Maps to LoginRequestDTO from backend
 */
export const createLoginRequest = ({
  email = '',
  password = ''
} = {}) => ({
  email,
  password
});

/**
 * Register Request Shape - Maps to RegisterRequestDTO from backend
 */
export const createRegisterRequest = ({
  fullName = '',
  email = '',
  password = '',
  role = 'STUDENT'
} = {}) => ({
  fullName,
  email,
  password,
  role
});

/**
 * Auth Response Shape - Maps to AuthResponseDTO from backend
 */
export const createAuthResponse = ({
  token = '',
  user = null,
  expiresAt = null
} = {}) => ({
  token,
  user,
  expiresAt
});

/**
 * Auth User Shape - Represents the authenticated user
 */
export const createAuthUser = ({
  id = null,
  fullName = '',
  email = '',
  role = 'USER',
  isActive = true,
  avatarUrl = null
} = {}) => ({
  id,
  fullName,
  email,
  role,
  isActive,
  avatarUrl
});

/**
 * Auth State Shape - For managing authentication state
 */
export const createAuthState = ({
  isAuthenticated = false,
  user = null,
  token = null,
  loading = false,
  error = null
} = {}) => ({
  isAuthenticated,
  user,
  token,
  loading,
  error
});

// ===== HELPER FUNCTIONS =====

/**
 * Extract user data from JWT token payload
 * @param {string} token - JWT token
 * @returns {Object|null} User data or null if invalid
 */
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return createAuthUser({
      id: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role
    });
  } catch (err) {
    console.error('Error parsing token:', err);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * Get token expiration date
 * @param {string} token - JWT token
 * @returns {Date|null}
 */
export const getTokenExpiration = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
};

/**
 * Check if user has specific role
 * @param {Object} user - Auth user object
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const userHasRole = (user, role) => {
  return user?.role === role;
};

/**
 * Check if user has any of the specified roles
 * @param {Object} user - Auth user object
 * @param {Array} roles - Array of roles to check
 * @returns {boolean}
 */
export const userHasAnyRole = (user, roles) => {
  return roles.some(role => userHasRole(user, role));
};

/**
 * Get display name for user
 * @param {Object} user - Auth user object
 * @returns {string}
 */
export const getDisplayName = (user) => {
  return user?.fullName || user?.email || 'Usuario';
};

/**
 * Check if user is admin
 * @param {Object} user - Auth user object
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return userHasRole(user, 'ADMIN');
};

/**
 * Check if user is instructor
 * @param {Object} user - Auth user object
 * @returns {boolean}
 */
export const isInstructor = (user) => {
  return userHasRole(user, 'INSTRUCTOR');
};

/**
 * Format auth error message
 * @param {Error|string} error - Error object or message
 * @returns {string}
 */
export const formatAuthError = (error) => {
  if (typeof error === 'string') return error;
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Ha ocurrido un error de autenticación';
};

// ===== STORAGE HELPERS =====

export const AUTH_STORAGE_KEY = 'edu_extra_auth';

/**
 * Save auth data to localStorage
 * @param {Object} authData - Auth data to save
 */
export const saveAuthData = (authData) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  } catch (err) {
    console.error('Error saving auth data:', err);
  }
};

/**
 * Get auth data from localStorage
 * @returns {Object|null}
 */
export const getAuthData = () => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting auth data:', err);
    return null;
  }
};

/**
 * Remove auth data from localStorage
 */
export const removeAuthData = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Error removing auth data:', err);
  }
};

/**
 * Check if user is authenticated based on stored data
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const authData = getAuthData();
  if (!authData?.token) return false;
  
  return !isTokenExpired(authData.token);
};
