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

## 🚀 Quick Start

### Prerequisites
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

### Development Setup

1. **Clone and Setup Database**
   ```bash
   # Start PostgreSQL database
   docker run --name eduextra-db -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:15
   
   # Create database
   createdb -h localhost -U postgres eduextra_db
   ```

2. **Run Application**
   ```bash
   cd backend/eduextra-api
   ./mvnw spring-boot:run
   ```

3. **Access API Documentation**
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - API Docs: http://localhost:8080/v3/api-docs

### Environment Configuration

The application supports multiple profiles:

- **Development**: `application-dev.properties`
- **Production**: `application-prod.properties`
- **Testing**: `application-test.properties`

### Docker Deployment

```bash
# Build and run with Docker Compose (from project root)
docker compose up --build
```

## 📊 Current Implementation Status

### ✅ Completed Features
- **JWT Authentication**: Complete token-based authentication system
- **User Management**: Full CRUD operations with pagination and filtering
- **Security**: Spring Security integration with CORS and password encryption
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Database Integration**: PostgreSQL with proper entity relationships

### 🚧 In Development
- **Activities Management**: Entity design and CRUD operations
- **Enrollment System**: User-activity relationship management

> **Note**: For detailed development progress and task tracking, see [DEVELOPMENT_STATUS.md](../docs/DEVELOPMENT_STATUS.md)

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

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication  
- `POST /auth/refresh-token` - Token renewal

### Users Management
- `GET /users` - List all users
- `GET /users/paginated` - Paginated user list with filters
- `GET /users/{id}` - Get user by ID
- `GET /users/profile` - Get current authenticated user profile
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `PATCH /users/{id}/enable` - Enable user
- `PATCH /users/{id}/disable` - Disable user
- `DELETE /users/{id}/permanent` - Permanently delete user

### Documentation
- `GET /swagger-ui.html` - Interactive API documentation
- `GET /v3/api-docs` - OpenAPI specification

## 🧪 Testing

Run the test suite:
```bash
./mvnw test
```

Run specific test class:
```bash
./mvnw test -Dtest=UserControllerTest
```

## 📚 Additional Resources

- [Architecture Documentation](../docs/ARCHITECTURE.md)
- [API Documentation](http://localhost:8080/swagger-ui.html) (when running)
- [Development Status](../docs/DEVELOPMENT_STATUS.md)
- [Contributing Guidelines](../docs/CONTRIBUTING.md)
