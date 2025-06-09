/**
 * User Models and Data Shapes
 * 
 * This file contains all the data models, shapes, and constants related to User entity.
 * These models map to the backend API responses and requests.
 */

// ===== CONSTANTS =====

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  COORDINATOR: 'COORDINATOR',
  MONITOR: 'MONITOR',
  STUDENT: 'STUDENT',
  NEIGHBOR: 'NEIGHBOR'
};

export const ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: 'Administrador' },
  { value: USER_ROLES.COORDINATOR, label: 'Coordinador' },
  { value: USER_ROLES.MONITOR, label: 'Monitor' },
  { value: USER_ROLES.STUDENT, label: 'Estudiante' },
  { value: USER_ROLES.NEIGHBOR, label: 'Vecino' }
];

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.COORDINATOR]: 'Coordinador',
  [USER_ROLES.MONITOR]: 'Monitor',
  [USER_ROLES.STUDENT]: 'Estudiante',
  [USER_ROLES.NEIGHBOR]: 'Vecino'
};

// ===== DATA SHAPES =====

/**
 * User Response Shape - Maps to UserResponseDTO from backend
 * Used when receiving user data from API
 */
export const createUserResponse = ({
  id = null,
  fullName = '',
  email = '',
  role = USER_ROLES.STUDENT,
  isActive = true,
  avatarUrl = null,
  createdAt = null,
  updatedAt = null
} = {}) => ({
  id,
  fullName,
  email,
  role,
  isActive,
  avatarUrl,
  createdAt,
  updatedAt
});

/**
 * User Request Shape - Maps to UserRequestDTO from backend
 * Used when sending user data to API for creation/update
 */
export const createUserRequest = ({
  fullName = '',
  email = '',
  password = '',
  role = USER_ROLES.STUDENT,
  avatarUrl = null
} = {}) => ({
  fullName,
  email,
  password,
  role,
  avatarUrl
});

/**
 * User Form Shape - Used in frontend forms
 * Includes validation states and UI-specific fields
 */
export const createUserForm = ({
  id = '',
  fullName = '',
  email = '',
  password = '',
  role = USER_ROLES.STUDENT,
  avatarUrl = ''
} = {}) => ({
  id,
  fullName,
  email,
  password,
  role,
  avatarUrl
});

/**
 * User Update Request Shape - Used for updating existing users
 * Password is optional for updates
 */
export const createUserUpdateRequest = ({
  fullName = '',
  email = '',
  role = USER_ROLES.STUDENT,
  avatarUrl = null,
  password = null
} = {}) => {
  const request = {
    fullName,
    email,
    role,
    avatarUrl
  };

  // Only include password if provided
  if (password && password.trim() !== '') {
    request.password = password;
  }

  return request;
};

// ===== HELPER FUNCTIONS =====

/**
 * Convert API response to form data
 * @param {Object} apiUser - User object from API
 * @returns {Object} Form-ready user object
 */
export const apiUserToFormUser = (apiUser) => {
  if (!apiUser) return createUserForm();
  
  return createUserForm({
    id: apiUser.id || '',
    fullName: apiUser.fullName || '',
    email: apiUser.email || '',
    role: apiUser.role || USER_ROLES.USER,
    avatarUrl: apiUser.avatarUrl || '',
    password: '' // Always empty for security
  });
};

/**
 * Convert form data to API request
 * @param {Object} formUser - User object from form
 * @param {boolean} isEdit - Whether this is an edit operation
 * @returns {Object} API-ready user object
 */
export const formUserToApiRequest = (formUser, isEdit = false) => {
  if (isEdit) {
    return createUserUpdateRequest({
      fullName: formUser.fullName?.trim(),
      email: formUser.email?.trim(),
      role: formUser.role,
      avatarUrl: formUser.avatarUrl?.trim() || null,
      password: formUser.password?.trim() || null
    });
  }
  
  return createUserRequest({
    fullName: formUser.fullName?.trim(),
    email: formUser.email?.trim(),
    password: formUser.password?.trim(),
    role: formUser.role,
    avatarUrl: formUser.avatarUrl?.trim() || null
  });
};

/**
 * Get role label by role value
 * @param {string} role - Role value
 * @returns {string} Role label
 */
export const getRoleLabel = (role) => {
  return ROLE_LABELS[role] || role;
};

/**
 * Check if user has specific role
 * @param {Object} user - User object
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const userHasRole = (user, role) => {
  return user?.role === role;
};

/**
 * Check if user is admin
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return userHasRole(user, USER_ROLES.ADMIN);
};

/**
 * Check if user is instructor
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const isInstructor = (user) => {
  return userHasRole(user, USER_ROLES.INSTRUCTOR);
};

/**
 * Get user display name
 * @param {Object} user - User object
 * @returns {string} Display name
 */
export const getUserDisplayName = (user) => {
  return user?.fullName || user?.email || 'Usuario';
};

/**
 * Format user creation date
 * @param {string} createdAt - ISO date string
 * @returns {string} Formatted date
 */
export const formatUserDate = (createdAt) => {
  if (!createdAt) return 'N/A';
  
  try {
    return new Date(createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Fecha inválida';
  }
};

// ===== VALIDATION HELPERS =====

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    errors: []
  };

  if (!password || password.length < 6) {
    result.isValid = false;
    result.errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    result.errors.push('Debe contener al menos una letra minúscula');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    result.errors.push('Debe contener al menos una letra mayúscula');
  }

  if (!/(?=.*\d)/.test(password)) {
    result.errors.push('Debe contener al menos un número');
  }

  if (result.errors.length > 0) {
    result.isValid = false;
  }

  return result;
};
