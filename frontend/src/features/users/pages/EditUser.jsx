import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";

/**
 * EditUser component for editing user details.
 * Handles loading states, error states, and user data fetching.
 */
export default function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    
    // Get user operations and state from the unified hook
    const { 
        updateUser, 
        getUserById,
        loading,
        clearError 
    } = useUsers();
    
    // Local state for user data and loading
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [userError, setUserError] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoadingUser(true);
                setUserError(null);
                
                const userData = await getUserById(userId);
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user:', err);
                setUserError('Could not load user data');
            } finally {
                setIsLoadingUser(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId, getUserById]);

    const handleUserUpdated = async (userData) => {
        try {
            // Call the update user function from the hook
            // The loading state is automatically managed by useApiRequest
            await updateUser(userId, userData);
            
            // Navigate back to user list after successful update
            navigate('/users');
        } catch (error) {
            // Error handling is done automatically by useApiRequest
            // The error toast is already shown, just log for debugging
            console.error('Failed to update user:', error);
        }
    };

    const handleCancel = () => {
        // Clear any errors before navigating
        clearError();
        navigate('/users');
    };

    // Show loading state while fetching user
    if (isLoadingUser) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    // Show error state if user couldn't be loaded
    if (userError || !user) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center space-y-4">
                    <div className="text-red-600 text-lg font-semibold">
                        {userError || 'User not found'}
                    </div>
                    <button
                        onClick={() => navigate('/users')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <UserForm
            isEditMode={true}
            user={user}
            onSubmit={handleUserUpdated}
            onCancel={handleCancel}
            loading={loading}
        />
    );
}