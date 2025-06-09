import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, UserCheck, UserX, Edit, Trash2, Database, TestTube } from 'lucide-react';

// Components
import { Card, Button, Badge, Avatar, Switch } from '../components/ui';
import Table from '../components/layouts/Table';

// Hooks and Context
import useUsers from '../hooks/useUsers';
import { useDataMode } from '../hooks/useDataMode';

// Utils
import { 
  getRoleInfo, 
  getStatusInfo, 
  getUserInitials, 
  getDisplayName, 
  getAvatarUrl 
} from '../utils/userUtils';

/**
 * Unified User List Component
 * 
 * A comprehensive user management interface that can display data from either
 * mock data or real API calls, with a toggle switch to alternate between modes.
 * 
 * Features:
 * - Real-time data mode switching
 * - User statistics dashboard
 * - Full CRUD operations
 * - Responsive design
 * - Role-based display
 */
export default function UnifiedUserList() {
  const navigate = useNavigate();
  const { useMockData, toggleDataMode, currentMode } = useDataMode();
  const {
    users,
    loading,
    error,
    fetchUsers,
    getUserStats,
    deleteUser,
    enableUser,
    disableUser,
    clearError
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Load users when component mounts or data mode changes
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUsers({ search: searchTerm, role: roleFilter });
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    loadUsers();
  }, [useMockData, searchTerm, roleFilter, fetchUsers]);

  // Get user statistics
  const stats = getUserStats();

  // Process users data for display
  const processedUsers = users.map(user => ({
    ...user,
    displayName: getDisplayName(user),
    initials: getUserInitials(getDisplayName(user)),
    avatarUrl: getAvatarUrl(user),
    roleInfo: getRoleInfo(user.role),
    statusInfo: getStatusInfo(user.isActive ? 'active' : 'inactive')
  }));

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleEditUser = (user) => {
    navigate(`/users/${user.id}/edit`);
  };
  

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.displayName}?`)) {
      try {
        await deleteUser(user.id);
        // Refresh users list
        await fetchUsers({ search: searchTerm, role: roleFilter });
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      if (user.isActive) {
        await disableUser(user.id);
      } else {
        await enableUser(user.id);
      }
      await fetchUsers({ search: searchTerm, role: roleFilter });
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header section with data mode toggle */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage EduExtra system users</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Data Mode Toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">API Data</span>
            </div>
            
            <Switch
              checked={useMockData}
              onCheckedChange={toggleDataMode}
              label=""
            />
            
            <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Mock Data</span>
            </div>
          </div>

          <Button variant="primary" onClick={handleCreateUser}>
            <Plus className="h-4 w-4 mr-2" />
            New User
          </Button>
        </div>
      </div>

      {/* Current Mode Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          {useMockData ? (
            <TestTube className="h-5 w-5 text-purple-600" />
          ) : (
            <Database className="h-5 w-5 text-blue-600" />
          )}
          <span className="font-medium text-gray-700">
            Currently using: <span className="font-bold">{currentMode.toUpperCase()}</span> data
          </span>
          {useMockData && (
            <span className="text-sm text-gray-600">
              (Development mode - changes won't be persisted)
            </span>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-red-800">{error}</span>
            <Button variant="ghost" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={handleRoleFilter}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
              <option value="COORDINATOR">Coordinator</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
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
              <p className="text-2xl font-bold text-yellow-600">{stats.byRole.student}</p>
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
              <p className="text-2xl font-bold text-purple-600">{stats.byRole.teacher}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">User List</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view all system users with their roles and status
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : (
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

                  <Table.Cell>
                    <Badge 
                      variant={user.roleInfo.variant}
                      size="sm"
                    >
                      {user.roleInfo.label}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell>
                    <Badge 
                      variant={user.statusInfo.variant}
                      size="sm"
                    >
                      {user.statusInfo.label}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US')}
                    </span>
                  </Table.Cell>

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
                        variant={user.isActive ? "warning" : "success"} 
                        size="sm" 
                        ghost
                        onClick={() => handleToggleUserStatus(user)}
                      >
                        {user.isActive ? (
                          <>
                            <UserX className="h-4 w-4 mr-1" />
                            Disable
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Enable
                          </>
                        )}
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
        )}

        {!loading && processedUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Card>
    </div>
  );
}
