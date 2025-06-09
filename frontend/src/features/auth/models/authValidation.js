import * as yup from 'yup';

/**
 * Authentication Validation Schemas using Yup
 * 
 * These schemas validate authentication data for forms and API requests.
 */

// ===== BASE SCHEMAS =====

const emailSchema = yup
  .string()
  .required('El email es obligatorio')
  .email('El formato del email no es válido')
  .trim()
  .lowercase();

const passwordSchema = yup
  .string()
  .required('La contraseña es obligatoria')
  .min(6, 'La contraseña debe tener al menos 6 caracteres');

const nameSchema = yup
  .string()
  .required('El nombre completo es obligatorio')
  .min(2, 'El nombre debe tener al menos 2 caracteres')
  .max(100, 'El nombre no puede exceder 100 caracteres')
  .trim();

const roleSchema = yup
  .string()
  .required('El rol es obligatorio')
  .oneOf(['ADMIN', 'INSTRUCTOR', 'COORDINATOR', 'USER'], 'Rol no válido');

// ===== MAIN SCHEMAS =====

/**
 * Schema for user login
 */
export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema
});

/**
 * Schema for user registration
 */
export const registerSchema = yup.object({
  fullName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirme la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  role: roleSchema
});

/**
 * Schema for forgot password
 */
export const forgotPasswordSchema = yup.object({
  email: emailSchema
});

/**
 * Schema for reset password
 */
export const resetPasswordSchema = yup.object({
  token: yup
    .string()
    .required('Token de reseteo requerido'),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirme la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

/**
 * Schema for change password (when authenticated)
 */
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('La contraseña actual es obligatoria'),
  newPassword: passwordSchema,
  confirmNewPassword: yup
    .string()
    .required('Confirme la nueva contraseña')
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
});

// ===== VALIDATION HELPERS =====

/**
 * Validate authentication data against schema
 * @param {Object} data - Data to validate
 * @param {Object} schema - Yup schema to use
 * @returns {Promise<Object>} Validation result
 */
export const validateAuthData = async (data, schema) => {
  try {
    const validData = await schema.validate(data, {
      abortEarly: false,
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
 * @returns {Promise<Object>} Validation result
 */
export const validateAuthField = async (fieldName, value, schema) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value }, {
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
 * Get schema based on auth operation type
 * @param {string} operation - Type of operation
 * @returns {Object} Yup schema
 */
export const getAuthSchema = (operation) => {
  switch (operation) {
    case 'login':
      return loginSchema;
    case 'register':
      return registerSchema;
    case 'forgot-password':
      return forgotPasswordSchema;
    case 'reset-password':
      return resetPasswordSchema;
    case 'change-password':
      return changePasswordSchema;
    default:
      return loginSchema;
  }
};
