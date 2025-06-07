import axiosInstance from './axiosConfig';

/**
 * Authentication API
 * 
 * Handles all authentication-related API calls including login, register,
 * token refresh, and user validation.
 */
class AuthAPI {
    /**
     * Login user with email and password
     * @param {Object} credentials - User login credentials
     * @param {string} credentials.email - User email
     * @param {string} credentials.password - User password
     * @returns {Promise<Object>} Authentication response with tokens and user data
     */
    async login(credentials) {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            console.log('Login response:', response);
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @param {string} userData.name - User full name
     * @param {string} userData.role - User role (ADMIN, TEACHER, STUDENT)
     * @returns {Promise<Object>} Authentication response with tokens and user data
     */
    async register(userData) {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Refresh access token using refresh token
     * @param {Object} tokenData - Refresh token data
     * @param {string} tokenData.refreshToken - Valid refresh token
     * @returns {Promise<Object>} New authentication tokens
     */
    async refreshToken(tokenData) {
        try {
            const response = await axiosInstance.post('/auth/refresh-token', tokenData);
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Validate current authentication token
     * @returns {Promise<Object>} User data if token is valid
     */
    async validateToken() {
        try {
            // This endpoint should be implemented in your backend
            // For now, we'll extract user info from the token or use a profile endpoint
            const response = await axiosInstance.get('/users/profile');
            return response.data;
        } catch (error) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Handle authentication errors with proper formatting
     * @param {Error} error - Axios error object
     * @returns {Error} Formatted error with message
     */
    handleAuthError(error) {
        if (error.response?.data) {
            // Backend returned an error response
            const { status, data } = error.response;

            // Handle different HTTP status codes
            switch (status) {
                case 400:
                    return new Error(data.message || 'Invalid request. Please check your input.');
                case 401:
                    return new Error(data.message || 'Invalid credentials. Please try again.');
                case 403:
                    return new Error(data.message || 'Access denied. Your account may be disabled.');
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
            // Other error
            return new Error(error.message || 'An unexpected error occurred.');
        }
    }
}

// Export singleton instance
const authApi = new AuthAPI();
export default authApi;
