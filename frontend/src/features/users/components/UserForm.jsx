import { useState } from 'react';
import Form from '../../../components/layouts/Form';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Label from '../../../components/ui/Label';
import Select from '../../../components/ui/Select';

// Import user models and validation
import {
  createUserForm,
  apiUserToFormUser,
  formUserToApiRequest,
  ROLE_OPTIONS,
  validateUserData,
  userFormSchema
} from '../models';

export default function UserForm({
    user = null,
    onSubmit = () => {},
    onCancel = () => {},
    loading = false,
    isEditMode = false
}) {
    // Initialize form with user data or empty form
    const [formData, setFormData] = useState(() => {
        if (user) {
            return apiUserToFormUser(user);
        }
        return createUserForm();
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Limpiar error al cambiar el valor
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = async () => {
        const result = await validateUserData(
            formData, 
            userFormSchema, 
            { isEditMode }
        );
        
        if (!result.isValid) {
            setErrors(result.errors);
            return false;
        }
        
        setErrors({});
        return true;
    };

    const handleSubmit = async () => {
        if (await validateForm()) {
            // Convert form data to API format
            const apiData = formUserToApiRequest(formData, isEditMode);
            onSubmit(apiData);
        }
    };

    const roleOptions = ROLE_OPTIONS;

    return (
        <Card 
            title={isEditMode ? 'Editar Usuario' : 'Crear Usuario'}
            subtitle={isEditMode ? 'Actualiza los datos del usuario' : 'Ingresa los datos para crear un nuevo usuario'}
        >
            <Form
                onSubmit={handleSubmit}
                onReset={onCancel}
                loading={loading}
                submitText={isEditMode ? 'Actualizar' : 'Crear'}
                resetText="Cancelar"
                columns={2}
            >
                {/* Primera columna */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="fullName" required>Nombre Completo</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Ej: Juan Pérez"
                            error={errors.fullName}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" required>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="usuario@ejemplo.com"
                            error={errors.email}
                            required
                        />
                    </div>

                    {!isEditMode && (
                        <div>
                            <Label htmlFor="password" required>Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                error={errors.password}
                                required={!isEditMode}
                            />
                        </div>
                    )}
                </div>

                {/* Segunda columna */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="role" required>Rol</Label>
                        <Select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={roleOptions}
                            error={errors.role}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="avatarUrl">URL del Avatar</Label>
                        <Input
                            id="avatarUrl"
                            name="avatarUrl"
                            type="url"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/avatar.jpg (opcional)"
                            error={errors.avatarUrl}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Si no se proporciona, se usará un avatar por defecto
                        </p>
                    </div>
                </div>
            </Form>
        </Card>
    );
}
