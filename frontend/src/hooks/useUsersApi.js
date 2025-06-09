import { useState, useCallback } from "react";
import userApi from "../api/userApi";
import useApiRequest from "./useApiRequest";
import { USER_ROLES } from "../features/users/models/userModels";

/**
 * Users API Hook
 * 
 * Handles all user operations using the real API backend.
 * Provides comprehensive user management functionality with automatic
 * toast notifications for success and error states.
 * 
 * Features:
 * - CRUD operations for users
 * - Pagination support
 * - Bulk operations
 * - Account enable/disable
 * - User statistics
 * - Automatic toast notifications
 * - Optimistic UI updates
 * 
 * @returns {Object} Hook object with user operations and state
 */
export default function useUsersApi() {
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
        const result = await executeRequest(() => {
            // If pagination params exist, use paginated endpoint
            if (params.page !== undefined || params.size !== undefined) {
                return userApi.getUsersPaginated(params);
            }
            // Otherwise use simple endpoint
            return userApi.getUsers();
        });

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
            return await executeRequest(() => userApi.getUserById(id));
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
                () => userApi.createUser(userData),
                {
                    success: {
                        title: "Usuario creado",
                        message: `El usuario ${userData.fullName} ha sido creado exitosamente`
                    }
                }
            );

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
                () => userApi.updateUser(id, userData),
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
                () => userApi.deleteUser(id),
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
     * @returns {Promise<void>} Promise that resolves when user is enabled
     */
    const enableUser = useCallback(
        async (id) => {
            const userToEnable = users.find(user => user.id === id);
            const userName = userToEnable 
                ? userToEnable.fullName
                : 'Usuario';

            await executeRequest(
                () => userApi.enableUser(id),
                {
                    success: {
                        title: "Usuario habilitado",
                        message: `La cuenta de ${userName} ha sido habilitada`
                    }
                }
            );
        },
        [executeRequest, users]
    );

    /**
     * Disable user account
     * @param {string|number} id - The user ID to disable
     * @returns {Promise<void>} Promise that resolves when user is disabled
     */
    const disableUser = useCallback(
        async (id) => {
            const userToDisable = users.find(user => user.id === id);
            const userName = userToDisable 
                ? userToDisable.fullName
                : 'Usuario';

            await executeRequest(
                () => userApi.disableUser(id),
                {
                    success: {
                        title: "Usuario deshabilitado",
                        message: `La cuenta de ${userName} ha sido deshabilitada`
                    }
                }
            );
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
                    userIds.map((id) => userApi.deleteUser(id))
                );

                const successful = results.filter(
                    (result) => result.status === "fulfilled"
                ).length;
                const failed = results.filter(
                    (result) => result.status === "rejected"
                ).length;

                // Use executeRequest pattern for consistent messaging
                if (successful > 0) {
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
     * Get user statistics from current users data
     * @returns {Object} Statistics object with user counts by different criteria
     */
    const getUserStats = useCallback(() => {
        const userList = users;
        if (!userList || userList.length === 0) {
            return {
                total: 0,
                active: 0,
                inactive: 0,
                byRole: {
                    [USER_ROLES.ADMIN]: 0,
                    [USER_ROLES.COORDINATOR]: 0,
                    [USER_ROLES.MONITOR]: 0,
                    [USER_ROLES.STUDENT]: 0,
                    [USER_ROLES.NEIGHBOR]: 0
                }
            };
        }
        
        return {
            total: userList.length,
            active: userList.filter(u => u.isActive !== false).length,
            inactive: userList.filter(u => u.isActive === false).length,
            byRole: {
                [USER_ROLES.ADMIN]: userList.filter(u => u.role === USER_ROLES.ADMIN).length,
                [USER_ROLES.COORDINATOR]: userList.filter(u => u.role === USER_ROLES.COORDINATOR).length,
                [USER_ROLES.MONITOR]: userList.filter(u => u.role === USER_ROLES.MONITOR).length,
                [USER_ROLES.STUDENT]: userList.filter(u => u.role === USER_ROLES.STUDENT).length,
                [USER_ROLES.NEIGHBOR]: userList.filter(u => u.role === USER_ROLES.NEIGHBOR).length
            }
        };
    }, [users]);

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

        // Statistics
        getUserStats,

        // Utilities (from useApiRequest)
        clearError,
        clearMessage,
        clearStates,
    };
}
