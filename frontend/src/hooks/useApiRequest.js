import { useState, useCallback } from "react";
import { useNotifications } from "./useNotifications";

/**
 * Universal API Request Hook
 * 
 * Provides standardized loading, error, and message state management
 * for any API request. Handles success messages, error formatting,
 * and provides utilities for state management.
 * 
 * @returns {Object} API request state and utilities
 */
export default function useApiRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { showSuccess, showError, showWarning } = useNotifications();

    /**
     * Execute an API request with proper state management
     * @param {Function} requestFn - Function that returns a Promise (API call)
     * @param {string|Object|null} successMsg - Success message (string) or options object
     * @param {Object} options - Optional configuration object (when successMsg is string)
     * @returns {Promise} The result of the API call
     */
    const executeRequest = useCallback(async (requestFn, successMsg = null, options = {}) => {
        try {
            setLoading(true);
            setError(null);

            const response = await requestFn();

            // Handle success message - support both old and new formats
            if (successMsg) {
                if (typeof successMsg === 'string') {
                    // Old format: executeRequest(fn, "Success message", options)
                    showSuccess(successMsg, options.successTitle || 'Success');
                } else if (typeof successMsg === 'object' && successMsg.success) {
                    // New format: executeRequest(fn, { success: { title, message } })
                    const { title, message } = successMsg.success;
                    showSuccess(message, title);
                }
            }

            // Return the response directly (compatible with existing patterns)
            return response.data || response;
        } catch (err) {
            console.error("API error:", err);

            // Format error message consistently
            const errorMessage = err.response?.data?.message ||
                err.message ||
                "An unexpected error occurred";
            
            setError(errorMessage);

            // Show error toast (configurable)
            const finalOptions = typeof successMsg === 'object' && !successMsg.success ? successMsg : options;
            if (finalOptions.showErrorToast !== false) { // default is true
                showError(
                    errorMessage, 
                    finalOptions.errorTitle || 'Error'
                );
            }

            // Re-throw to allow caller to handle if needed
            throw err;
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError]);

    /**
     * Clear error state  
     */
    const clearError = useCallback(() => setError(null), []);

    return {
        // States
        loading,
        error,

        // Actions
        executeRequest,

        // Utilities
        clearError,
    };
}
