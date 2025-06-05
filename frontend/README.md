# EduExtra Frontend

## 🧱 Technologies Used

- **React**: JavaScript library for building user interfaces
- **Vite**: Fast development tool for React applications
- **TailwindCSS**: Utility-first CSS framework for rapid and consistent design
- **Axios**: HTTP client for making API requests
- **React Router**: Navigation between components
- **ESLint/Prettier**: Code linting and formatting tools
- **Lucide React**: Icon library for modern UI components

## 📦 Estructura de Carpetas

```plaintext
frontend/
├── public/               # Archivos estáticos
├── src/                  # Código fuente
│   ├── api/              # Configuración y funciones de API
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes genéricos reutilizables
│   │   ├── layouts/      # Layouts reutilizables (Table, etc.)
│   │   └── ui/           # Componentes de UI (Button, Modal, etc.)
│   ├── features/         # Módulos de la aplicación
│   │   ├── users/        # Módulo de usuarios
│   │   │   ├── components/   # Componentes específicos de usuarios
│   │   │   └── pages/        # Páginas de usuarios
│   │   └── activities/   # Módulo de actividades
│   │       ├── components/   # Componentes específicos de actividades
│   │       └── pages/        # Páginas de actividades
│   ├── hooks/            # Hooks personalizados
│   ├── layout/           # Layout principal de la aplicación
│   ├── pages/            # Páginas principales
│   ├── styles/           # Estilos globales y específicos
│   └── utils/            # Utilidades y funciones auxiliares
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de TailwindCSS
└── vite.config.js        # Configuración de Vite
```

## 🚀 Características

- **Diseño Modular**: Organización basada en características (features)
- **UI Consistente**: Sistema de componentes reutilizables
- **Gestión de Estado**: Hooks personalizados para cada dominio
- **Manejo de Errores**: Sistema centralizado para manejo de errores de API
- **Estilos Personalizados**: Componentes con variantes (primary, secondary, etc.)
- **Tablas Dinámicas**: Con soporte para bordes, hover, zebra, y diferentes tamaños

## ✅ Progress Checklist

### Initial Setup

- [x] Configure project with Vite
- [x] Integrate TailwindCSS
- [x] Configure routes with React Router
- [x] Configure Axios for API calls

### Base Components

- [x] Reusable buttons with variants (primary, secondary, etc.)
- [x] Reusable table with customization options
- [x] Reusable forms with layout components
- [x] Logo component with variants (light, dark, neutral)
- [x] Card component
- [x] Input and Label components
- [x] Select component
- [ ] Modals and notifications

### User Module

- [x] User list
- [x] User table
- [x] User form basic structure
- [ ] Create/edit form with validation
- [ ] User deletion with confirmation

### Design System

- [x] Design system showcase page
- [x] Component library documentation
- [x] Consistent color schemes and dimensions
- [x] Icon system with Lucide React
- [ ] Component variation documentation

### Activities Module

- [x] Basic component structure
- [ ] Activities list
- [ ] Create/edit form
- [ ] User assignment to activities

### Authentication

- [ ] Login/Registration
- [ ] Route protection
- [ ] JWT token management

### UX/UI

- [x] Responsive design
- [x] Consistent theme
- [x] Semantic HTML structure
- [x] Accessible components
- [ ] Dark/light mode
- [ ] Animations and transitions

### Testing and Deployment

- [ ] Unit tests
- [ ] Integration tests
- [ ] Production configuration
- [ ] Automatic deployment

## 📝 Future Enhancements

### Component Library

- [ ] Create a storybook documentation for components
- [ ] Implement error boundary components
- [ ] Create skeleton loaders for data fetching states
- [ ] Add form validation library integration

### Performance Optimization

- [ ] Implement code splitting for larger modules
- [ ] Add React.memo for performance-critical components
- [ ] Set up bundle analysis tools

### Developer Experience

- [ ] Add TypeScript integration
- [ ] Set up Husky for Git hooks
- [ ] Configure unit tests with React Testing Library
