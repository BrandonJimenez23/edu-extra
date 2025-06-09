# EduExtra Frontend

Modern React application built with Vite, TailwindCSS, and a component-driven architecture for managing extracurricular activities. Features a sophisticated mock/API data switching system and comprehensive user management capabilities.

## 🧱 Technologies Used

- **React 18**: JavaScript library with hooks and context
- **Vite**: Fast development tool and build system
- **TailwindCSS**: Utility-first CSS framework with custom design system
- **Axios**: HTTP client for API communication
- **React Router DOM**: Client-side routing and navigation
- **React Hook Form**: Form management with validation
- **Yup**: Schema validation library
- **Lucide React**: Modern icon library with SVG icons
- **Clsx**: Utility for conditional CSS classes
- **ESLint/Prettier**: Code linting and formatting tools

## 📦 Project Structure

```plaintext
frontend/
├── public/               # Static assets
│   ├── EduExtraLogo.png     # Main logo
│   └── EduExtraLogoSlim.png # Compact logo variant
├── src/                  # Source code
│   ├── api/              # API configuration and services
│   │   ├── authApi.js       # Authentication API calls
│   │   ├── axiosConfig.js   # Axios instance and interceptors
│   │   └── userApi.js       # User-specific API calls
│   ├── components/       # Reusable generic components
│   │   ├── auth/         # Authentication components
│   │   │   ├── LoginForm.jsx    # Login functionality
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── layouts/      # Layout components
│   │   │   ├── Form.jsx         # Reusable form layout
│   │   │   └── Table.jsx        # Advanced table component
│   │   ├── ui/           # UI primitives and design system
│   │   │   ├── Button.jsx       # Multi-variant button component
│   │   │   ├── Card.jsx         # Content containers
│   │   │   ├── DataModeSwitch.jsx # Mock/API toggle switches
│   │   │   ├── FormField.jsx    # Form field wrapper
│   │   │   ├── Input.jsx        # Enhanced input with admin mode
│   │   │   ├── Label.jsx        # Consistent labeling
│   │   │   ├── Logo.jsx         # Brand logo component
│   │   │   ├── Select.jsx       # Dropdown selection
│   │   │   ├── Switch.jsx       # Toggle switches
│   │   │   └── index.js         # Component exports
│   │   └── UnifiedUserList.jsx # Unified user management component
│   ├── contexts/         # React contexts
│   │   └── DataModeContext.jsx # Data mode management (mock/API toggle)
│   ├── data/             # Centralized mock data
│   │   └── mockData.js      # Organized test data with persistence
│   ├── features/         # Feature-based modules
│   │   ├── activities/   # Activities management
│   │   ├── auth/         # Authentication features
│   │   └── users/        # User management features
│   │       ├── components/   # User-specific components
│   │       │   └── UserForm.jsx # Comprehensive user form
│   │       ├── hooks/        # User-related hooks
│   │       ├── models/       # User data models and validation
│   │       │   ├── index.js     # Model exports
│   │       │   ├── userModels.js # User data structures
│   │       │   ├── userTransformers.js # Data transformation
│   │       │   └── userValidation.js # Yup validation schemas
│   │       └── pages/        # User management pages
│   │           ├── CreateUser.jsx # User creation page
│   │           └── EditUser.jsx   # User editing page
│   ├── hooks/            # Custom React hooks
│   │   ├── useApiRequest.js # API request hook with notifications
│   │   ├── useAuth.jsx      # Authentication hook
│   │   ├── useDataMode.js   # Data mode switching hook
│   │   ├── useUsers.js      # Unified user operations
│   │   ├── useUsersApi.js   # API-based user operations
│   │   └── useUsersMock.js  # Mock data user operations
│   ├── layout/           # Main application layout
│   │   ├── Layout.jsx       # Primary layout component
│   │   ├── components/      # Layout-specific components
│   │   │   ├── MainContent.jsx   # Content area wrapper
│   │   │   ├── SearchInput.jsx   # Header search functionality
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── TopBar.jsx        # Header bar with DataModeSwitch
│   │   │   └── UserMenu.jsx      # User dropdown menu
│   │   └── hooks/
│   │       └── useLayout.js      # Layout state management
│   ├── pages/            # Main application pages
│   │   ├── Activities.jsx       # Activities management page
│   │   ├── Dashboard.jsx        # Main dashboard with DataModeSwitch
│   │   ├── DesignSystem.jsx     # Component showcase
│   │   ├── UnifiedUserList.jsx  # Advanced user management
│   │   └── UserList.jsx         # Basic user listing page
│   ├── routes/           # Application routing
│   │   └── AppRoutes.jsx        # Route configuration
│   ├── styles/           # Global styles and CSS modules
│   │   ├── components.css       # Component-specific styles
│   │   ├── form.css            # Form styling
│   │   ├── logo.css            # Logo animations
│   │   └── table.css           # Table styling
│   └── utils/            # Utility functions
│       └── helpers.js           # Common helper functions
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration with custom theme
└── vite.config.js        # Vite build configuration
```

