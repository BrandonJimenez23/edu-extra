import * as yup from 'yup';
import { USER_ROLES } from './userModels';

/**
 * User Validation Schemas using Yup
 * 
 * These schemas validate user data for forms and API requests.
 * They map to the backend UserRequestDTO validations.
 */

// ===== BASE SCHEMAS =====

const baseUserSchema = {
  fullName: yup
    .string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),

  email: yup
    .string()
    .required('Email is required')
    .email('Email format is not valid')
    .trim()
    .lowercase(),

  role: yup
    .string()
    .required('Role is required')
    .oneOf(Object.values(USER_ROLES), 'Invalid role selected'),

  avatarUrl: yup
    .string()
    .nullable()
    .url('Must be a valid URL')
    .trim()
};

// ===== PASSWORD SCHEMAS =====

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password cannot exceed 100 characters');

const optionalPasswordSchema = yup
  .string()
  .nullable()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password cannot exceed 100 characters');

// ===== MAIN SCHEMAS =====

/**
 * Schema for creating new users
 * Password is required
 */
export const userCreateSchema = yup.object({
  ...baseUserSchema,
  password: passwordSchema
});

/**
 * Schema for updating existing users
 * Password is optional (not included in form)
 */
export const userUpdateSchema = yup.object({
  ...baseUserSchema
  // ✅ NO incluir password en modo update
});

/**
 * Schema for user forms (frontend validation)
 * Includes conditional password validation based on edit mode
 * @param {boolean} isEditMode - Whether the form is in edit mode
 */
export const userFormSchema = (isEditMode = false) => {
  console.log('🔥 Creating userFormSchema with isEditMode:', isEditMode);
  
  const schema = {
    id: yup.string().nullable(),
    ...baseUserSchema
  };
  
  // ✅ SOLO incluir password si NO es modo edición
  if (!isEditMode) {
    schema.password = passwordSchema;;
  } else {;
  }
  
  const finalSchema = yup.object(schema);
  
  return finalSchema;
};

/**
 * Schema for user login
 */
export const userLoginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is not valid')
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required('Password is required')
});

/**
 * Schema for user registration (similar to create but with confirmPassword)
 */
export const userRegisterSchema = yup.object({
  ...baseUserSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

/**
 * Schema for password change
 */
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),

  newPassword: passwordSchema,

  confirmNewPassword: yup
    .string()
    .required('Confirm new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
});

/**
 * Schema for email update (might require password confirmation)
 */
export const emailUpdateSchema = yup.object({
  email: yup
    .string()
    .required('New email is required')
    .email('Email format is not valid')
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required('Password is required to change email')
});

/**
 * Schema for user profile update (basic info only)
 */
export const userProfileSchema = yup.object({
  fullName: baseUserSchema.fullName,
  avatarUrl: baseUserSchema.avatarUrl
});

// ===== VALIDATION HELPERS =====

/**
 * Validate user data against schema
 * @param {Object} data - Data to validate
 * @param {Object} schema - Yup schema to use
 * @param {Object} context - Additional context for validation
 * @returns {Promise<Object>} Validation result
 */
export const validateUserData = async (data, schema, context = {}) => {
  try {
    const validData = await schema.validate(data, {
      abortEarly: false,
      context,
      stripUnknown: true
    });
    
    return {
      isValid: true,
      data: validData,
      errors: {}
    };
  } catch (error) {
    const errors = {};
    
    if (error.inner) {
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
    } else {
      errors.general = error.message;
    }
    
    return {
      isValid: false,
      data: null,
      errors
    };
  }
};

/**
 * Validate single field
 * @param {string} fieldName - Name of the field
 * @param {any} value - Value to validate
 * @param {Object} schema - Yup schema to use
 * @param {Object} context - Additional context
 * @returns {Promise<Object>} Validation result
 */
export const validateField = async (fieldName, value, schema, context = {}) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value }, {
      context,
      stripUnknown: true
    });
    
    return {
      isValid: true,
      error: null
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
};

/**
 * Get schema based on operation type
 * @param {string} operation - Type of operation ('create', 'update', 'form', etc.)
 * @param {boolean} isEditMode - For form operations, whether in edit mode
 * @returns {Object} Yup schema
 */
export const getUserSchema = (operation, isEditMode = false) => {
  switch (operation) {
    case 'create':
      return userCreateSchema;
    case 'update':
      return userUpdateSchema;
    case 'form':
      return userFormSchema(isEditMode);
    case 'login':
      return userLoginSchema;
    case 'register':
      return userRegisterSchema;
    case 'password-change':
      return passwordChangeSchema;
    case 'email-update':
      return emailUpdateSchema;
    case 'profile':
      return userProfileSchema;
    default:
      return userFormSchema(isEditMode);
  }
};
