import UserForm from '../features/users/components/UserForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Users, UserCheck, UserX } from 'lucide-react';
import { mockUsers } from '../data/mockData';

export default function UserList() {
    const handleCreateUser = (userData) => {
        console.log('Creating user:', userData);
    };

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
                    <p className="text-gray-600">Gestiona los usuarios del sistema EduExtra</p>
                </div>
                <Button variant="primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Activos</p>
                            <p className="text-2xl font-bold text-green-600">142</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <UserX className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Estudiantes</p>
                            <p className="text-2xl font-bold text-yellow-600">89</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Monitores</p>
                            <p className="text-2xl font-bold text-purple-600">12</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Users table */}
            <Card className="overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Lista de Usuarios</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha de registro
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={user.avatarUrl}
                                                alt={`Avatar de ${user.fullName}`}
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.fullName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                                                user.role === 'COORDINATOR' ? 'bg-blue-100 text-blue-800' :
                                                    user.role === 'MONITOR' ? 'bg-purple-100 text-purple-800' :
                                                        user.role === 'STUDENT' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role === 'ADMIN' ? 'Administrador' :
                                                user.role === 'COORDINATOR' ? 'Coordinador' :
                                                    user.role === 'MONITOR' ? 'Monitor' :
                                                        user.role === 'STUDENT' ? 'Estudiante' :
                                                            user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString('es-ES')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="secondary" size="sm">
                                                Editar
                                            </Button>
                                            <Button variant="danger" size="sm" ghost>
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Form example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <UserForm
                        onSubmit={handleCreateUser}
                        onCancel={() => console.log('Cancel')}
                    />
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información</h3>
                    <div className="space-y-3 text-sm">
                        <p className="text-gray-600">
                            <strong>Roles disponibles:</strong>
                        </p>
                        <ul className="space-y-1 text-gray-500 ml-4">
                            <li>• <strong>Administrador:</strong> Acceso completo al sistema</li>
                            <li>• <strong>Coordinador:</strong> Gestiona actividades y monitores</li>
                            <li>• <strong>Monitor:</strong> Supervisa estudiantes y actividades</li>
                            <li>• <strong>Estudiante:</strong> Participa en actividades</li>
                            <li>• <strong>Vecino:</strong> Acceso limitado a información pública</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>

    );
}