## 🎨 Design System

### Custom Color Palette
- **Blue Ribbon**: Primary brand color (50-900 variants)
- **Emerald**: Success states and positive actions
- **Sunglow**: Accent color for highlights and active states
- **Coral Red**: Error states and destructive actions

### Typography
- **Headings**: Poppins (font-heading)
- **Body Text**: Inter (font-sans)

### Component Variants
- **Buttons**: Primary, secondary, outline, ghost variants
- **Inputs**: Default, filled, outlined with admin mode
- **Cards**: Standard containers with consistent spacing
- **Forms**: Two-column responsive layouts with validation

### Icons
- **Lucide React**: Consistent SVG icon system
- **Responsive**: Scales appropriately across devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy and edit environment variables
   cp .env.example .env
   # Set VITE_API_BASE_URL to your backend URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API should be running on: http://localhost:8080

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### State Management
- **React Context**: Global state management for authentication and data mode
- **Custom Hooks**: Reusable logic for API calls and state management
- **Local Storage**: Persistent mock data system for development
- **React Hook Form**: Form state management with validation

### Data Layer
- **Unified Data System**: Seamless toggle between mock data and API calls
- **API Configuration**: Axios with interceptors for authentication
- **Error Handling**: Centralized error management with toast notifications
- **Mock Data Persistence**: localStorage-based mock data with session persistence

### Component Architecture
- **Feature-based Organization**: Components grouped by business domain
- **Reusable UI Components**: Comprehensive design system components
- **Layout Components**: Responsive layout with adaptive sidebar navigation
- **Form System**: Consistent form layouts with validation and error handling

### Advanced Features
- **Data Mode Switching**: Real-time toggle between mock and API data
- **Notification System**: Toast notifications for user feedback
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Loading States**: Comprehensive loading indicators and disabled states
- **Error Boundaries**: Graceful error handling and recovery

## 📱 Current Features

### ✅ Fully Implemented

#### Authentication System
- **JWT Authentication**: Complete login/logout with token management
- **Protected Routes**: Route-based access control
- **Session Persistence**: Maintains authentication across page reloads
- **User Context**: Global user state management

#### User Management System
- **Complete CRUD Operations**: Create, read, update, delete users
- **Advanced User Form**: Comprehensive validation with React Hook Form + Yup
- **Data Mode Switching**: Toggle between mock and API data
- **Mock Data Persistence**: localStorage-based mock operations
- **User List Management**: Advanced table with pagination and filtering
- **Real-time Updates**: Immediate UI updates for all operations
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: Detailed error messages and recovery

#### Design System & UI
- **Component Library**: Complete set of reusable UI components
- **Responsive Design**: Mobile-first adaptive layouts
- **Custom Theme**: TailwindCSS configuration with brand colors
- **Form System**: Two-column responsive forms with validation
- **Icon System**: Consistent Lucide React icons
- **Interactive Elements**: Buttons, switches, inputs with multiple variants

#### Development Tools
- **Mock/API Toggle**: Development-friendly data switching
- **Component Showcase**: Design system documentation page
- **Development Mode**: Enhanced debugging and logging
- **Code Quality**: ESLint and Prettier configuration

