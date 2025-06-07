import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
    Button, 
    Input, 
    Select, 
    TextArea, 
    Badge, 
    Avatar, 
    Card,
    Form,
    FormField
} from '../components/ui';
import Table from '../components/layouts/Table';
import { 
    Palette, 
    Type, 
    LayoutGrid, 
    FileInput, 
    Table as TableIcon, 
    CreditCard, 
    Image,
    Star, 
    Heart, 
    Settings, 
    Download, 
    Upload, 
    Plus,
    Edit,
    Trash2,
    Check,
    X,
    Eye,
    Users,
    Mail
} from 'lucide-react';
import { getRoleInfo, getStatusInfo, getUserInitials } from '../utils/userUtils';

// Validation schema for example form
const exampleSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    category: yup.string().required('Category is required'),
    message: yup.string().required('Message is required').min(10, 'Minimum 10 characters'),
    website: yup.string().url('Must be a valid URL').nullable()
});

const categoryOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales' },
    { value: 'feedback', label: 'Feedback' }
];

export default function ComponentLibrary() {
    const [activeTab, setActiveTab] = useState('buttons');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        message: ''
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(exampleSchema),
        defaultValues: {
            name: '',
            email: '',
            category: '',
            message: '',
            website: ''
        }
    });

    const tabs = [
        { id: 'buttons', label: 'Buttons', icon: Palette },
        { id: 'forms', label: 'Form Components', icon: FileInput },
        { id: 'display', label: 'Display Components', icon: Eye },
        { id: 'tables', label: 'Tables', icon: TableIcon },
        { id: 'examples', label: 'Complete Examples', icon: Star },
        { id: 'colors', label: 'Colors & Typography', icon: Type },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const onSubmit = async (data) => {
        try {
            console.log('Form submitted:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const handleReset = () => {
        reset();
    };

    // Sample data for tables
    const sampleUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            status: 'active',
            joinDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'teacher',
            status: 'active',
            joinDate: '2024-02-20'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'student',
            status: 'inactive',
            joinDate: '2024-03-10'
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'buttons':
                return (
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Button Variants</h2>
                            <div className="space-y-6">
                                {/* Size variants */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button variant="primary" size="sm">
                                            <Plus className="h-4 w-4 mr-1" />
                                            Small
                                        </Button>
                                        <Button variant="primary" size="md">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Medium
                                        </Button>
                                        <Button variant="primary" size="lg">
                                            <Download className="h-4 w-4 mr-2" />
                                            Large
                                        </Button>
                                    </div>
                                </div>

                                {/* Color variants */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Color Variants</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button variant="primary">Primary</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="warning">Warning</Button>
                                        <Button variant="danger">Danger</Button>
                                        <Button variant="outline">Outline</Button>
                                    </div>
                                </div>

                                {/* States */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">States</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button variant="primary" loading>Loading</Button>
                                        <Button variant="secondary" disabled>Disabled</Button>
                                        <Button variant="primary" ghost>Ghost</Button>
                                    </div>
                                </div>

                                {/* Full width */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Full Width</h3>
                                    <Button variant="primary" fullWidth>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Full Width Button
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                );

            case 'forms':
                return (
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Components</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Input Variants</h3>
                                    <Input
                                        label="Default Input"
                                        placeholder="Default variant"
                                        size="md"
                                        variant="default"
                                    />
                                    <Input
                                        label="Filled Input"
                                        placeholder="Filled variant"
                                        variant="filled"
                                    />
                                    <Input
                                        label="Outlined Input"
                                        placeholder="Outlined variant"
                                        variant="outlined"
                                    />
                                    <Input
                                        label="Error State"
                                        placeholder="Input with error"
                                        error="This field is required"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Other Form Components</h3>
                                    <Select
                                        label="Select Component"
                                        placeholder="Choose an option"
                                    >
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Select>
                                    <TextArea
                                        label="TextArea Component"
                                        placeholder="Enter your message..."
                                        rows={3}
                                        helperText="Helper text for guidance"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Sizes</h2>
                            <div className="space-y-4">
                                <Input label="Small Input" size="sm" placeholder="Small size" />
                                <Input label="Medium Input" size="md" placeholder="Medium size" />
                                <Input label="Large Input" size="lg" placeholder="Large size" />
                            </div>
                        </Card>
                    </div>
                );

            case 'display':
                return (
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Avatar Component</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
                                    <div className="flex items-center gap-4">
                                        <Avatar size="xs" initials="XS" />
                                        <Avatar size="sm" initials="SM" />
                                        <Avatar size="md" initials="MD" />
                                        <Avatar size="lg" initials="LG" />
                                        <Avatar size="xl" initials="XL" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Status Indicators</h3>
                                    <div className="flex items-center gap-4">
                                        <Avatar size="md" initials="ON" status="online" />
                                        <Avatar size="md" initials="OF" status="offline" />
                                        <Avatar size="md" initials="BS" status="busy" />
                                        <Avatar size="md" initials="AW" status="away" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Badge Component</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Variants</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="success">Success</Badge>
                                        <Badge variant="warning">Warning</Badge>
                                        <Badge variant="danger">Danger</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="primary" size="sm">Small</Badge>
                                        <Badge variant="primary" size="md">Medium</Badge>
                                        <Badge variant="primary" size="lg">Large</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Role & Status Examples</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">User Roles</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['admin', 'teacher', 'student', 'coordinator'].map(role => {
                                            const roleInfo = getRoleInfo(role);
                                            return (
                                                <Badge key={role} variant={roleInfo.variant} size="sm">
                                                    {roleInfo.label}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Status Indicators</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['active', 'inactive', 'pending', 'suspended'].map(status => {
                                            const statusInfo = getStatusInfo(status);
                                            return (
                                                <Badge key={status} variant={statusInfo.variant} size="sm">
                                                    {statusInfo.label}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );

            case 'tables':
                return (
                    <div className="space-y-8">
                        <Card className="overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Advanced Table Example</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Table with hover effects, zebra striping, and modular components
                                </p>
                            </div>
                            <Table size="md" bordered hover zebra>
                                <Table.Header>
                                    <Table.Row isHeader>
                                        <Table.Cell as="th">User</Table.Cell>
                                        <Table.Cell as="th">Role</Table.Cell>
                                        <Table.Cell as="th">Status</Table.Cell>
                                        <Table.Cell as="th">Join Date</Table.Cell>
                                        <Table.Cell as="th" align="right">Actions</Table.Cell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {sampleUsers.map((user) => {
                                        const roleInfo = getRoleInfo(user.role);
                                        const statusInfo = getStatusInfo(user.status);
                                        const initials = getUserInitials(user.name);
                                        
                                        return (
                                            <Table.Row key={user.id}>
                                                <Table.Cell>
                                                    <div className="flex items-center">
                                                        <Avatar
                                                            initials={initials}
                                                            size="sm"
                                                            status={statusInfo.indicator}
                                                        />
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge variant={roleInfo.variant} size="sm">
                                                        {roleInfo.label}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge variant={statusInfo.variant} size="sm">
                                                        {statusInfo.label}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(user.joinDate).toLocaleDateString('en-US')}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell align="right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="secondary" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="danger" size="sm" ghost>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-900">Small Table</h3>
                                </div>
                                <Table size="sm" bordered>
                                    <Table.Header>
                                        <Table.Row isHeader>
                                            <Table.Cell as="th">Name</Table.Cell>
                                            <Table.Cell as="th">Status</Table.Cell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Compact Item 1</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="success" size="sm">Active</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Compact Item 2</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="secondary" size="sm">Inactive</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card>

                            <Card className="overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-900">Medium Table</h3>
                                </div>
                                <Table size="md" hover>
                                    <Table.Header>
                                        <Table.Row isHeader>
                                            <Table.Cell as="th">Name</Table.Cell>
                                            <Table.Cell as="th">Status</Table.Cell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Standard Item 1</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="warning" size="sm">Pending</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Standard Item 2</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="primary" size="sm">Review</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card>

                            <Card className="overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-900">Large Table</h3>
                                </div>
                                <Table size="lg" zebra>
                                    <Table.Header>
                                        <Table.Row isHeader>
                                            <Table.Cell as="th">Name</Table.Cell>
                                            <Table.Cell as="th">Status</Table.Cell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Spacious Item 1</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="danger" size="sm">Error</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Spacious Item 2</Table.Cell>
                                            <Table.Cell>
                                                <Badge variant="success" size="sm">Complete</Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card>
                        </div>
                    </div>
                );

            case 'examples':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* React Hook Form Example */}
                            <Card
                                title="Contact Form"
                                subtitle="Example using React Hook Form + Yup + Tailwind"
                            >
                                <Form
                                    onSubmit={handleSubmit(onSubmit)}
                                    onReset={handleReset}
                                    loading={isSubmitting}
                                    submitText="Send Message"
                                    resetText="Reset"
                                    columns={1}
                                    spacing="normal"
                                >
                                    <FormField error={!!errors.name}>
                                        <Input
                                            {...register('name')}
                                            label="Full Name"
                                            placeholder="Your full name"
                                            error={errors.name?.message}
                                            required
                                            size="md"
                                        />
                                    </FormField>

                                    <FormField error={!!errors.email}>
                                        <Input
                                            {...register('email')}
                                            type="email"
                                            label="Email"
                                            placeholder="your@email.com"
                                            error={errors.email?.message}
                                            required
                                            size="md"
                                        />
                                    </FormField>

                                    <FormField error={!!errors.category}>
                                        <Select
                                            {...register('category')}
                                            label="Category"
                                            error={errors.category?.message}
                                            required
                                            size="md"
                                        >
                                            <option value="">Select a category</option>
                                            {categoryOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormField>

                                    <FormField error={!!errors.website}>
                                        <Input
                                            {...register('website')}
                                            type="url"
                                            label="Website"
                                            placeholder="https://your-site.com (optional)"
                                            error={errors.website?.message}
                                            size="md"
                                            helperText="Optional: Your website or social media"
                                        />
                                    </FormField>

                                    <FormField error={!!errors.message}>
                                        <TextArea
                                            {...register('message')}
                                            label="Message"
                                            placeholder="Write your message here..."
                                            error={errors.message?.message}
                                            required
                                            rows={4}
                                            size="md"
                                            helperText="Minimum 10 characters"
                                        />
                                    </FormField>
                                </Form>
                            </Card>

                            {/* Component showcase card */}
                            <div className="space-y-6">
                                <Card title="User Profile Card">
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <Avatar 
                                                size="lg" 
                                                initials="JD"
                                                status="online"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                                                <p className="text-gray-600">Senior Developer</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Badge variant="primary" size="sm">Admin</Badge>
                                                    <Badge variant="success" size="sm">Active</Badge>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button variant="secondary" size="sm">
                                                    <Mail className="h-4 w-4 mr-1" />
                                                    Message
                                                </Button>
                                                <Button variant="primary" size="sm">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    Follow
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card title="Action Buttons">
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button variant="primary" size="sm">
                                                <Plus className="h-4 w-4 mr-1" />
                                                Create
                                            </Button>
                                            <Button variant="secondary" size="sm">
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button variant="warning" size="sm">
                                                <Download className="h-4 w-4 mr-1" />
                                                Export
                                            </Button>
                                            <Button variant="danger" size="sm" ghost>
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                        <Button variant="outline" fullWidth>
                                            <Settings className="h-4 w-4 mr-2" />
                                            View All Settings
                                        </Button>
                                    </div>
                                </Card>

                                <Card title="Status Dashboard">
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">142</div>
                                                <Badge variant="success" size="sm">Active Users</Badge>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-600">23</div>
                                                <Badge variant="warning" size="sm">Pending</Badge>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">89</div>
                                                <Badge variant="primary" size="sm">Teachers</Badge>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-600">5</div>
                                                <Badge variant="danger" size="sm">Suspended</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                );

            case 'colors':
                return (
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">EduExtra Color System</h2>
                            <div className="space-y-6">
                                {/* Brand Colors */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Brand Colors</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-medium text-gray-600">Blue Ribbon (Primary)</h4>
                                            <div className="grid grid-cols-5 gap-1">
                                                {[50, 200, 400, 600, 800].map(shade => (
                                                    <div key={shade} className="text-center">
                                                        <div className={`w-12 h-12 bg-blue-ribbon-${shade} rounded mx-auto mb-1`}></div>
                                                        <span className="text-xs text-gray-500">{shade}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-medium text-gray-600">Emerald (Success)</h4>
                                            <div className="grid grid-cols-5 gap-1">
                                                {[50, 200, 400, 600, 800].map(shade => (
                                                    <div key={shade} className="text-center">
                                                        <div className={`w-12 h-12 bg-emerald-${shade} rounded mx-auto mb-1`}></div>
                                                        <span className="text-xs text-gray-500">{shade}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-medium text-gray-600">Sunglow (Accent)</h4>
                                            <div className="grid grid-cols-5 gap-1">
                                                {[50, 200, 400, 600, 800].map(shade => (
                                                    <div key={shade} className="text-center">
                                                        <div className={`w-12 h-12 bg-sunglow-${shade} rounded mx-auto mb-1`}></div>
                                                        <span className="text-xs text-gray-500">{shade}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-medium text-gray-600">Coral Red (Danger)</h4>
                                            <div className="grid grid-cols-5 gap-1">
                                                {[50, 200, 400, 600, 800].map(shade => (
                                                    <div key={shade} className="text-center">
                                                        <div className={`w-12 h-12 bg-coral-red-${shade} rounded mx-auto mb-1`}></div>
                                                        <span className="text-xs text-gray-500">{shade}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Semantic Colors */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Semantic Colors</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                                            <p className="text-xs text-gray-600">Primary</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
                                            <p className="text-xs text-gray-600">Success</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto mb-2"></div>
                                            <p className="text-xs text-gray-600">Warning</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
                                            <p className="text-xs text-gray-600">Danger</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-500 rounded-lg mx-auto mb-2"></div>
                                            <p className="text-xs text-gray-600">Neutral</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Typography System</h2>
                            <div className="space-y-6">
                                {/* Font Families */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Font Families</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-heading text-lg text-gray-900">Poppins (Headings)</p>
                                            <p className="text-sm text-gray-500">font-heading - Used for headings and titles</p>
                                        </div>
                                        <div>
                                            <p className="font-sans text-lg text-gray-900">Inter (Body Text)</p>
                                            <p className="text-sm text-gray-500">font-sans - Used for body text and UI elements</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Heading Scales */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Heading Scale</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h1 className="text-4xl font-heading font-bold text-gray-900">Heading 1</h1>
                                            <p className="text-sm text-gray-500">text-4xl font-heading font-bold</p>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-heading font-semibold text-gray-900">Heading 2</h2>
                                            <p className="text-sm text-gray-500">text-3xl font-heading font-semibold</p>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-heading font-medium text-gray-900">Heading 3</h3>
                                            <p className="text-sm text-gray-500">text-2xl font-heading font-medium</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-heading font-medium text-gray-900">Heading 4</h4>
                                            <p className="text-sm text-gray-500">text-xl font-heading font-medium</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body Text */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Body Text Sizes</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-lg font-sans text-gray-900">Large body text for emphasis</p>
                                            <p className="text-sm text-gray-500">text-lg font-sans</p>
                                        </div>
                                        <div>
                                            <p className="text-base font-sans text-gray-900">Standard body text for readability</p>
                                            <p className="text-sm text-gray-500">text-base font-sans</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-sans text-gray-600">Small text for secondary information</p>
                                            <p className="text-xs text-gray-500">text-sm font-sans</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-sans text-gray-500">Extra small text for captions</p>
                                            <p className="text-xs text-gray-500">text-xs font-sans</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    EduExtra Component Library
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Complete showcase of all refactored UI components with Tailwind CSS styling,
                    consistent APIs, React Hook Form integration, and enhanced accessibility features.
                </p>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const TabIcon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                                    ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <TabIcon className="h-4 w-4 mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-screen">
                {renderTabContent()}
            </div>

            {/* Footer */}
            <Card className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Component Integration Complete
                </h2>
                <p className="text-gray-600 mb-6">
                    All components are refactored with consistent APIs, Tailwind styling,
                    and improved accessibility. Ready for production use!
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="primary">
                        <Check className="h-4 w-4 mr-2" />
                        Test Components
                    </Button>
                    <Button variant="secondary">
                        <Upload className="h-4 w-4 mr-2" />
                        View Documentation
                    </Button>
                </div>
            </Card>
        </div>
    );
}
