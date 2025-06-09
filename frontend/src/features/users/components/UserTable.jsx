import Table from "../../../components/layouts/Table";
import { getRoleBadgeClass } from "../../../constants/roles";

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
