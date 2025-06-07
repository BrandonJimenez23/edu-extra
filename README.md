# EduExtra – ERP for Extracurricular Activities Management

**EduExtra** is a full-stack web application designed to help educational institutions manage extracurricular activities in a structured, digital, and user-friendly way.

This platform acts as a hybrid between an **ERP system** and a **public-facing enrollment portal**, offering administrative tools for coordinators and participation access for students, teachers, and local community members.

## 📚 Documentation Navigation

| 📖 Document | 🎯 Purpose | 🔗 Quick Access |
|-------------|------------|-----------------|
| **[📋 Documentation Hub](./docs/README.md)** | Complete documentation index | [All Docs](./docs/) |
| **[🔧 Backend Guide](./backend/README.md)** | Spring Boot API documentation | [Backend Setup](./backend/README.md#getting-started) |
| **[⚛️ Frontend Guide](./frontend/README.md)** | React application guide | [Frontend Setup](./frontend/README.md#development-setup) |
| **[📊 Development Status](./docs/DEVELOPMENT_STATUS.md)** | Current tasks and roadmap | [Immediate Tasks](./docs/DEVELOPMENT_STATUS.md#tareas-inmediatas) |
| **[🏗️ API Design](./docs/api-design-choices.md)** | Architecture decisions | [Design Patterns](./docs/api-design-choices.md) |

### 🚀 Quick Start Paths
- **🏃‍♂️ [Get Started Now](#quick-start)** - Run the full application in 5 minutes
- **👨‍💻 [Development Setup](#development-setup)** - Set up development environment
- **📋 [Current Tasks](./docs/DEVELOPMENT_STATUS.md)** - See what's being worked on
- **🎯 [Next Steps](./docs/DEVELOPMENT_STATUS.md#tareas-inmediatas)** - Join development efforts

---

## 🚀 Features

- 📋 Manage activities with capacity, time, categories, and assignment
- 🧑‍🏫 Role-based access (admin, coordinator, instructor, user)
- 📝 Online registration with filtering and search
- 📈 Activity and user statistics
- 🔐 Secure authentication using JWT and Spring Security
- 🐳 Dockerized infrastructure with PostgreSQL

---

## 🧱 Tech Stack

<table>
<thead>
<tr>
<th align="left">🏗️ Layer</th>
<th align="left">⚙️ Technologies</th>
<th align="left">📋 Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Frontend</strong></td>
<td>
<img src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
<img src="https://img.shields.io/badge/Axios-1.6-5A29E4?style=flat&logo=axios&logoColor=white" alt="Axios">
</td>
<td>Modern React SPA with component-driven architecture</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>
<img src="https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=flat&logo=springboot&logoColor=white" alt="Spring Boot">
<img src="https://img.shields.io/badge/Spring_Security-6-6DB33F?style=flat&logo=springsecurity&logoColor=white" alt="Spring Security">
<img src="https://img.shields.io/badge/Spring_Data_JPA-3-6DB33F?style=flat&logo=spring&logoColor=white" alt="Spring Data JPA">
<img src="https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="Java">
</td>
<td>Enterprise-grade REST API with JWT authentication</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>
<img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/Hibernate-6-59666C?style=flat&logo=hibernate&logoColor=white" alt="Hibernate">
</td>
<td>Robust relational database with advanced ORM</td>
</tr>
<tr>
<td><strong>DevOps</strong></td>
<td>
<img src="https://img.shields.io/badge/Docker-24-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/Docker_Compose-2-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker Compose">
<img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions">
</td>
<td>Containerized infrastructure with automated deployment</td>
</tr>
<tr>
<td><strong>Build Tools</strong></td>
<td>
<img src="https://img.shields.io/badge/Maven-3.9-C71A36?style=flat&logo=apachemaven&logoColor=white" alt="Maven">
<img src="https://img.shields.io/badge/ESLint-8-4B32C3?style=flat&logo=eslint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Prettier-3-F7B93E?style=flat&logo=prettier&logoColor=white" alt="Prettier">
</td>
<td>Dependency management and code quality tools</td>
</tr>
<tr>
<td><strong>Documentation</strong></td>
<td>
<img src="https://img.shields.io/badge/OpenAPI-3-6BA539?style=flat&logo=openapiinitiative&logoColor=white" alt="OpenAPI">
<img src="https://img.shields.io/badge/Swagger-UI-85EA2D?style=flat&logo=swagger&logoColor=black" alt="Swagger">
</td>
<td>Interactive API documentation and testing</td>
</tr>
<tr>
<td><strong>UI/UX</strong></td>
<td>
<img src="https://img.shields.io/badge/Lucide_React-Icons-F56565?style=flat&logo=lucide&logoColor=white" alt="Lucide React">
<img src="https://img.shields.io/badge/Google_Fonts-Poppins/Inter-4285F4?style=flat&logo=googlefonts&logoColor=white" alt="Google Fonts">
</td>
<td>Modern icon system and typography</td>
</tr>
<tr>
<td><strong>Security</strong></td>
<td>
<img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT">
<img src="https://img.shields.io/badge/BCrypt-Password_Hashing-FF6B35?style=flat&logo=spring&logoColor=white" alt="BCrypt">
</td>
<td>Token-based authentication with secure password hashing</td>
</tr>
</tbody>
</table>

---

## 📊 Project Status

### Frontend
- ✅ Feature-based folder structure
- ✅ Reusable UI components (Button, Table, Card, Input, Select, Logo, Switch)
- ✅ Design system with component showcase
- ✅ Semantic HTML structure and accessibility
- ✅ **Complete user management CRUD system**
- ✅ **Unified data management with mock/API toggle**
- ✅ **Enhanced persistent mock data system**
- ✅ API integration with Axios and error handling
- ✅ Icons system with Lucide React
- ✅ Main layout with responsive sidebar and topbar
- ✅ Route system with protected routes
- ✅ **Authentication system with JWT tokens**
- ✅ Dashboard with statistics and quick actions
- ✅ Activities management page
- ✅ User menu with dropdown functionality
- ✅ Search functionality in header
- ✅ Mobile-responsive design
- ✅ Custom color palette and typography (Poppins + Inter)
- ✅ **DataMode Context for development/production switching**
- ⏳ User edit form (final missing piece)
- ⏳ Registration page
- ⏳ Activities CRUD implementation
- ⏳ Dark/light theme toggle

### Backend

- ✅ Domain-driven structure
- ✅ RESTful API for users with full CRUD operations
- ✅ **JWT Authentication system with access/refresh tokens**
- ✅ **User profile endpoint for token validation**
- ✅ **Complete authentication flow implementation**
- ✅ CORS configuration for frontend integration
- ✅ OpenAPI/Swagger documentation
- ✅ Comprehensive exception handling with detailed error responses
- ✅ Spring Security configuration with proper authentication
- ✅ Password encryption with BCrypt
- ✅ **Security context management and token validation**
- ✅ User pagination with advanced filtering
- ✅ Database integration with PostgreSQL
- ⏳ API for activities and enrollments
- ⏳ File upload functionality
- ⏳ Email notifications
- ⏳ Database optimizations and performance tuning

---

### DevOps & Infrastructure
- ✅ Docker configuration for all services
- ✅ Docker Compose orchestration
- ✅ PostgreSQL database setup
- ⏳ CI/CD pipeline with GitHub Actions
- ⏳ Production deployment configuration
- ⏳ Environment-specific configurations
- ⏳ Health checks and monitoring

---

## 🗂️ Project Structure

```plaintext
edu-extra/
├── backend/                # Java Spring Boot API
│   ├── eduextra-api/       # Main API
│   │   ├── src/            # Source code
│   │   │   ├── main/       # Application code
│   │   │   └── test/       # Tests
│   │   ├── pom.xml         # Maven dependencies
│   │   └── Dockerfile      # Docker configuration
├── frontend/               # React + Vite app
│   ├── src/                # Source code
│   │   ├── api/            # API configuration
│   │   ├── components/     # Reusable components
│   │   │   ├── layouts/    # Layout components
│   │   │   └── ui/         # UI components
│   │   ├── constants/      # Application constants
│   │   ├── features/       # Domain modules
│   │   ├── hooks/          # Custom hooks
│   │   ├── layout/         # Main layout
│   │   ├── pages/          # Page components
│   │   └── styles/         # CSS styles
│   ├── package.json        # npm dependencies
│   └── Dockerfile          # Docker configuration
├── docker-compose.yml      # Container configuration
└── README.md               # This file
```

---

## 🐳 Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd edu-extra

# Start all services
docker compose up --build

# Access the applications
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
# PostgreSQL: localhost:5433
```

### Development Setup
```bash
# Frontend development
cd frontend
npm install
npm run dev

# Backend development  
cd backend/eduextra-api
./mvnw spring-boot:run
```

---

## 📚 Documentation

- **API Documentation**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Frontend Components**: Available at `/design-system` route
- **Backend README**: [backend/README.md](backend/README.md)
- **Frontend README**: [frontend/README.md](frontend/README.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is currently for educational and portfolio purposes only.

---

## 👤 Author

Brandon Jiménez Villarroel  
[GitHub](https://github.com/BrandonJimenez23) · [LinkedIn](https://linkedin.com/in/brandonjimenez23)

---

## 🎯 Next Development Phases

### Phase 1: Final User Management (IMMEDIATE)
- ✅ Complete authentication system with token validation
- ✅ Unified data management with mock/API switching
- ✅ User creation, deletion, enable/disable functionality
- ⏳ **User edit form implementation** (final missing piece)
- ⏳ **Registration page for new user signup**

### Phase 2: Activities Management System
- Activities CRUD operations (Create, Read, Update, Delete)
- Activity categories and scheduling
- Capacity management and enrollment limits
- Activity search and filtering
- Activity status management

### Phase 3: Advanced Features
- File upload functionality for user avatars
- Email notification system
- Advanced search and filtering across modules
- Role-based access control refinement
- Dashboard analytics and reporting

### Phase 4: Production Readiness
- Comprehensive testing suite (unit, integration, e2e)
- Performance optimizations and caching
- Production deployment pipeline with CI/CD
- Monitoring, logging, and health checks
- Security audit and penetration testing

---

## 📝 Recent Achievements

### ✅ Authentication System
- Fixed authentication persistence across page reloads
- Implemented `/users/profile` endpoint for token validation
- Complete JWT token management with refresh tokens
- Secure login/logout functionality

### ✅ Unified Data Management
- Created DataMode Context for switching between mock and real data
- Enhanced mock data system with localStorage persistence
- Session-persistent mock operations (create, update, delete, enable/disable)
- Real-time data synchronization between modes

### ✅ User Management System
- Complete CRUD operations for users
- Advanced pagination with filtering by name and role
- User enable/disable functionality
- Comprehensive error handling and validation
- Modern responsive UI with loading states

---

## 📚 Documentation & Resources

### 📖 Complete Documentation Hub
Visit our [**Documentation Center**](./docs/README.md) for comprehensive guides, architecture decisions, and development resources.

### 🔗 Quick Reference Links

#### 📋 Essential Guides
| Resource | Description | Link |
|----------|-------------|------|
| **🚀 Getting Started** | Quick setup and first run | [Setup Guide](#quick-start) |
| **🔧 Backend API** | Spring Boot development guide | [Backend Docs](./backend/README.md) |
| **⚛️ Frontend App** | React development guide | [Frontend Docs](./frontend/README.md) |
| **📊 Project Status** | Current tasks and roadmap | [Development Status](./docs/DEVELOPMENT_STATUS.md) |

#### 🏗️ Architecture & Design
| Resource | Description | Link |
|----------|-------------|------|
| **🎯 API Design** | Design patterns and decisions | [API Design Choices](./docs/api-design-choices.md) |
| **📚 All Documentation** | Complete documentation index | [Documentation Hub](./docs/README.md) |
| **📝 Documentation Summary** | Recent documentation updates | [Doc Summary](./docs/DOCUMENTATION_SUMMARY.md) |

### 🛠️ Development Resources

#### 🔗 Local Development URLs
- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
- **API Documentation**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Database**: `localhost:5433` (PostgreSQL)

#### 📱 Key Application Routes
- **Login**: [http://localhost:5173/login](http://localhost:5173/login)
- **Dashboard**: [http://localhost:5173/dashboard](http://localhost:5173/dashboard)
- **Users Management**: [http://localhost:5173/users](http://localhost:5173/users)
- **Design System**: [http://localhost:5173/design-system](http://localhost:5173/design-system)

#### 🔧 Development Commands
```bash
# Full application (Docker)
docker-compose up

# Frontend development
cd frontend && npm run dev

# Backend development
cd backend/eduextra-api && ./mvnw spring-boot:run
```

### 🎯 Current Development Focus

#### ⚡ Immediate Tasks (This Week)
- [**User Edit Form**](./docs/DEVELOPMENT_STATUS.md#1-formulario-de-edición-de-usuario-crítico---pieza-final-faltante) - Complete the user editing functionality
- [**Registration Page**](./docs/DEVELOPMENT_STATUS.md#2-página-de-registro) - Implement user registration

#### 🚀 Next Phase (Activities Management)
- Activity CRUD operations
- Activity scheduling and capacity management
- Enhanced search and filtering

#### 📈 Future Enhancements
- File upload functionality
- Real-time notifications
- Advanced reporting
- Mobile application

### 💻 Contributing & Development

#### 🤝 How to Contribute
1. **Check Current Tasks**: Review [Development Status](./docs/DEVELOPMENT_STATUS.md)
2. **Choose a Task**: Pick from immediate or upcoming tasks
3. **Setup Environment**: Follow [Development Setup](#development-setup)
4. **Read Architecture**: Understand [API Design](./docs/api-design-choices.md)

#### 📋 Development Workflow
1. **Backend First**: Implement API endpoints following REST patterns
2. **Frontend Integration**: Connect React components to API
3. **Testing**: Validate functionality with both mock and real data
4. **Documentation**: Update relevant documentation

#### 🔍 Code Structure Reference
```
├── docs/                    # 📚 Complete documentation
├── backend/                 # 🔧 Spring Boot API
│   └── eduextra-api/       # Main application
├── frontend/               # ⚛️ React application  
│   └── src/
│       ├── components/     # UI components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       └── api/           # API integration
└── docker/                 # 🐳 Container configurations
```

---

## 📞 Support & Contact

- **Project Documentation**: [docs/README.md](./docs/README.md)
- **Issues**: Create GitHub issues for bugs or feature requests
- **Development Questions**: Check [Development Status](./docs/DEVELOPMENT_STATUS.md) for current focus

---

*EduExtra - Empowering educational institutions with modern extracurricular activity management*
