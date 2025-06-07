import { ArrowLeft, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserForm from "../components/UserForm";
import useUsers from "../../../hooks/useUsers";
import { Button } from "../../../components/ui";

/**
 * CreateUser Page Component
 * 
 * A dedicated page for creating new user accounts in the system.
 * Features a clean, professional layout with navigation and clear instructions.
 */
export default function CreateUser() {
    const { createUser } = useUsers();
    const navigate = useNavigate();

    // Handle successful user creation
    const handleUserCreated = async (userData) => {
        try {
            await createUser(userData);
            // Navigate back to user list after successful creation
            navigate('/users');
        } catch (error) {
            console.error('Failed to create user:', error);
            // Error is already handled by the hook
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Go Back</span>
                </Button>
                
                <div className="border-l border-gray-300 pl-4">
                    <div className="flex items-center space-x-2">
                        <UserPlus className="h-6 w-6 text-blue-ribbon-600" />
                        <h1 className="text-2xl font-heading font-bold text-gray-900">
                            Create New User
                        </h1>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        Add a new user account to the system with their basic information
                    </p>
                </div>
            </div>

            {/* Main Content - UserForm already has its own Card */}
            <UserForm 
                isEditMode={false} 
                onSubmit={handleUserCreated}
            />

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    </div>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Quick Tips:</p>
                        <ul className="space-y-1 text-blue-700">
                            <li>• All fields marked with an asterisk (*) are required</li>
                            <li>• Email addresses must be unique in the system</li>
                            <li>• Users will receive a welcome email with their login credentials</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}