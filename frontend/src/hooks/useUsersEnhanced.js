import { useState, useCallback } from 'react';
import userApi from '../api/userApi';
import { mockUsers as initialMockUsers } from '../data/mockData';
import { useDataMode } from './useDataMode';

/**
 * Enhanced Users Hook
 * 
 * Manages user state and operations with support for both mock data and real API calls.
 * Automatically switches between data sources based on the global data mode.
 * 
 * Mock Mode Improvements:
 * - Maintains state in component for session persistence
 * - Local storage option for cross-session persistence
 * - Clear separation between mock and real data operations
 */
export default function useUsersEnhanced() {
    const [users, setUsers] = useState([]);
    const [mockUsers, setMockUsers] = useState(() => {
        // Try to load from localStorage first, fallback to initial data
        const saved = localStorage.getItem('eduextra-mock-users');
        return saved ? JSON.parse(saved) : [...initialMockUsers];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 20,
        totalElements: 0,
        totalPages: 0
    });

    const { useMockData } = useDataMode();

    /**
     * Save mock users to localStorage for persistence
     */
    const saveMockUsersToStorage = useCallback((updatedUsers) => {
        try {
            localStorage.setItem('eduextra-mock-users', JSON.stringify(updatedUsers));
        } catch (error) {
            console.warn('Failed to save mock users to localStorage:', error);
        }
    }, []);

    /**
     * Reset mock data to initial state
     */
    const resetMockData = useCallback(() => {
        const resetUsers = [...initialMockUsers];
        setMockUsers(resetUsers);
        saveMockUsersToStorage(resetUsers);
        if (useMockData) {
            setUsers(resetUsers);
        }
    }, [useMockData, saveMockUsersToStorage]);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Fetch users with pagination support
     * @param {Object} params - Query parameters
     */
    const fetchUsers = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                // Mock data simulation with state management
                const { page = 0, size = 20, search, role } = params;
                let filteredUsers = [...mockUsers];

                // Apply filters
                if (search) {
                    filteredUsers = filteredUsers.filter(user =>
                        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                        user.email?.toLowerCase().includes(search.toLowerCase())
                    );
                }

                if (role) {
                    filteredUsers = filteredUsers.filter(user => user.role === role);
                }

                // Apply pagination
                const startIndex = page * size;
                const paginatedUsers = filteredUsers.slice(startIndex, startIndex + size);

                setUsers(paginatedUsers);
                setPagination({
                    page,
                    size,
                    totalElements: filteredUsers.length,
                    totalPages: Math.ceil(filteredUsers.length / size)
                });

                return paginatedUsers;
            } else {
                // Real API call
                if (Object.keys(params).length > 0) {
                    // Use paginated endpoint with filters
                    const response = await userApi.getUsersPaginated(params);
                    setUsers(response.content || []);
                    setPagination({
                        page: response.page || 0,
                        size: response.size || 20,
                        totalElements: response.totalElements || 0,
                        totalPages: response.totalPages || 0
                    });
                    return response.content || [];
                } else {
                    // Use simple endpoint
                    const response = await userApi.getUsers();
                    setUsers(response);
                    setPagination({
                        page: 0,
                        size: response.length,
                        totalElements: response.length,
                        totalPages: 1
                    });
                    return response;
                }
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers]);

    /**
     * Get user by ID
     * @param {number|string} id - User ID
     */
    const getUserById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                const user = mockUsers.find(u => u.id === parseInt(id));
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } else {
                return await userApi.getUserById(id);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers]);

    /**
     * Create new user
     * @param {Object} userData - User data
     */
    const createUser = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                // Simulate user creation with persistent mock data
                const newUser = {
                    ...userData,
                    id: Math.max(...mockUsers.map(u => u.id), 0) + 1,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: true
                };

                const updatedUsers = [...mockUsers, newUser];
                setMockUsers(updatedUsers);
                saveMockUsersToStorage(updatedUsers);

                // Update current users list if displaying all users
                setUsers(prev => [...prev, newUser]);

                return newUser;
            } else {
                const response = await userApi.createUser(userData);
                return response;
            }
        } catch (err) {
            setError(err.message || 'Failed to create user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers, saveMockUsersToStorage]);

    /**
     * Update existing user
     * @param {number|string} id - User ID
     * @param {Object} userData - Updated user data
     */
    const updateUser = useCallback(async (id, userData) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error('User not found');
                }

                const updatedUser = {
                    ...mockUsers[userIndex],
                    ...userData,
                    id: parseInt(id), // Ensure ID remains the same
                    updatedAt: new Date().toISOString()
                };

                const updatedUsers = [...mockUsers];
                updatedUsers[userIndex] = updatedUser;

                setMockUsers(updatedUsers);
                saveMockUsersToStorage(updatedUsers);

                // Update current users list
                setUsers(prev => prev.map(u => u.id === parseInt(id) ? updatedUser : u));

                return updatedUser;
            } else {
                const response = await userApi.updateUser(id, userData);
                return response;
            }
        } catch (err) {
            setError(err.message || 'Failed to update user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers, saveMockUsersToStorage]);

    /**
     * Delete user
     * @param {number|string} id - User ID
     */
    const deleteUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error('User not found');
                }

                const updatedUsers = mockUsers.filter(u => u.id !== parseInt(id));
                setMockUsers(updatedUsers);
                saveMockUsersToStorage(updatedUsers);

                // Update current users list
                setUsers(prev => prev.filter(u => u.id !== parseInt(id)));

                return true;
            } else {
                await userApi.deleteUser(id);
                return true;
            }
        } catch (err) {
            setError(err.message || 'Failed to delete user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers, saveMockUsersToStorage]);

    /**
     * Enable user account
     * @param {number|string} id - User ID
     */
    const enableUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error('User not found');
                }

                const updatedUser = {
                    ...mockUsers[userIndex],
                    isActive: true,
                    updatedAt: new Date().toISOString()
                };

                const updatedUsers = [...mockUsers];
                updatedUsers[userIndex] = updatedUser;

                setMockUsers(updatedUsers);
                saveMockUsersToStorage(updatedUsers);

                // Update current users list
                setUsers(prev => prev.map(u => u.id === parseInt(id) ? updatedUser : u));

                return updatedUser;
            } else {
                await userApi.enableUser(id);
                return true;
            }
        } catch (err) {
            setError(err.message || 'Failed to enable user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers, saveMockUsersToStorage]);

    /**
     * Disable user account
     * @param {number|string} id - User ID
     */
    const disableUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);

            if (useMockData) {
                const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error('User not found');
                }

                const updatedUser = {
                    ...mockUsers[userIndex],
                    isActive: false,
                    updatedAt: new Date().toISOString()
                };

                const updatedUsers = [...mockUsers];
                updatedUsers[userIndex] = updatedUser;

                setMockUsers(updatedUsers);
                saveMockUsersToStorage(updatedUsers);

                // Update current users list
                setUsers(prev => prev.map(u => u.id === parseInt(id) ? updatedUser : u));

                return updatedUser;
            } else {
                await userApi.disableUser(id);
                return true;
            }
        } catch (err) {
            setError(err.message || 'Failed to disable user');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [useMockData, mockUsers, saveMockUsersToStorage]);

    /**
     * Get user statistics
     */
    const getUserStats = useCallback(() => {
        const userList = useMockData ? mockUsers : users;

        return {
            total: userList.length,
            active: userList.filter(u => u.isActive).length,
            inactive: userList.filter(u => !u.isActive).length,
            byRole: {
                admin: userList.filter(u => u.role === 'ADMIN').length,
                teacher: userList.filter(u => u.role === 'TEACHER').length,
                student: userList.filter(u => u.role === 'STUDENT').length,
                coordinator: userList.filter(u => u.role === 'COORDINATOR').length
            }
        };
    }, [users, useMockData, mockUsers]);

    return {
        // State
        users,
        loading,
        error,
        pagination,

        // Actions
        fetchUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        enableUser,
        disableUser,
        getUserStats,
        clearError,

        // Mock data management
        resetMockData,

        // Metadata
        useMockData,
        totalMockUsers: mockUsers.length
    };
}
