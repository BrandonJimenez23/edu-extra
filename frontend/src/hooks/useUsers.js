import { useState, useCallback } from "react";
import userApi from "../api/userApi";

/**
 * Custom hook for user management operations
 *
 * Provides comprehensive user management functionality including
 * CRUD operations, pagination, search, and state management.
 */
export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [paginatedData, setPaginatedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Clear message state
     */
    const clearMessage = useCallback(() => {
        setMessage(null);
    }, []);

    /**
     * Clear all states
     */
    const clearStates = useCallback(() => {
        setError(null);
        setMessage(null);
    }, []);

    /**
     * Execute API request with proper error handling and loading states
     */
    const executeRequest = useCallback(async (apiCall, successMessage = null) => {
        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            const result = await apiCall();

            if (successMessage) {
                setMessage(successMessage);
            }

            return result;
        } catch (err) {
            const errorMessage = err.message || "An unexpected error occurred";
            setError(errorMessage);
            throw err; // Re-throw for component handling
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch all users (simple list)
     */
    const fetchUsers = useCallback(async () => {
        const result = await executeRequest(() => userApi.getUsers());
        if (result) {
            setUsers(result);
        }
        return result;
    }, [executeRequest]);

    /**
     * Fetch users with pagination and filters
     */
    const fetchUsersPaginated = useCallback(
        async (params = {}) => {
            const result = await executeRequest(() =>
                userApi.getUsersPaginated(params)
            );
            if (result) {
                setPaginatedData(result);
            }
            return result;
        },
        [executeRequest]
    );

    /**
     * Get user by ID
     */
    const getUserById = useCallback(
        async (id) => {
            return await executeRequest(() => userApi.getUserById(id));
        },
        [executeRequest]
    );

    /**
     * Create new user
     */
    const createUser = useCallback(
        async (userData) => {
            const result = await executeRequest(
                () => userApi.createUser(userData),
                "User created successfully"
            );

            // Refresh users list after creation
            if (result) {
                await fetchUsers();
            }

            return result;
        },
        [executeRequest, fetchUsers]
    );

    /**
     * Update existing user
     */
    const updateUser = useCallback(
        async (id, userData) => {
            const result = await executeRequest(
                () => userApi.updateUser(id, userData),
                "User updated successfully"
            );

            // Update users list after modification
            if (result) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === id ? result : user))
                );

                // Also update paginated data if available
                if (paginatedData) {
                    setPaginatedData((prevData) => ({
                        ...prevData,
                        content: prevData.content.map((user) =>
                            user.id === id ? result : user
                        ),
                    }));
                }
            }

            return result;
        },
        [executeRequest, paginatedData]
    );

    /**
     * Delete user permanently
     */
    const deleteUser = useCallback(
        async (id) => {
            await executeRequest(
                () => userApi.deleteUser(id),
                "User deleted successfully"
            );

            // Remove user from local state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

            // Also update paginated data if available
            if (paginatedData) {
                setPaginatedData((prevData) => ({
                    ...prevData,
                    content: prevData.content.filter((user) => user.id !== id),
                    totalElements: prevData.totalElements - 1,
                }));
            }
        },
        [executeRequest, paginatedData]
    );

    /**
     * Enable user account
     */
    const enableUser = useCallback(
        async (id) => {
            await executeRequest(
                () => userApi.enableUser(id),
                "User enabled successfully"
            );

            // Refresh users list after enabling
            await fetchUsers();
        },
        [executeRequest, fetchUsers]
    );

    /**
     * Disable user account
     */
    const disableUser = useCallback(
        async (id) => {
            await executeRequest(
                () => userApi.disableUser(id),
                "User disabled successfully"
            );

            // Refresh users list after disabling
            await fetchUsers();
        },
        [executeRequest, fetchUsers]
    );

    /**
     * Bulk operations for multiple users
     */
    const bulkDeleteUsers = useCallback(
        async (userIds) => {
            const results = await Promise.allSettled(
                userIds.map((id) => userApi.deleteUser(id))
            );

            const successful = results.filter(
                (result) => result.status === "fulfilled"
            ).length;
            const failed = results.filter(
                (result) => result.status === "rejected"
            ).length;

            if (successful > 0) {
                setMessage(`${successful} user(s) deleted successfully`);
                await fetchUsers(); // Refresh list
            }

            if (failed > 0) {
                setError(`Failed to delete ${failed} user(s)`);
            }

            return { successful, failed };
        },
        [fetchUsers]
    );

    return {
        // State
        users,
        paginatedData,
        loading,
        error,
        message,

        // Actions
        fetchUsers,
        fetchUsersPaginated,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        enableUser,
        disableUser,
        bulkDeleteUsers,

        // Utilities
        clearError,
        clearMessage,
        clearStates,
    };
}
