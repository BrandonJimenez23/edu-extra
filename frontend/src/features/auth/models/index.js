/**
 * Authentication Models Index
 * 
 * Central export point for all authentication-related models, validations, and utilities.
 */

// Models and data shapes
export {
  createLoginRequest,
  createRegisterRequest,
  createAuthResponse,
  createAuthUser,
  createAuthState,
  getUserFromToken,
  isTokenExpired,
  getTokenExpiration,
  userHasRole,
  userHasAnyRole,
  getDisplayName,
  isAdmin,
  isInstructor,
  formatAuthError,
  AUTH_STORAGE_KEY,
  saveAuthData,
  getAuthData,
  removeAuthData,
  isAuthenticated
} from './authModels';

// Validation schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  validateAuthData,
  validateAuthField,
  getAuthSchema
} from './authValidation';

// ===== CONVENIENCE EXPORTS =====

/**
 * Most commonly used schemas
 */
export { loginSchema as defaultLoginSchema } from './authValidation';
export { registerSchema as defaultRegisterSchema } from './authValidation';

/**
 * Default factories
 */
export { createLoginRequest as createEmptyLogin } from './authModels';
export { createRegisterRequest as createEmptyRegister } from './authModels';
