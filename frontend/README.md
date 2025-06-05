# EduExtra Frontend

## 🧱 Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de desarrollo rápida para aplicaciones React
- **TailwindCSS**: Framework CSS utilitario para diseño rápido y consistente
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **React Router**: Navegación entre componentes
- **ESLint/Prettier**: Herramientas de linting y formato de código

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

## ✅ Checklist de Progreso

### Configuración Inicial
- [x] Configurar proyecto con Vite
- [x] Integrar TailwindCSS
- [x] Configurar rutas con React Router
- [x] Configurar Axios para llamadas a la API

### Componentes Base
- [x] Botones reutilizables con variantes
- [x] Tabla reutilizable con opciones de personalización
- [ ] Formularios reutilizables con validación
- [ ] Modales y notificaciones

### Módulo de Usuarios
- [x] Lista de usuarios
- [x] Tabla de usuarios
- [ ] Formulario de creación/edición
- [ ] Validación de formularios
- [ ] Eliminación con confirmación

### Módulo de Actividades
- [x] Estructura de componentes básicos
- [ ] Lista de actividades
- [ ] Formulario de creación/edición
- [ ] Asignación de usuarios a actividades

### Autenticación
- [ ] Login/Registro
- [ ] Protección de rutas
- [ ] Manejo de tokens JWT

### UX/UI
- [x] Diseño responsivo
- [x] Tema consistente
- [ ] Modo oscuro/claro
- [ ] Animaciones y transiciones

## 🧪 Pruebas y Despliegue
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Configuración para producción
- [ ] Despliegue automático

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
