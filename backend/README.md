# EduExtra Backend (Spring Boot)

## 🧱 Technologies Used

- **Java 17+**: Java version used for development
- **Spring Boot 3**: Framework for Java application development
- **Spring Security**: Authentication and authorization management
- **Spring Data JPA**: For data access and manipulation
- **PostgreSQL**: Relational database
- **Hibernate**: ORM for object-relational mapping
- **Lombok**: Reduction of boilerplate code
- **Swagger/OpenAPI**: Automatic API documentation
- **JUnit 5 & Mockito**: Unit and integration testing

## 📦 Folder Structure

```plaintext
eduextra-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/eduextra/
│   │   │       ├── activity/       # Activities module
│   │   │       │   ├── controller/
│   │   │       │   ├── dto/
│   │   │       │   ├── model/
│   │   │       │   ├── repository/
│   │   │       │   └── service/
│   │   │       ├── config/         # Application configuration
│   │   │       ├── enrollment/     # Enrollments module
│   │   │       ├── exception/      # Centralized exception handling
│   │   │       ├── shared/         # Shared components
│   │   │       └── user/           # Users module
│   │   │           ├── controller/
│   │   │           ├── dto/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           └── service/
│   │   └── resources/
│   │       ├── application.properties      # Main properties
│   │       ├── application-dev.properties  # Development properties
│   │       └── application-prod.properties # Production properties
│   └── test/                      # Unit and integration tests
│       └── java/
│           └── com/eduextra/
├── pom.xml                        # Maven dependencies
└── Dockerfile                     # Docker configuration
```

## 🚀 Features

- **Domain-Driven Architecture**: Clear separation by modules
- **RESTful API**: Well-defined endpoints with standard HTTP methods
- **Security**: JWT authentication
- **Data Validation**: Automatic DTO validation
- **Exception Handling**: Centralized exception handling system
- **Standardized Responses**: Consistent error responses with validation details
- **API Documentation**: Comprehensive documentation with Swagger/OpenAPI
- **Execution Profiles**: Separate configurations for dev/prod
- **Role System**: Role-based access control (RBAC)

## ✅ Progress Checklist

### Initial Setup

- [x] Project structure
- [x] Database configuration
- [x] CORS configuration
- [x] Swagger/OpenAPI configuration

### Users Module

- [x] Model and entities
- [x] Repository and service
- [x] CRUD endpoints
- [x] Request/response DTOs
- [x] Enable/disable user
- [x] Improved exception handling
- [x] Form validation with detailed error responses
- [ ] Password recovery

### Security

- [ ] JWT authentication implementation
- [ ] Spring Security configuration
- [ ] Password encryption
- [ ] Role and permission control

### Activities Module

- [ ] Model and entities
- [ ] Repository and service
- [ ] CRUD endpoints
- [ ] User assignment

### Enrollments Module

- [ ] Model and entities
- [ ] Repository and service
- [ ] CRUD endpoints
- [ ] Enrollment/cancellation logic

### API Documentation

- [x] Setup Swagger/OpenAPI
- [x] Document API endpoints
- [x] Include error responses in documentation
- [x] Standardized error handling with validation details
- [ ] Add examples for requests/responses
- [ ] Improve model documentation

### API Design Patterns

- [x] RESTful resource-based routing
- [x] Proper HTTP status codes usage
- [x] Standardized error responses
- [x] DTOs for request/response separation
- [ ] Response envelope pattern (considered but not implemented for simplicity)
- [ ] HATEOAS links

### Tests

- [ ] Service unit tests
- [ ] Endpoint integration tests
- [ ] Security tests

### Deployment

- [x] Docker configuration 
- [ ] CI/CD pipeline integration
- [ ] Production environment setup
- [ ] Pipeline CI/CD
- [ ] Scripts de migración de base de datos
- [ ] Documentación para despliegue
