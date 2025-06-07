import UserForm from '../features/users/components/UserForm';
import { Card, Button, Badge, Avatar } from '../components/ui';
import Table from '../components/layouts/Table';
import { Plus, Users, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { 
    getRoleInfo, 
    getStatusInfo, 
    getUserInitials, 
    getDisplayName, 
    getAvatarUrl 
} from '../utils/userUtils';

export default function UserList() {
    const handleCreateUser = (userData) => {
        console.log('Creating user:', userData);
    };

    const handleEditUser = (user) => {
        console.log('Editing user:', user);
    };

    const handleDeleteUser = (user) => {
        console.log('Deleting user:', user);
    };

    // Process users data for display
    const processedUsers = mockUsers.map(user => ({
        ...user,
        displayName: getDisplayName(user),
        initials: getUserInitials(getDisplayName(user)),
        avatarUrl: getAvatarUrl(user),
        roleInfo: getRoleInfo(user.role),
        statusInfo: getStatusInfo(user.isActive ? 'active' : 'inactive')
    }));

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-600">Manage EduExtra system users</p>
                </div>
                <Button variant="primary">
                    <Plus className="h-4 w-4 mr-2" />
                    New User
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
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active</p>
                            <p className="text-2xl font-bold text-green-600">
                                {mockUsers.filter(u => u.isActive).length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <UserX className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Students</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {mockUsers.filter(u => u.role === 'STUDENT').length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Teachers</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {mockUsers.filter(u => u.role === 'TEACHER').length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Users table with new modular Table component */}
            <Card className="overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">User List</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage and view all system users with their roles and status
                    </p>
                </div>

                <Table size="md" bordered hover zebra>
                    <Table.Header>
                        <Table.Row isHeader>
                            <Table.Cell as="th">User</Table.Cell>
                            <Table.Cell as="th">Role</Table.Cell>
                            <Table.Cell as="th">Status</Table.Cell>
                            <Table.Cell as="th">Registration Date</Table.Cell>
                            <Table.Cell as="th" align="right">Actions</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {processedUsers.map((user) => (
                            <Table.Row key={user.id}>
                                {/* User info with Avatar */}
                                <Table.Cell>
                                    <div className="flex items-center">
                                        <Avatar
                                            src={user.avatarUrl}
                                            initials={user.initials}
                                            alt={`Avatar of ${user.displayName}`}
                                            size="md"
                                            status={user.statusInfo.indicator}
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.displayName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </Table.Cell>

                                {/* Role badge */}
                                <Table.Cell>
                                    <Badge 
                                        variant={user.roleInfo.variant}
                                        size="sm"
                                    >
                                        {user.roleInfo.label}
                                    </Badge>
                                </Table.Cell>

                                {/* Status badge */}
                                <Table.Cell>
                                    <Badge 
                                        variant={user.statusInfo.variant}
                                        size="sm"
                                    >
                                        {user.statusInfo.label}
                                    </Badge>
                                </Table.Cell>

                                {/* Registration date */}
                                <Table.Cell>
                                    <span className="text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString('en-US')}
                                    </span>
                                </Table.Cell>

                                {/* Actions */}
                                <Table.Cell align="right">
                                    <div className="flex justify-end gap-2">
                                        <Button 
                                            variant="secondary" 
                                            size="sm"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            ghost
                                            onClick={() => handleDeleteUser(user)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>

            {/* Form example and information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <UserForm
                        onSubmit={handleCreateUser}
                        onCancel={() => console.log('Cancel')}
                    />
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role Information</h3>
                    <div className="space-y-4">
                        <div className="space-y-3 text-sm">
                            <p className="text-gray-600 font-medium">Available roles:</p>
                            <div className="space-y-2">
                                {['admin', 'teacher', 'student', 'coordinator'].map(role => {
                                    const roleInfo = getRoleInfo(role);
                                    return (
                                        <div key={role} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Badge variant={roleInfo.variant} size="sm">
                                                    {roleInfo.label}
                                                </Badge>
                                                <span className="text-xs text-gray-600">
                                                    {roleInfo.description}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-gray-600 font-medium text-sm mb-2">Status indicators:</p>
                            <div className="space-y-2">
                                {['active', 'inactive', 'pending', 'suspended'].map(status => {
                                    const statusInfo = getStatusInfo(status);
                                    return (
                                        <div key={status} className="flex items-center gap-2">
                                            <Badge variant={statusInfo.variant} size="sm">
                                                {statusInfo.label}
                                            </Badge>
                                            <span className="text-xs text-gray-600">
                                                {statusInfo.description}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}