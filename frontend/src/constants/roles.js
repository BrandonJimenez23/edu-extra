// Roles de usuario
export const USER_ROLES = {
    ADMIN: 'ADMIN',
    INSTRUCTOR: 'INSTRUCTOR',
    COORDINATOR: 'COORDINATOR',
    USER: 'USER',
    STUDENT: 'STUDENT',
    MONITOR: 'MONITOR'
};

// Opciones para selects de roles
export const roleOptions = [
    { value: USER_ROLES.ADMIN, label: 'Administrador' },
    { value: USER_ROLES.INSTRUCTOR, label: 'Instructor' },
    { value: USER_ROLES.COORDINATOR, label: 'Coordinador' },
    { value: USER_ROLES.USER, label: 'Usuario' },
];

// Función para obtener clases de badge según el rol
export function getRoleBadgeClass(role) {
    switch (role) {
        case USER_ROLES.ADMIN:
            return 'bg-blue-ribbon-100 text-blue-ribbon-800';
        case USER_ROLES.INSTRUCTOR:
            return 'bg-emerald-100 text-emerald-800';
        case USER_ROLES.COORDINATOR:
            return 'bg-sunglow-100 text-sunglow-800';
        case USER_ROLES.STUDENT:
        case USER_ROLES.USER:
            return 'bg-gray-100 text-gray-800';
        case USER_ROLES.MONITOR:
            return 'bg-coral-red-100 text-coral-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
