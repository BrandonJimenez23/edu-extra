import { mockUsers as initialMockUsers } from '../data/mockData';
import { USER_ROLES } from '../features/users/models/userModels';

/**
 * Mock User Service
 * 
 * Provides the same interface as userApi but works with mock data.
 * Handles localStorage persistence and simulates API behavior.
 */
class MockUserService {
    constructor() {
        this.storageKey = 'eduextra-mock-users';
        this.users = this.loadUsers();
    }

    /**
     * Load users from localStorage or use initial data
     */
    loadUsers() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [...initialMockUsers];
        } catch (error) {
            console.warn('Failed to load mock users from localStorage:', error);
            return [...initialMockUsers];
        }
    }

    /**
     * Save users to localStorage
     */
    saveUsers(users = this.users) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            this.users = users;
        } catch (error) {
            console.warn('Failed to save mock users to localStorage:', error);
        }
    }

    /**
     * Simulate API delay
     */
    async delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get users with optional pagination and filters
     */
    async getUsers(params = {}) {
        await this.delay();

        const { page, size, search, role, sortBy = 'fullName', sortDir = 'asc' } = params;

        let filteredUsers = [...this.users];

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                user.fullName?.toLowerCase().includes(searchLower) ||
                user.email?.toLowerCase().includes(searchLower)
            );
        }

        // Apply role filter
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }

        // Apply sorting
        filteredUsers.sort((a, b) => {
            const aValue = a[sortBy] || '';
            const bValue = b[sortBy] || '';
            const comparison = aValue.localeCompare(bValue);
            return sortDir === 'desc' ? -comparison : comparison;
        });

        // If pagination parameters are provided, return paginated response
        if (page !== undefined && size !== undefined) {
            const startIndex = page * size;
            const paginatedUsers = filteredUsers.slice(startIndex, startIndex + size);

            return {
                content: paginatedUsers,
                page,
                size,
                totalElements: filteredUsers.length,
                totalPages: Math.ceil(filteredUsers.length / size),
                first: page === 0,
                last: page >= Math.ceil(filteredUsers.length / size) - 1,
                numberOfElements: paginatedUsers.length
            };
        }

        // Return simple array
        return filteredUsers;
    }

    /**
     * Get user by ID
     */
    async getUserById(id) {
        await this.delay();

        const user = this.users.find(u => u.id === parseInt(id));
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    /**
     * Create new user
     */
    async createUser(userData) {
        await this.delay();

        // Validate required fields
        const requiredFields = ['fullName', 'email', 'password', 'role'];
        const missingFields = requiredFields.filter(field => !userData[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Check for duplicate email
        if (this.users.some(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            ...userData,
            id: Math.max(...this.users.map(u => u.id), 0) + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true
        };

        const updatedUsers = [...this.users, newUser];
        this.saveUsers(updatedUsers);

        return newUser;
    }

    /**
     * Update existing user
     */
    async updateUser(id, userData) {
        await this.delay();

        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Check for duplicate email (excluding current user)
        if (userData.email && 
            this.users.some(u => u.email === userData.email && u.id !== parseInt(id))) {
            throw new Error('Email already exists');
        }

        const updatedUser = {
            ...this.users[userIndex],
            ...userData,
            id: parseInt(id), // Ensure ID remains the same
            updatedAt: new Date().toISOString()
        };

        const updatedUsers = [...this.users];
        updatedUsers[userIndex] = updatedUser;
        this.saveUsers(updatedUsers);

        return updatedUser;
    }

    /**
     * Delete user permanently
     */
    async deleteUser(id) {
        await this.delay();

        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const updatedUsers = this.users.filter(u => u.id !== parseInt(id));
        this.saveUsers(updatedUsers);
        
        return true;
    }

    /**
     * Enable user account
     */
    async enableUser(id) {
        await this.delay();

        return await this.updateUserStatus(id, true);
    }

    /**
     * Disable user account
     */
    async disableUser(id) {
        await this.delay();

        return await this.updateUserStatus(id, false);
    }

    /**
     * Update user status helper
     */
    async updateUserStatus(id, isActive) {
        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const updatedUser = {
            ...this.users[userIndex],
            isActive,
            updatedAt: new Date().toISOString()
        };

        const updatedUsers = [...this.users];
        updatedUsers[userIndex] = updatedUser;
        this.saveUsers(updatedUsers);

        return updatedUser;
    }

    /**
     * Reset mock data to initial state
     */
    async resetData() {
        await this.delay();
        
        const resetUsers = [...initialMockUsers];
        this.saveUsers(resetUsers);
        return resetUsers;
    }

    /**
     * Get user statistics
     * @returns {Object} Statistics object
     */
    getUserStats() {
        const users = this.users; // ✅ Usar la instancia actual, no localStorage
        
        // ✅ Verificar que users sea un array válido
        if (!Array.isArray(users) || users.length === 0) {
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
            total: users.length,
            active: users.filter(u => u.isActive !== false).length,
            inactive: users.filter(u => u.isActive === false).length,
            byRole: {
                [USER_ROLES.ADMIN]: users.filter(u => u.role === USER_ROLES.ADMIN).length,
                [USER_ROLES.COORDINATOR]: users.filter(u => u.role === USER_ROLES.COORDINATOR).length,
                [USER_ROLES.MONITOR]: users.filter(u => u.role === USER_ROLES.MONITOR).length,
                [USER_ROLES.STUDENT]: users.filter(u => u.role === USER_ROLES.STUDENT).length,
                [USER_ROLES.NEIGHBOR]: users.filter(u => u.role === USER_ROLES.NEIGHBOR).length
            }
        };
    }
}

// Export singleton instance
const mockUserService = new MockUserService();
export default mockUserService;
