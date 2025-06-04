import Table from "../layouts/Table";

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
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="flex space-x-2">
                            {onEdit && (
                                <button onClick={() => onEdit(user)} className="btn btn-primary">
                                    Edit
                                </button>
                            )}
                            {onDelete && (
                                <button onClick={() => onDelete(user.id)} className="btn btn-danger">
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
