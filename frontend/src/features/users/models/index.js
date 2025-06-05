/**
 * User Models Index
 * 
 * Central export point for all user-related models, validations, and utilities.
 * This file provides a clean API for importing user models throughout the application.
 */

// Models and data shapes
export {
  USER_ROLES,
  ROLE_OPTIONS,
  ROLE_LABELS,
  createUserResponse,
  createUserRequest,
  createUserForm,
  createUserUpdateRequest,
  apiUserToFormUser,
  formUserToApiRequest,
  getRoleLabel,
  userHasRole,
  isAdmin,
  isInstructor,
  getUserDisplayName,
  formatUserDate,
  isValidEmail,
  validatePassword
} from './userModels';

// Validation schemas
export {
  userCreateSchema,
  userUpdateSchema,
  userFormSchema,
  userLoginSchema,
  userRegisterSchema,
  passwordChangeSchema,
  emailUpdateSchema,
  userProfileSchema,
  validateUserData,
  validateField,
  getUserSchema
} from './userValidation';

// ===== CONVENIENCE EXPORTS =====

/**
 * Most commonly used exports for quick access
 */
export { USER_ROLES as ROLES } from './userModels';
export { userFormSchema as defaultUserSchema } from './userValidation';

/**
 * Default user factory - creates empty user form
 */
export { createUserForm as createEmptyUser } from './userModels';