### 🚧 In Development
- **Activities Management**: Activity CRUD operations and scheduling
- **Advanced Features**: File upload, notifications, and analytics
- **Performance Optimization**: Code splitting and lazy loading

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Features
- **Mobile-first Approach**: Optimized for small screens first
- **Adaptive Sidebar**: Collapsible navigation with overlay on mobile
- **Touch-friendly Interface**: Larger touch targets and gestures
- **Responsive Forms**: Single/two-column layouts based on screen size
- **Optimized Performance**: Efficient rendering across devices

## 🔧 Advanced Features

### Data Mode Switching System
The application features a sophisticated dual-data system:

```jsx
// Toggle between mock and API data
const { dataMode, toggleDataMode } = useDataMode();

// Unified hook automatically uses correct data source
const { users, loading, createUser, updateUser } = useUsers();
```

**Features**:
- **Seamless Switching**: Real-time toggle without page reload
- **Persistent Mock Data**: localStorage-based mock operations
- **Unified API**: Same interface for both mock and real data
- **Development Friendly**: Test UI without backend dependency

### Form System
Advanced form management with comprehensive validation:

```jsx
// UserForm with dynamic validation
<UserForm
  isEditMode={true}
  user={existingUser}
  onSubmit={handleUserUpdated}
  loading={loading}
  admin={true} // Disables browser autocomplete
/>
```

**Features**:
- **React Hook Form Integration**: Efficient form state management
- **Yup Validation**: Schema-based validation with custom messages
- **Dynamic Schemas**: Different validation rules for create/edit modes
- **Admin Mode**: Security features to prevent browser interference
- **Real-time Validation**: Immediate feedback on field changes

### Notification System
Centralized notification management:

```jsx
// Automatic notifications via useApiRequest
const { executeRequest } = useApiRequest();

await executeRequest(
  () => updateUser(id, data),
  'User updated successfully',
  'Failed to update user'
);
```

**Features**:
- **Toast Notifications**: Non-intrusive user feedback
- **Automatic Error Handling**: Centralized error notification
- **Custom Messages**: Configurable success/error messages
- **Loading States**: Integrated loading indicators

## 🧪 Development Tools

### Code Quality
```bash
npm run lint          # ESLint checks
npm run lint:fix      # Fix linting issues
npm run format        # Prettier formatting
```

### Build Analysis
```bash
npm run build         # Production build
npm run preview       # Preview production build
npm run analyze       # Bundle size analysis
```

### Development Features
```bash
npm run dev           # Development server with hot reload
npm run dev:host      # Development server accessible on network
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=EduExtra
VITE_ENABLE_MOCK_DATA=true
```

### TailwindCSS Custom Theme
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'blue-ribbon': { /* Custom primary color */ },
      'emerald': { /* Success color */ },
      'coral-red': { /* Error color */ },
      'sunglow': { /* Accent color */ }
    },
    fontFamily: {
      'heading': ['Poppins'],
      'sans': ['Inter']
    }
  }
}
```

## 📚 Additional Resources

- [Component Documentation](src/pages/DesignSystem.jsx) - Interactive component showcase
- [Development Status](../docs/DEVELOPMENT_STATUS.md) - Progress tracking and roadmap
- [API Integration Guide](../docs/API_INTEGRATION.md) - Backend integration details
- [Deployment Guide](../docs/DEPLOYMENT.md) - Production deployment instructions

## 🎯 Key Implementation Highlights

### User Management Architecture
- **Unified Data Hook**: Single interface for mock/API operations
- **Form Validation**: Comprehensive schema-based validation
- **Real-time Updates**: Immediate UI feedback for all operations
- **Error Recovery**: Graceful error handling with user guidance

### Development Experience
- **Hot Module Replacement**: Instant updates during development
- **Mock Data Persistence**: Maintains mock state across sessions
- **Component Isolation**: Feature-based organization for maintainability
- **Type Safety**: Consistent data models and transformations

### Performance Optimizations
- **Efficient Re-renders**: Optimized React patterns and memoization
- **Lazy Loading**: Route-based code splitting (planned)
- **Asset Optimization**: Vite-based build optimization
- **Responsive Images**: Optimized logo variants for different contexts

---

> **Note**: This frontend is designed to work seamlessly with the EduExtra backend API while providing a complete development experience through the mock data system.
