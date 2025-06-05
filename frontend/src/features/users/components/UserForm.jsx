import { useState } from 'react';
import Form from '../../../components/layouts/Form';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Label from '../../../components/ui/Label';
import Select from '../../../components/ui/Select';

export default function UserForm({
    user = {
        id: '',
        fullName: '',
        email: '',
        role: '',
        password: '',
    },
    onSubmit,
    onCancel,
    loading = false,
    isEditMode = false
}) {
    const [formData, setFormData] = useState(user);
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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre completo es obligatorio';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email no válido';
        }
        
        if (!isEditMode && !formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
        }
        
        if (!formData.role) {
            newErrors.role = 'El rol es obligatorio';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const roleOptions = [
        { value: 'ADMIN', label: 'Administrador' },
        { value: 'INSTRUCTOR', label: 'Instructor' },
        { value: 'COORDINATOR', label: 'Coordinador' },
        { value: 'USER', label: 'Usuario' },
    ];

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
                <div className="mb-4">
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

                <div className="mb-4">
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
                    <div className="mb-4">
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

                <div className="mb-4">
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
            </Form>
        </Card>
    );
}
