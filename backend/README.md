# EduExtra Backend API

Spring Boot REST API for managing extracurricular activities with JWT authentication, role-based access control, and comprehensive documentation.

## 🧱 Technologies Used

- **Java 17**: Modern Java version with enhanced features
- **Spring Boot 3**: Enterprise-grade framework for Java applications
- **Spring Security 6**: Advanced authentication and authorization
- **Spring Data JPA**: Simplified data access layer
- **PostgreSQL**: Robust relational database
- **Hibernate**: Advanced ORM with optimizations
- **Lombok**: Reduced boilerplate code
- **Swagger/OpenAPI 3**: Interactive API documentation
- **Maven**: Dependency management and build automation
- **JUnit 5 & Mockito**: Testing framework and mocking
- **Docker**: Containerization support

## 📦 Project Structure

```plaintext
eduextra-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/eduextra/
│   │   │       ├── activity/           # Activities domain
│   │   │       │   ├── controller/     # REST endpoints
│   │   │       │   ├── dto/           # Data transfer objects
│   │   │       │   ├── model/         # JPA entities
│   │   │       │   ├── repository/    # Data access layer
│   │   │       │   └── service/       # Business logic
│   │   │       ├── auth/              # Authentication module
│   │   │       │   ├── controller/    # Auth endpoints
│   │   │       │   ├── dto/          # Auth DTOs
│   │   │       │   └── service/      # Auth services
│   │   │       ├── common/            # Shared components
│   │   │       │   ├── dto/          # Common DTOs
│   │   │       │   └── exception/    # Exception handling
│   │   │       ├── config/            # Configuration classes
│   │   │       ├── enrollment/        # Enrollments domain
│   │   │       ├── security/          # Security configuration
│   │   │       │   ├── CustomUserDetailsService.java
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   ├── JwtService.java
│   │   │       │   └── SecurityConfig.java
│   │   │       └── user/              # Users domain
│   │   │           ├── controller/    # User REST endpoints
│   │   │           ├── dto/          # User DTOs
│   │   │           ├── model/        # User entities
│   │   │           ├── repository/   # User data access
│   │   │           └── service/      # User business logic
│   │   └── resources/
│   │       ├── application.properties        # Main configuration
│   │       ├── application-dev.properties    # Development config
│   │       ├── application-prod.properties   # Production config
│   │       └── application-test.properties   # Testing config
│   └── test/                        # Test suites
│       └── java/
│           └── com/eduextra/
├── target/                          # Compiled artifacts
├── pom.xml                         # Maven configuration
└── Dockerfile                      # Container configuration
```

## 🚀 Key Features

- **Domain-Driven Architecture**: Clean separation of concerns by business domains
- **RESTful API Design**: Standard HTTP methods with proper status codes
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Role-Based Access Control**: Granular permission system
- **Data Validation**: Comprehensive DTO validation with detailed error responses
- **Exception Handling**: Centralized error handling with standardized responses
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Pagination Support**: Efficient data pagination with filtering
- **Environment Profiles**: Separate configurations for dev/test/prod
- **Security First**: Spring Security integration with JWT filters

## ✅ Implementation Status

### Infrastructure & Setup
- [x] Project structure with domain-driven design
- [x] PostgreSQL database integration
- [x] CORS configuration for frontend integration
- [x] Swagger/OpenAPI 3 documentation setup
- [x] Docker containerization
- [x] Environment-specific configurations
- [x] Maven build configuration

### Security Implementation

- [x] JWT token generation and validation
- [x] Spring Security configuration with CORS support
- [x] JWT authentication filter with proper error handling
- [x] Custom UserDetailsService implementation
- [x] Refresh token system (7-day expiration)
- [x] **Access token system (15-minute expiration)**
- [x] Password encryption with BCrypt
- [x] **Security context management for user authentication**
- [x] **User profile endpoint for token validation**
- [x] **Fixed authentication persistence across page reloads**
- [ ] Role-based endpoint protection
- [ ] API rate limiting
- [ ] Security audit logging

### Users Module

- [x] User entity with JPA annotations
- [x] User repository with custom queries
- [x] User service with comprehensive business logic
- [x] **Complete CRUD REST endpoints with proper validation**
- [x] User registration and authentication
- [x] **User profile endpoint (`/users/profile`) for current user**
- [x] Request/response DTOs with validation
- [x] User enable/disable functionality
- [x] **Advanced pagination support with filtering by name and role**
- [x] Comprehensive validation with detailed error messages
- [x] **Email uniqueness validation and conflict handling**
- [x] **Password update functionality in user updates**
- [ ] Password recovery system
- [ ] User profile image upload
- [ ] User activity logging

### Authentication System

- [x] User registration endpoint
- [x] User login with JWT generation
- [x] Refresh token endpoint
- [x] **Token validation middleware with proper error handling**
- [x] **User profile endpoint for current authenticated user**
- [x] Authentication DTOs (LoginRequest, AuthResponse)
- [x] Custom authentication service
- [x] **Complete authentication flow with persistent sessions**
- [x] **Security context integration for user identification**
- [ ] Password reset flow
- [ ] Email verification
- [ ] Two-factor authentication

