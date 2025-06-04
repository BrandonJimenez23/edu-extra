import UserTable from '../components/user/UserTable';

const UserList = () => {
     const mockUsers = [
            { id: 1, name: "Brandon Jiménez", email: "brandon@eduextra.com" },
            { id: 2, name: "Elon Musk", email: "elon@spacex.com" },
            { id: 3, name: "Ada Lovelace", email: "ada@algorithms.io" },
        ];
    


    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-heading text-dark">User List</h1>

            {/* Compact Table */}
            <UserTable
                users={mockUsers}
                size="sm"
                bordered={true}
                hover={true}
                zebra={false}
            />
        </div>
    );
};

export default UserList;
