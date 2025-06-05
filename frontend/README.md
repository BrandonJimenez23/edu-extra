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
│   │   ├── axiosConfig.js   # Axios instance and interceptors
│   │   └── userApi.js       # User-specific API calls
│   ├── components/       # Reusable generic components
│   │   ├── layouts/      # Layout components (Form, Table)
│   │   ├── ui/           # UI primitives (Button, Card, Input, etc.)
│   │   └── user/         # User-specific components
│   ├── constants/        # Application constants
│   │   ├── designSystem.js  # Design tokens and variants
│   │   ├── mockData.js      # Development mock data
│   │   └── roles.js         # User roles definitions
│   ├── data/             # Centralized mock data
│   │   └── mockData.js      # Organized test data
│   ├── features/         # Feature-based modules
│   │   ├── activities/   # Activities management
│   │   ├── auth/         # Authentication
│   │   └── users/        # User management
│   ├── hooks/            # Custom React hooks
│   │   ├── useApiRequest.js # API request hook
│   │   └── useUsers.js      # User-specific hooks
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

## ✅ Progress Checklist

### Initial Setup
- [x] Configure project with Vite
- [x] Integrate TailwindCSS with custom theme
- [x] Configure routes with React Router DOM
- [x] Configure Axios for API calls
- [x] Set up ESLint and Prettier

### Layout & Navigation
- [x] Main layout with sidebar and topbar
- [x] Responsive sidebar with collapse functionality
- [x] Mobile-friendly navigation with overlay
- [x] User menu with dropdown
- [x] Search functionality in header
- [x] Breadcrumb navigation structure

### Base Components
- [x] Button component with variants (primary, secondary, outline)
- [x] Table component with customization options
- [x] Form layout components
- [x] Logo component with variants (light, dark, neutral)
- [x] Card component for content containers
- [x] Input, Label, and Select components
- [x] Consistent icon system with Lucide React
- [ ] Modal and notification components
- [ ] Loading skeleton components

### User Module
- [x] User list page with table display
- [x] User table component
- [x] Basic user form structure
- [x] Mock data integration
- [ ] Create/edit form with validation
- [ ] User deletion with confirmation
- [ ] User profile management

### Design System
- [x] Design system showcase page
- [x] Component library documentation
- [x] Custom color palette implementation
- [x] Typography system (Poppins + Inter)
- [x] Icon system documentation
- [ ] Component variation examples
- [ ] Accessibility guidelines

### Activities Module
- [x] Activities page structure
- [x] Basic component layout
- [x] Mock activities data
- [ ] Activities list with filtering
- [ ] Create/edit activity forms
- [ ] User enrollment management

### Dashboard
- [x] Dashboard page with statistics
- [x] Quick actions section
- [x] Recent activities display
- [x] Responsive grid layout
- [ ] Real-time data integration
- [ ] Interactive charts and graphs

### Authentication
- [ ] Login/Registration pages
- [ ] Protected route implementation
- [ ] JWT token management
- [ ] Session persistence
- [ ] Password reset functionality

### UX/UI Enhancements
- [x] Responsive design for all screen sizes
- [x] Consistent theme across components
- [x] Semantic HTML structure
- [x] Accessible component design
- [x] Smooth transitions and animations
- [ ] Dark/light mode toggle
- [ ] Advanced animations and micro-interactions
- [ ] Keyboard navigation support

### Performance & Quality
- [ ] Unit tests with React Testing Library
- [ ] Integration tests
- [ ] Code splitting for route-based chunks
- [ ] Bundle size optimization
- [ ] Production build configuration

## 🚀 Key Features

- **Modular Architecture**: Feature-based organization for scalability
- **Consistent UI**: Comprehensive design system with reusable components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG-compliant components with proper ARIA labels
- **Performance**: Optimized with Vite for fast development and builds
- **Developer Experience**: ESLint, Prettier, and organized file structure

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Next Milestones

### Phase 1: Core Functionality
- Complete user management CRUD operations
- Implement form validation system
- Add authentication flow

### Phase 2: Advanced Features
- Activities management system
- Real-time notifications
- Advanced filtering and search

### Phase 3: Polish & Performance
- Dark mode implementation
- Performance optimizations
- Comprehensive testing suite
