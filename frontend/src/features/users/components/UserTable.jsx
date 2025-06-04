import Table from "../../../components/layouts/Table";

export default function UserTable({
    users,
    children,
    onEdit,
    onDelete,
    size = 'md',
    bordered = true,
    hover = true,
    zebra = true,
    className = ''
}) {
    return (
        <Table
            className={`w-full ${className}`}
            size={size}
            bordered={bordered}
            hover={hover}
            zebra={zebra}
        >
            <thead>
                <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Full Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Role</th>
                    <th className="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                                {user.role}
                            </span>
                        </td>
                        <td className="flex space-x-2">
                            {onEdit && (
                                <button onClick={() => onEdit(user)} className="btn btn-primary-ghost btn-sm">
                                    Edit
                                </button>
                            )}
                            {onDelete && (
                                <button onClick={() => onDelete(user.id)} className="btn btn-danger-ghost btn-sm">
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            {children}
        </Table>
    );
}

// Función auxiliar para obtener la clase del badge según el rol
function getRoleBadgeClass(role) {
    switch (role) {
        case 'ADMIN':
            return 'bg-blue-ribbon-100 text-blue-ribbon-800';
        case 'INSTRUCTOR':
            return 'bg-emerald-100 text-emerald-800';
        case 'COORDINATOR':
            return 'bg-sunglow-100 text-sunglow-800';
        case 'USER':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
