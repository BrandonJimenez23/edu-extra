import ActivityTable from '../components/ActivityTable';

const ActivityList = () => {
    const mockActivities = [
        { id: 1, name: "Soccer", category: "Sports" },
        { id: 2, name: "Painting", category: "Arts" },
        { id: 3, name: "Robotics", category: "Technology" },
    ];

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-heading text-dark">Activity List</h1>
            <ActivityTable activities={mockActivities} />
        </div>
    );
};

export default ActivityList;
