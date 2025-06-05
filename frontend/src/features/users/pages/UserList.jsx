import UserTable from '../components/UserTable';
import useUsers from '../../../hooks/useUsers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { mockUsers } from '../../../constants/mockData';

const UserList = () => {
    const navigate = useNavigate();
    const { addUser, fetchUsers, loading } = useUsers();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        loadUsers();
    }, [fetchUsers]);


    const seedMockUsers = async () => {
        for (const user of mockUsers) {
            try {
                await addUser(user);
            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
        setUsers(await fetchUsers());
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-heading text-dark">Users Management</h1>
            <div className="flex gap-4 mb-4">
                <Button 
                    onClick={seedMockUsers} 
                    variant="secondary"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Seed Mock Users'}
                </Button>
                <Button 
                    onClick={() => navigate('/user-form')} 
                    variant="primary"
                >
                    Crear Usuario
                </Button>
            </div>


            {/* Compact Table */}
            <UserTable
                users={users ? users : []}
                size="sm"
                bordered={true}
                hover={true}
                onEdit={(user) => console.log('Edit user:', user)}
                onDelete={(userId) => console.log('Delete user with ID:', userId)}
                zebra={false}
            />
        </div>
    );
};

export default UserList;
