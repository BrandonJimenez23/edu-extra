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

export default function UserForm({
    user = null,
    onSubmit = () => {},
    onCancel = () => {},
    loading = false,
    isEditMode = false
}) {
    // Initialize default values
    const defaultValues = user ? apiUserToFormUser(user) : createUserForm();
    
    // Configure React Hook Form with Yup validation
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(userFormSchema(isEditMode)),
        defaultValues,
        mode: 'onChange' // Validate on change for better UX
    });

    const onSubmitForm = async (formData) => {
        try {
            // Convert form data to API format
            const apiData = formUserToApiRequest(formData, isEditMode);
            await onSubmit(apiData);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleReset = () => {
        reset();
        onCancel();
    };

    const roleOptions = ROLE_OPTIONS;

    return (
        <Card 
            title={isEditMode ? 'Editar Usuario' : 'Crear Usuario'}
            subtitle={isEditMode ? 'Actualiza los datos del usuario' : 'Ingresa los datos para crear un nuevo usuario'}
        >
            <Form
                onSubmit={handleSubmit(onSubmitForm)}
                onReset={handleReset}
                loading={loading || isSubmitting}
                submitText={isEditMode ? 'Actualizar' : 'Crear'}
                resetText="Cancelar"
                columns={2}
                spacing="normal"
            >
                {/* Primera columna */}
                <div className="space-y-4">
                    <FormField error={!!errors.fullName}>
                        <Input
                            {...register('fullName')}
                            id="fullName"
                            label="Nombre Completo"
                            placeholder="Ej: Juan Pérez"
                            error={errors.fullName?.message}
                            required
                            size="md"
                        />
                    </FormField>

                    <FormField error={!!errors.email}>
                        <Input
                            {...register('email')}
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="usuario@ejemplo.com"
                            error={errors.email?.message}
                            required
                            size="md"
                        />
                    </FormField>

                    {!isEditMode && (
                        <FormField error={!!errors.password}>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                                label="Contraseña"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                required
                                size="md"
                                helperText="Mínimo 6 caracteres"
                            />
                        </FormField>
                    )}
                </div>

                {/* Segunda columna */}
                <div className="space-y-4">
                    <FormField error={!!errors.role}>
                        <Select
                            {...register('role')}
                            id="role"
                            label="Rol"
                            options={roleOptions}
                            error={errors.role?.message}
                            required
                            size="md"
                            placeholder="Selecciona un rol"
                        />
                    </FormField>

                    <FormField error={!!errors.avatarUrl}>
                        <Input
                            {...register('avatarUrl')}
                            id="avatarUrl"
                            type="url"
                            label="URL del Avatar"
                            placeholder="https://ejemplo.com/avatar.jpg"
                            error={errors.avatarUrl?.message}
                            size="md"
                            helperText="Si no se proporciona, se usará un avatar por defecto"
                        />
                    </FormField>
                </div>
            </Form>
        </Card>
    );
}
