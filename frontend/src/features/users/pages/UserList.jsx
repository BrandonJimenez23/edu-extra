import UserTable from '../components/UserTable';
import useUsers from '../../../hooks/useUsers';
import { useEffect, useState } from 'react';

const UserList = () => {

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
    }, []);


    const mockUsers = [
        {
            fullName: 'Juan Pérez',
            email: 'juan.perez@eduextra.com',
            password: '12345678',
            role: 'STUDENT',
        },
        {
            fullName: 'Lucía Gómez',
            email: 'lucia.gomez@eduextra.com',
            password: '12345678',
            role: 'COORDINATOR',
        },
        {
            fullName: 'Carlos Ruiz',
            email: 'carlos.ruiz@eduextra.com',
            password: '12345678',
            role: 'MONITOR',
        },
        {
            fullName: 'Ana Morales',
            email: 'ana.morales@eduextra.com',
            password: '12345678',
            role: 'STUDENT',
        },
        {
            fullName: 'Marco Salas',
            email: 'marco.salas@eduextra.com',
            password: '12345678',
            role: 'ADMIN',
        },
    ];

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
            <button onClick={seedMockUsers} className="btn btn-primary mb-4"
                disabled={loading}>
                {loading ? 'Loading...' : 'Seed Mock Users'}
            </button>

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
