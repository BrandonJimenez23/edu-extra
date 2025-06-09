import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Form, FormField, Input, Select } from '../../../components/ui';

// Import user models and validation
import {
  createUserForm,
  apiUserToFormUser,
  formUserToApiRequest,
  ROLE_OPTIONS,
  userFormSchema
} from '../models';

/**
 * UserForm Component
 * 
 * A comprehensive form component for creating and editing user accounts.
 * Features dynamic validation, real-time error handling, and seamless
 * integration with both API and mock data sources.
 * 
 * Key Features:
 * - Dual mode: Create new users or edit existing ones
 * - Real-time validation using Yup schema
 * - Automatic data transformation between form and API formats
 * - Loading states and error handling
 * - Responsive two-column layout
 * - Role-based field visibility (password only for creation)
 * 
 * @param {Object} props - Component props
 * @param {Object|null} props.user - User data for edit mode (null for create mode)
 * @param {Function} props.onSubmit - Callback fired when form is submitted successfully
 * @param {Function} props.onCancel - Callback fired when form is cancelled/reset
 * @param {boolean} props.loading - External loading state (from API operations)
 * @param {boolean} props.isEditMode - Determines if form is in edit mode (affects validation and fields)
 * 
 * @example
 * // Create mode
 * <UserForm 
 *   isEditMode={false}
 *   onSubmit={handleUserCreated}
 *   onCancel={handleCancel}
 *   loading={loading}
 * />
 * 
 * // Edit mode
 * <UserForm 
 *   isEditMode={true}
 *   user={existingUser}
 *   onSubmit={handleUserUpdated}
 *   onCancel={handleCancel}
 *   loading={loading}
 * />
 */
export default function UserForm({
    user = null,
    onSubmit = () => {},
    onCancel = () => {},
    loading = false,
    isEditMode = false
}) {
    // Initialize form with appropriate default values based on mode
    // In edit mode: convert API user data to form format
    // In create mode: use empty form with default values
    const defaultValues = user ? apiUserToFormUser(user) : createUserForm();
    
    // Configure React Hook Form with Yup validation resolver
    // Mode 'onChange' provides real-time validation for better UX
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(userFormSchema(isEditMode)), // Dynamic schema based on mode
        defaultValues,
        mode: 'onChange' // Validate on change for immediate feedback
    });

    /**
     * Handle form submission
     * Transforms form data to API format before calling onSubmit
     * 
     * @param {Object} formData - Raw form data from React Hook Form
     */
    const onSubmitForm = async (formData) => {
        try {
            // Transform form data to API request format
            // This handles field mapping and data normalization
            console.log('Submitting user form with data:', formData);
            const apiData = formUserToApiRequest(formData, isEditMode);
            
            // Call parent component's submit handler
            await onSubmit(apiData);
        } catch (error) {
            console.error('Error submitting user form:', error);
            // Note: Error notifications are handled by the parent component's hooks
        }
    };

    /**
     * Handle form reset/cancellation
     * Resets form to default values and calls onCancel callback
     */
    const handleReset = () => {
        reset(defaultValues); // Reset to original default values
        onCancel();
    };

    // Get role options from constants (ensures consistency across app)
    const roleOptions = ROLE_OPTIONS;

    return (
        <Card 
            title={isEditMode ? 'Edit User' : 'Create User'}
            subtitle={isEditMode ? 'Update user information and settings' : 'Enter the details to create a new user account'}
        >
            <Form
                onSubmit={handleSubmit(onSubmitForm)}
                onReset={handleReset}
                loading={loading || isSubmitting} // Combine external and internal loading states
                submitText={isEditMode ? 'Update User' : 'Create User'}
                resetText="Cancel"
                columns={2} // Two-column responsive layout
                spacing="normal"
            >
                {/* Left Column - Primary Information */}
                <div className="space-y-4">
                    {/* Full Name Field */}
                    <FormField error={!!errors.fullName}>
                        <Input
                            {...register('fullName')}
                            id="fullName"
                            label="Full Name"
                            placeholder="e.g., John Doe"
                            error={errors.fullName?.message}
                            required
                            size="md"
                        />
                    </FormField>

                    {/* Email Field */}
                    <FormField error={!!errors.email}>
                        <Input
                            {...register('email')}
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="user@example.com"
                            error={errors.email?.message}
                            required
                            size="md"
                        />
                    </FormField>

                    {/* Password Field - Only shown in create mode */}
                    {/* In edit mode, password changes are handled separately for security */}
                    {!isEditMode && (
                        <FormField error={!!errors.password}>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                required
                                size="md"
                                helperText="Minimum 6 characters required"
                            />
                        </FormField>
                    )}
                </div>

                {/* Right Column - Additional Information */}
                <div className="space-y-4">
                    {/* Role Selection */}
                    <FormField error={!!errors.role}>
                        <Select
                            {...register('role')}
                            id="role"
                            label="User Role"
                            options={roleOptions}
                            error={errors.role?.message}
                            required
                            size="md"
                            placeholder="Select a role"
                        />
                    </FormField>

                    {/* Avatar URL - Optional field */}
                    <FormField error={!!errors.avatarUrl}>
                        <Input
                            {...register('avatarUrl')}
                            id="avatarUrl"
                            type="url"
                            label="Avatar URL"
                            placeholder="https://example.com/avatar.jpg"
                            error={errors.avatarUrl?.message}
                            size="md"
                            helperText="Optional - A default avatar will be used if not provided"
                        />
                    </FormField>
                </div>
            </Form>
        </Card>
    );
}
