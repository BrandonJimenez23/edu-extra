// Placeholder for ActivityTable component
export default function ActivityTable({ activities }) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Category</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td>{activity.id}</td>
                        <td>{activity.name}</td>
                        <td>{activity.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
