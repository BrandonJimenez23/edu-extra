
/**
 * Utility functions for user role and status management
 * 
 * These functions provide consistent styling and display information
 * for user roles and status indicators across the application.
 */

/**
 * Get role information including display name, color, and badge variant
 * @param {string} role - The user role ('admin', 'teacher', 'student', etc.)
 * @returns {object} Role information object
 */
export const getRoleInfo = (role) => {
    const roleMap = {
        admin: {
            label: 'Administrator',
            variant: 'danger',
            color: 'text-red-700 bg-red-100',
            description: 'Full system access and management'
        },
        teacher: {
            label: 'Teacher',
            variant: 'primary',
            color: 'text-blue-700 bg-blue-100',
            description: 'Can manage courses and students'
        },
        student: {
            label: 'Student',
            variant: 'success',
            color: 'text-green-700 bg-green-100',
            description: 'Can access assigned courses'
        },
        coordinator: {
            label: 'Coordinator',
            variant: 'warning',
            color: 'text-orange-700 bg-orange-100',
            description: 'Can coordinate academic programs'
        },
        guest: {
            label: 'Guest',
            variant: 'secondary',
            color: 'text-gray-700 bg-gray-100',
            description: 'Limited access to public content'
        }
    };
    
    return roleMap[role?.toLowerCase()] || {
        label: role || 'Unknown',
        variant: 'secondary',
        color: 'text-gray-700 bg-gray-100',
        description: 'Role not defined'
    };
};

/**
 * Get status information including display name, color, and indicator
 * @param {string} status - The user status ('active', 'inactive', 'pending', etc.)
 * @returns {object} Status information object
 */
export const getStatusInfo = (status) => {
    const statusMap = {
        active: {
            label: 'Active',
            variant: 'success',
            color: 'text-green-700 bg-green-100',
            indicator: 'online',
            description: 'User is active and can access the system'
        },
        inactive: {
            label: 'Inactive',
            variant: 'secondary',
            color: 'text-gray-700 bg-gray-100',
            indicator: 'offline',
            description: 'User account is temporarily disabled'
        },
        pending: {
            label: 'Pending',
            variant: 'warning',
            color: 'text-yellow-700 bg-yellow-100',
            indicator: 'away',
            description: 'User registration is pending approval'
        },
        suspended: {
            label: 'Suspended',
            variant: 'danger',
            color: 'text-red-700 bg-red-100',
            indicator: 'busy',
            description: 'User account has been suspended'
        },
        banned: {
            label: 'Banned',
            variant: 'danger',
            color: 'text-red-900 bg-red-200',
            indicator: 'offline',
            description: 'User has been permanently banned'
        }
    };
    
    return statusMap[status?.toLowerCase()] || {
        label: status || 'Unknown',
        variant: 'secondary',
        color: 'text-gray-700 bg-gray-100',
        indicator: 'offline',
        description: 'Status not defined'
    };
};

/**
 * Generate user initials from full name
 * @param {string} name - Full name (e.g., "John Doe")
 * @returns {string} Initials (e.g., "JD")
 */
export const getUserInitials = (name) => {
    if (!name || typeof name !== 'string') return '?';
    
    return name
        .split(' ')
        .slice(0, 2) // Take first two words
        .map(word => word.charAt(0).toUpperCase())
        .join('');
};

/**
 * Format user display name
 * @param {object} user - User object with firstName, lastName, or name
 * @returns {string} Formatted display name
 */
export const getDisplayName = (user) => {
    if (!user) return 'Unknown User';
    
    // Try different name formats
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }
    
    if (user.name) {
        return user.name;
    }
    
    if (user.firstName) {
        return user.firstName;
    }
    
    if (user.email) {
        return user.email.split('@')[0]; // Use email username as fallback
    }
    
    return 'Unknown User';
};

/**
 * Get user avatar URL with fallback options
 * @param {object} user - User object
 * @returns {string|null} Avatar URL or null for fallback to initials
 */
export const getAvatarUrl = (user) => {
    if (!user) return null;
    
    // Try different avatar properties
    return user.avatar || user.avatarUrl || user.profileImage || user.photo || null;
};

/**
 * Check if user has specific role
 * @param {object} user - User object
 * @param {string|string[]} roles - Role(s) to check
 * @returns {boolean} True if user has the role
 */
export const hasRole = (user, roles) => {
    if (!user || !user.role) return false;
    
    const userRole = user.role.toLowerCase();
    const checkRoles = Array.isArray(roles) ? roles : [roles];
    
    return checkRoles.some(role => role.toLowerCase() === userRole);
};

/**
 * Check if user is active
 * @param {object} user - User object
 * @returns {boolean} True if user is active
 */
export const isUserActive = (user) => {
    if (!user) return false;
    return user.status?.toLowerCase() === 'active';
};

/**
 * Sort users by role priority (admin first, then teacher, etc.)
 * @param {array} users - Array of user objects
 * @returns {array} Sorted users array
 */
export const sortUsersByRole = (users) => {
    const rolePriority = {
        admin: 1,
        coordinator: 2,
        teacher: 3,
        student: 4,
        guest: 5
    };
    
    return [...users].sort((a, b) => {
        const aPriority = rolePriority[a.role?.toLowerCase()] || 999;
        const bPriority = rolePriority[b.role?.toLowerCase()] || 999;
        
        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }
        
        // If same role, sort by name
        const aName = getDisplayName(a);
        const bName = getDisplayName(b);
        return aName.localeCompare(bName);
    });
};
