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
    .required('El nombre completo es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),

  email: yup
    .string()
    .required('El email es obligatorio')
    .email('El formato del email no es válido')
    .trim()
    .lowercase(),

  role: yup
    .string()
    .required('El rol es obligatorio')
    .oneOf(Object.values(USER_ROLES), 'Rol no válido'),

  avatarUrl: yup
    .string()
    .nullable()
    .url('Debe ser una URL válida')
    .trim()
};

// ===== PASSWORD SCHEMAS =====

const passwordSchema = yup
  .string()
  .required('La contraseña es obligatoria')
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .max(100, 'La contraseña no puede exceder 100 caracteres');

const optionalPasswordSchema = yup
  .string()
  .nullable()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .max(100, 'La contraseña no puede exceder 100 caracteres');

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
 * Password is optional
 */
export const userUpdateSchema = yup.object({
  ...baseUserSchema,
  password: optionalPasswordSchema
});

/**
 * Schema for user forms (frontend validation)
 * Includes conditional password validation based on edit mode
 */
export const userFormSchema = yup.object({
  id: yup.string().nullable(),
  ...baseUserSchema,
  password: yup
    .string()
    .when('$isEditMode', {
      is: false,
      then: (schema) => passwordSchema,
      otherwise: (schema) => optionalPasswordSchema
    })
});

/**
 * Schema for user login
 */
export const userLoginSchema = yup.object({
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('El formato del email no es válido')
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
});

/**
 * Schema for user registration (similar to create but with confirmPassword)
 */
export const userRegisterSchema = yup.object({
  ...baseUserSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirme la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

/**
 * Schema for password change
 */
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .required('La contraseña actual es obligatoria'),

  newPassword: passwordSchema,

  confirmNewPassword: yup
    .string()
    .required('Confirme la nueva contraseña')
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
});

/**
 * Schema for email update (might require password confirmation)
 */
export const emailUpdateSchema = yup.object({
  email: yup
    .string()
    .required('El nuevo email es obligatorio')
    .email('El formato del email no es válido')
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required('La contraseña es obligatoria para cambiar el email')
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
 * @returns {Object} Yup schema
 */
export const getUserSchema = (operation) => {
  switch (operation) {
    case 'create':
      return userCreateSchema;
    case 'update':
      return userUpdateSchema;
    case 'form':
      return userFormSchema;
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
      return userFormSchema;
  }
};
