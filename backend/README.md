# EduExtra Backend (Spring Boot)

## 🧱 Tecnologías Utilizadas

- **Java 17+**: Versión de Java utilizada para el desarrollo
- **Spring Boot 3**: Framework para desarrollo de aplicaciones Java
- **Spring Security**: Manejo de autenticación y autorización
- **Spring Data JPA**: Para acceso y manipulación de datos
- **PostgreSQL**: Base de datos relacional
- **Hibernate**: ORM para mapeo objeto-relacional
- **Lombok**: Reducción de código boilerplate
- **Swagger/OpenAPI**: Documentación automática de la API
- **JUnit 5 & Mockito**: Testing unitario e integración

## 📦 Estructura de Carpetas

```
eduextra-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/eduextra/
│   │   │       ├── activity/       # Módulo de actividades
│   │   │       │   ├── controller/
│   │   │       │   ├── dto/
│   │   │       │   ├── model/
│   │   │       │   ├── repository/
│   │   │       │   └── service/
│   │   │       ├── config/         # Configuraciones de la aplicación
│   │   │       ├── enrollment/     # Módulo de inscripciones
│   │   │       ├── exception/      # Manejo de excepciones centralizado
│   │   │       ├── shared/         # Componentes compartidos
│   │   │       └── user/           # Módulo de usuarios
│   │   │           ├── controller/
│   │   │           ├── dto/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           └── service/
│   │   └── resources/
│   │       ├── application.properties      # Propiedades principales
│   │       ├── application-dev.properties  # Propiedades de desarrollo
│   │       └── application-prod.properties # Propiedades de producción
│   └── test/                      # Pruebas unitarias e integración
│       └── java/
│           └── com/eduextra/
├── pom.xml                        # Dependencias Maven
└── Dockerfile                     # Configuración para Docker
```

## 🚀 Características

- **Arquitectura por Dominios**: Separación clara por módulos
- **API RESTful**: Endpoints bien definidos con métodos HTTP estándar
- **Seguridad**: Autenticación con JWT
- **Validación de Datos**: Validación automática de DTOs
- **Manejo de Excepciones**: Sistema centralizado para excepciones
- **Documentación**: API documentada con Swagger/OpenAPI
- **Perfiles de Ejecución**: Configuraciones separadas para dev/prod
- **Sistema de Roles**: Control de acceso basado en roles (RBAC)

## ✅ Checklist de Progreso

### Configuración Inicial
- [x] Estructura del proyecto
- [x] Configuración de base de datos
- [x] Configuración CORS
- [x] Configuración de Swagger/OpenAPI

### Módulo de Usuarios
- [x] Modelo y entidades
- [x] Repositorio y servicio
- [x] Endpoints CRUD
- [x] DTOs de request/response
- [x] Habilitar/deshabilitar usuario
- [ ] Recuperación de contraseña

### Seguridad
- [ ] Implementación de autenticación JWT
- [ ] Configuración de Spring Security
- [ ] Encriptación de contraseñas
- [ ] Control de roles y permisos

### Módulo de Actividades
- [ ] Modelo y entidades
- [ ] Repositorio y servicio
- [ ] Endpoints CRUD
- [ ] Asignación de usuarios

### Módulo de Inscripciones
- [ ] Modelo y entidades
- [ ] Repositorio y servicio
- [ ] Endpoints CRUD
- [ ] Lógica de inscripción/cancelación

### Pruebas
- [ ] Tests unitarios de servicios
- [ ] Tests de integración para endpoints
- [ ] Tests de seguridad

### Despliegue
- [x] Configuración de Docker
- [ ] Pipeline CI/CD
- [ ] Scripts de migración de base de datos
- [ ] Documentación para despliegue
