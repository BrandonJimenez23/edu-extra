# EduExtra Frontend

Modern React application built with Vite, TailwindCSS, and a component-driven architecture for managing extracurricular activities.

## 🧱 Technologies Used

- **React 18**: JavaScript library for building user interfaces
- **Vite**: Fast development tool and build system
- **TailwindCSS**: Utility-first CSS framework with custom design system
- **Axios**: HTTP client for API communication
- **React Router DOM**: Client-side routing and navigation
- **Lucide React**: Modern icon library with SVG icons
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
│   │   ├── layouts/      # Layout components (Form, Table)
│   │   ├── ui/           # UI primitives (Button, Card, Input, Switch, etc.)
│   │   └── UnifiedUserList.jsx # Unified user management component
│   ├── contexts/         # React contexts
│   │   └── DataModeContext.jsx # Data mode management (mock/API toggle)
│   ├── data/             # Centralized mock data
│   │   └── mockData.js      # Organized test data with persistence
│   ├── features/         # Feature-based modules
│   │   ├── activities/   # Activities management
│   │   ├── auth/         # Authentication features
│   │   └── users/        # User management features
│   ├── hooks/            # Custom React hooks
│   │   ├── useApiRequest.js # API request hook
│   │   ├── useAuth.jsx      # Authentication hook
│   │   ├── useDataMode.js   # Data mode switching hook
│   │   ├── useUsers.js      # Basic user operations
│   │   └── useUsersEnhanced.js # Enhanced user management with persistence
│   ├── layout/           # Main application layout
│   │   ├── Layout.jsx       # Primary layout component
│   │   ├── components/      # Layout-specific components
│   │   │   ├── MainContent.jsx   # Content area wrapper
│   │   │   ├── SearchInput.jsx   # Header search functionality
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── TopBar.jsx        # Header bar
│   │   │   └── UserMenu.jsx      # User dropdown menu
│   │   └── hooks/
│   │       └── useLayout.js      # Layout state management
│   ├── pages/            # Main application pages
│   │   ├── Activities.jsx       # Activities management page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── DesignSystem.jsx     # Component showcase
│   │   └── UserList.jsx         # User listing page
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

## 🎨 Design System

### Custom Color Palette
- **Blue Ribbon**: Primary brand color (50-900 variants)
- **Emerald**: Success states and positive actions
- **Sunglow**: Accent color for highlights and active states
- **Coral Red**: Error states and destructive actions

### Typography
- **Headings**: Poppins (font-heading)
- **Body Text**: Inter (font-sans)

### Icons
- **Lucide React**: Consistent SVG icon system
- **Responsive**: Scales appropriately across devices

## 🏗️ Architecture

### State Management
- **React Context**: Global state management for authentication and data mode
- **Custom Hooks**: Reusable logic for API calls and state management
- **Local Storage**: Persistent mock data system for development

### Data Layer
- **Unified Data System**: Toggle between mock data and API calls
- **API Configuration**: Axios with interceptors for authentication
- **Error Handling**: Centralized error management with user feedback

### Component Structure
- **Feature-based Organization**: Components grouped by business domain
- **Reusable UI Components**: Consistent design system components
- **Layout Components**: Responsive layout with sidebar navigation

## 📱 Current Features

### ✅ Implemented
- **Authentication**: JWT-based login with session persistence
- **User Management**: Complete CRUD operations with advanced filtering
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Comprehensive UI components with consistent styling
- **Data Management**: Unified system for mock/API data switching

### 🚧 In Development
- **Activities Management**: Activity CRUD operations and scheduling
- **Advanced Features**: File upload, notifications, and analytics

> **Note**: For detailed development progress and task tracking, see [DEVELOPMENT_STATUS.md](../docs/DEVELOPMENT_STATUS.md)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Adaptive sidebar navigation
- Touch-friendly interface
- Optimized performance across devices

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

## 📚 Additional Resources

- [Component Documentation](src/pages/DesignSystem.jsx) - Interactive component showcase
- [Development Status](../docs/DEVELOPMENT_STATUS.md) - Progress tracking and roadmap
- [API Integration Guide](../docs/API_INTEGRATION.md) - Backend integration details
- [Deployment Guide](../docs/DEPLOYMENT.md) - Production deployment instructions