### Data Management
- [x] Generic pagination DTO (PagedResponseDTO)
- [x] Standardized error responses
- [x] Validation error details
- [x] Custom exception handling
- [x] Database constraints and indexes
- [ ] Database migration scripts
- [ ] Data seeding for development
- [ ] Backup and recovery procedures

### API Documentation
- [x] Swagger/OpenAPI configuration
- [x] Endpoint documentation with examples
- [x] Error response documentation
- [x] Security scheme documentation
- [x] DTO schema documentation
- [ ] API versioning strategy
- [ ] Comprehensive request/response examples
- [ ] Performance considerations documentation

### Activities Module
- [ ] Activity entity design
- [ ] Activity repository and service
- [ ] Activity CRUD endpoints
- [ ] Activity categories and tags
- [ ] Capacity management
- [ ] Schedule management

### Enrollments Module
- [ ] Enrollment entity relationships
- [ ] Enrollment business logic
- [ ] Enrollment/cancellation endpoints
- [ ] Waitlist management
- [ ] Enrollment notifications

### Testing & Quality
- [x] Basic integration tests
- [x] User controller tests
- [ ] Service layer unit tests
- [ ] Security integration tests
- [ ] Database integration tests
- [ ] API contract testing

### DevOps & Deployment
- [x] Docker configuration
- [x] Multi-stage Dockerfile
- [x] Docker Compose integration
- [ ] CI/CD pipeline configuration
- [ ] Production environment setup
- [ ] Database migration automation
- [ ] Health check endpoints
- [ ] Monitoring and logging

---

## 🚧 Current Status & Next Steps

### ✅ COMPLETED - Authentication & User Management
- **Authentication Flow**: Complete JWT-based authentication with access/refresh tokens
- **User Profile Endpoint**: `/users/profile` for token validation and session persistence
- **CRUD Operations**: Full user management with pagination, filtering, and validation
- **Security Integration**: Spring Security with CORS, password encryption, and context management
- **Database Integration**: PostgreSQL with proper constraints and relationships

### ⏳ IMMEDIATE NEXT TASKS

#### 1. User Edit Functionality
- Frontend: Complete user edit form implementation
- Validation: Ensure proper field validation and error handling
- Integration: Connect edit form with existing PUT `/users/{id}` endpoint

#### 2. Registration System
- Frontend: Create registration page with form validation
- Backend: Validate registration endpoint handles all edge cases
- Security: Ensure proper password requirements and email validation

#### 3. Activities Module (Next Major Feature)
- Entity Design: Create Activity entity with proper relationships
- Repository Layer: Implement ActivityRepository with custom queries
- Service Layer: Business logic for activity management
- Controller Layer: RESTful endpoints for activity CRUD
- Frontend Integration: Activities management interface

### 🎯 DEVELOPMENT ROADMAP

#### Sprint 1: Complete User Management (1-2 days)
- [ ] User edit form implementation
- [ ] Registration page creation
- [ ] Enhanced form validations
- [ ] User profile management

#### Sprint 2: Activities Foundation (3-5 days)
- [ ] Activity entity and database schema
- [ ] Basic CRUD endpoints for activities
- [ ] Activity categories system
- [ ] Frontend activities management page

#### Sprint 3: Activities Advanced Features (3-5 days)
- [ ] Activity scheduling and capacity management
- [ ] Enrollment system design
- [ ] Activity search and filtering
- [ ] Activity status management

#### Sprint 4: Polish & Testing (2-3 days)
- [ ] Comprehensive testing suite
- [ ] Performance optimizations
- [ ] UI/UX improvements
- [ ] Documentation updates

---

## 🔐 Security Features

### JWT Implementation
- **Access Tokens**: Short-lived (15 minutes) for API access
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Token Validation**: Signature verification and expiration checks
- **Security Context**: Automatic user context from valid tokens

### Authentication Flow
1. User credentials → Login endpoint
2. Credentials validation → JWT generation
3. Access token + Refresh token returned
4. Access token in Authorization header
5. Token validation on protected endpoints
6. Refresh token for access token renewal

## 📊 API Endpoints Overview

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication  
- `POST /auth/refresh-token` - Token renewal

### Users Management

- `GET /users` - List all users
- `GET /users/paginated` - Paginated user list with filters
- `GET /users/{id}` - Get user by ID
- `GET /users/profile` - **Get current authenticated user profile**
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `PATCH /users/{id}/enable` - **Enable user**
- `PATCH /users/{id}/disable` - **Disable user**
- `DELETE /users/{id}/permanent` - **Permanently delete user**

### Documentation
- `GET /swagger-ui.html` - Interactive API documentation
- `GET /v3/api-docs` - OpenAPI specification

## 🎯 Next Development Phases

### Phase 1: Core Features Completion
- Activities management system
- Enrollment workflow
- Role-based access control implementation

### Phase 2: Advanced Features
- File upload functionality
- Email notification system
- Advanced search and filtering

### Phase 3: Production Readiness
- Comprehensive testing suite
- Performance optimizations
- Production deployment pipeline
- Monitoring and alerting
