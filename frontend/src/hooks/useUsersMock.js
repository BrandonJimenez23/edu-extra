import { useState, useCallback } from "react";
import mockUserService from "../services/mockUserService";
import useApiRequest from "./useApiRequest";

/**
 * Users Mock Hook
 * 
 * Handles all user operations using mock data for development and testing.
 * Provides the same interface as useUsersApi but uses local mock data instead
 * of making real API calls.
 * 
 * Features:
 * - CRUD operations for users (mock data)
 * - Pagination support
 * - Bulk operations
 * - Account enable/disable
 * - User statistics
 * - Mock data reset functionality
 * - Automatic toast notifications
 * - Optimistic UI updates
 * 
 * @returns {Object} Hook object with user operations and state (same as useUsersApi)
 */
export default function useUsersMock() {
    const [users, setUsers] = useState([]);
    const [paginatedData, setPaginatedData] = useState(null);
    
    // Use centralized API request management
    const { 
        loading, 
        error, 
        message, 
        executeRequest, 
        clearError, 
        clearMessage, 
        clearStates 
    } = useApiRequest();

    /**
     * Fetch users with optional pagination
     * @param {Object} params - Query parameters for filtering and pagination
     * @param {number} [params.page] - Page number (0-based)
     * @param {number} [params.size] - Page size
     * @param {string} [params.sort] - Sort criteria
     * @param {string} [params.search] - Search term
     * @returns {Promise<Array|Object>} Promise that resolves with users array or paginated data
     */
    const fetchUsers = useCallback(async (params = {}) => {
        const result = await executeRequest(() => mockUserService.getUsers(params));

        if (result) {
            if (result.content) {
                // Paginated response
                setPaginatedData(result);
                setUsers(result.content);
            } else {
                // Simple array response
                setUsers(result);
                setPaginatedData(null);
            }
        }
        return result;
    }, [executeRequest]);

    /**
     * Get user by ID
     * @param {string|number} id - The user ID to retrieve
     * @returns {Promise<Object>} Promise that resolves with user data
     */
    const getUserById = useCallback(
        async (id) => {
            return await executeRequest(() => mockUserService.getUserById(id));
        },
        [executeRequest]
    );

    /**
     * Create new user
     * @param {Object} userData - User data for creation
     * @param {string} userData.fullName - User's full name
     * @param {string} userData.email - User's email address
     * @param {string} userData.role - User's role (ADMIN, TEACHER, STUDENT, COORDINATOR)
     * @param {boolean} [userData.isActive] - User's active status
     * @returns {Promise<Object>} Promise that resolves with created user data
     */
    const createUser = useCallback(
        async (userData) => {
            const result = await executeRequest(
                () => mockUserService.createUser(userData),
                {
                    success: {
                        title: "Usuario creado",
                        message: `El usuario ${userData.fullName} ha sido creado exitosamente`
                    }
                }
            );

            // Add to local state immediately
            if (result) {
                setUsers((prevUsers) => [...prevUsers, result]);
            }

            return result;
        },
        [executeRequest]
    );

    /**
     * Update existing user
     * @param {string|number} id - The user ID to update
     * @param {Object} userData - Updated user data
     * @param {string} userData.fullName - User's full name
     * @param {string} userData.email - User's email address
     * @param {string} userData.role - User's role
     * @param {boolean} [userData.isActive] - User's active status
     * @returns {Promise<Object>} Promise that resolves with updated user data
     */
    const updateUser = useCallback(
        async (id, userData) => {
            const result = await executeRequest(
                () => mockUserService.updateUser(id, userData),
                {
                    success: {
                        title: "Usuario actualizado",
                        message: `El usuario ${userData.fullName} ha sido actualizado exitosamente`
                    }
                }
            );

            // Update local state optimistically
            if (result) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === id ? result : user))
                );

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
     * @param {string|number} id - The user ID to delete
     * @returns {Promise<void>} Promise that resolves when user is deleted
     */
    const deleteUser = useCallback(
        async (id) => {
            // First get user info for the notification
            const userToDelete = users.find(user => user.id === id);
            const userName = userToDelete 
                ? userToDelete.fullName
                : 'Usuario';

            await executeRequest(
                () => mockUserService.deleteUser(id),
                {
                    success: {
                        title: "Usuario eliminado",
                        message: `${userName} ha sido eliminado exitosamente`
                    }
                }
            );

            // Remove from local state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

            if (paginatedData) {
                setPaginatedData((prevData) => ({
                    ...prevData,
                    content: prevData.content.filter((user) => user.id !== id),
                    totalElements: prevData.totalElements - 1,
                }));
            }
        },
        [executeRequest, paginatedData, users]
    );

    /**
     * Enable user account
     * @param {string|number} id - The user ID to enable
     * @returns {Promise} Promise that resolves with the operation result
     */
    const enableUser = useCallback(
        async (id) => {
            const userToEnable = users.find(user => user.id === id);
            const userName = userToEnable 
                ? userToEnable.fullName 
                : 'Usuario';

            const result = await executeRequest(
                () => mockUserService.enableUser(id),
                {
                    success: {
                        title: "Usuario habilitado",
                        message: `La cuenta de ${userName} ha sido habilitada`
                    }
                }
            );

            // Update local state
            if (result) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => 
                        user.id === id ? { ...user, isActive: true } : user
                    )
                );
            }

            return result;
        },
        [executeRequest, users]
    );

    /**
     * Disable user account
     * @param {string|number} id - The user ID to disable
     * @returns {Promise} Promise that resolves with the operation result
     */
    const disableUser = useCallback(
        async (id) => {
            const userToDisable = users.find(user => user.id === id);
            const userName = userToDisable 
                ? userToDisable.fullName 
                : 'Usuario';

            const result = await executeRequest(
                () => mockUserService.disableUser(id),
                {
                    success: {
                        title: "Usuario deshabilitado",
                        message: `La cuenta de ${userName} ha sido deshabilitada`
                    }
                }
            );

            // Update local state
            if (result) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => 
                        user.id === id ? { ...user, isActive: false } : user
                    )
                );
            }

            return result;
        },
        [executeRequest, users]
    );

    /**
     * Bulk delete users
     * @param {Array<string|number>} userIds - Array of user IDs to delete
     * @returns {Promise<Object>} Promise that resolves with deletion results
     * @returns {Promise<{successful: number, failed: number}>} Results object
     */
    const bulkDeleteUsers = useCallback(
        async (userIds) => {
            try {
                const results = await Promise.allSettled(
                    userIds.map((id) => mockUserService.deleteUser(id))
                );

                const successful = results.filter(
                    (result) => result.status === "fulfilled"
                ).length;
                const failed = results.filter(
                    (result) => result.status === "rejected"
                ).length;

                // Use executeRequest pattern for consistent messaging
                if (successful > 0) {
                    // Remove successful deletions from local state
                    setUsers((prevUsers) => 
                        prevUsers.filter((user) => !userIds.includes(user.id))
                    );
                    
                    await executeRequest(
                        () => Promise.resolve({ successful, failed }),
                        {
                            success: {
                                title: "Eliminación masiva completada",
                                message: `${successful} usuario(s) eliminado(s) exitosamente`
                            }
                        }
                    );
                }

                if (failed > 0) {
                    throw new Error(`Failed to delete ${failed} user(s)`);
                }

                return { successful, failed };
            } catch (error) {
                console.error('Bulk delete error:', error);
                throw error;
            }
        },
        [executeRequest]
    );

    /**
     * Reset mock data to initial state
     * @returns {Promise<Array>} Promise that resolves with reset user data
     */
    const resetMockData = useCallback(async () => {
        const result = await executeRequest(
            () => mockUserService.resetData(),
            {
                success: {
                    title: "Datos reiniciados",
                    message: "Los datos de prueba han sido reiniciados exitosamente"
                }
            }
        );

        if (result) {
            setUsers(result);
            setPaginatedData(null);
        }

        return result;
    }, [executeRequest]);

    /**
     * Get user statistics from mock data
     * @returns {Object} Statistics object with user counts by different criteria
     */
    const getUserStats = useCallback(() => {
        return mockUserService.getUserStats();
    }, []); // ✅ Sin dependencias para evitar bucle infinito

    return {
        // State
        users,
        paginatedData,
        loading,
        error,
        message,

        // Actions
        fetchUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        enableUser,
        disableUser,
        bulkDeleteUsers,

        // Mock-specific actions
        resetMockData,
        getUserStats,

        // Utilities (from useApiRequest)
        clearError,
        clearMessage,
        clearStates,
    };
}
