import axiosInstance from './axiosConfig';

/**
 * User API
 * 
 * Handles all user-related API calls including CRUD operations,
 * pagination, search, and user management functions.
 */
class UserAPI {
  /**
   * Get all users (simple list)
   * @returns {Promise<Array>} List of all users
   */
  async getUsers() {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Get users with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (0-based)
   * @param {number} params.size - Number of items per page
   * @param {string} params.sortBy - Field to sort by
   * @param {string} params.sortDir - Sort direction (asc/desc)
   * @param {string} params.search - Search term for names
   * @param {string} params.role - Filter by role
   * @returns {Promise<Object>} Paginated response with users
   */
  async getUsersPaginated(params = {}) {
    try {
      const {
        page = 0,
        size = 20,
        sortBy = 'fullName',
        sortDir = 'asc',
        search,
        role
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDir
      });

      if (search) queryParams.append('search', search);
      if (role) queryParams.append('role', role);

      const response = await axiosInstance.get(`/users/paginated?${queryParams}`);
      return response.data;
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Get user by ID
   * @param {number|string} id - User ID
   * @returns {Promise<Object>} User data
   */
  async getUserById(id) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Create new user
   * @param {Object} userData - User data
   * @param {string} userData.fullName - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.role - User's role (ADMIN, TEACHER, STUDENT)
   * @returns {Promise<Object>} Created user data
   */
  async createUser(userData) {
    try {
      if (!userData) {
        throw new Error('User data is required');
      }

      // Validate required fields
      const requiredFields = ['fullName', 'email', 'password', 'role'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Update existing user
   * @param {number|string} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data
   */
  async updateUser(id, userData) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }
      if (!userData) {
        throw new Error('User data is required');
      }

      const response = await axiosInstance.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Delete user permanently
   * @param {number|string} id - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }
      await axiosInstance.delete(`/users/${id}/permanent`);
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Enable user account
   * @param {number|string} id - User ID
   * @returns {Promise<void>}
   */
  async enableUser(id) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }
      await axiosInstance.patch(`/users/${id}/enable`);
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Disable user account
   * @param {number|string} id - User ID
   * @returns {Promise<void>}
   */
  async disableUser(id) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }
      await axiosInstance.patch(`/users/${id}/disable`);
    } catch (error) {
      throw this.handleUserError(error);
    }
  }

  /**
   * Handle user API errors with proper formatting
   * @param {Error} error - Axios error object
   * @returns {Error} Formatted error with message
   */
  handleUserError(error) {
    if (error.response?.data) {
      // Backend returned an error response
      const { status, data } = error.response;
      
      // Handle different HTTP status codes
      switch (status) {
        case 400:
          return new Error(data.message || 'Invalid request. Please check your input.');
        case 401:
          return new Error('You are not authorized to perform this action. Please login again.');
        case 403:
          return new Error('Access denied. You do not have permission to perform this action.');
        case 404:
          return new Error(data.message || 'User not found.');
        case 409:
          return new Error(data.message || 'Email already exists. Please use a different email.');
        case 422:
          return new Error(data.message || 'Validation failed. Please check your input.');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(data.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // Network error
      return new Error('Network error. Please check your connection and try again.');
    } else {
      // Other error (including our custom validation errors)
      return new Error(error.message || 'An unexpected error occurred.');
    }
  }
}

// Export singleton instance
const userApi = new UserAPI();
export default userApi;

// Also export individual methods for backward compatibility
export const getUsers = () => userApi.getUsers();
export const getUsersPaginated = (params) => userApi.getUsersPaginated(params);
export const getUserById = (id) => userApi.getUserById(id);
export const createUser = (userData) => userApi.createUser(userData);
export const updateUser = (id, userData) => userApi.updateUser(id, userData);
export const deleteUser = (id) => userApi.deleteUser(id);
export const enableUser = (id) => userApi.enableUser(id);
export const disableUser = (id) => userApi.disableUser(id);
