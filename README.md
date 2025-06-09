# EduExtra – ERP for Extracurricular Activities Management

**A modern full-stack platform to digitize and manage extracurricular activities in educational institutions.**

## 🎯 What Is EduExtra?

EduExtra is a hybrid between an **ERP system** and a **public-facing enrollment portal**. It empowers educational centers to organize, schedule, and track extracurricular activities efficiently.

🎓 **Portfolio Project**: Designed during academic formation and rebuilt with **enterprise-grade tools**, EduExtra demonstrates **real-world full-stack developer proficiency** across modern web technologies.

## 📋 Table of Contents

| 📄 **Section** | 📝 **Description** |
|----------------|-------------------|
| [🐳 Getting Started](#-getting-started) | Quick setup and installation |
| [🚀 Features](#-features) | Key platform capabilities |
| [🧱 Tech Stack](#-tech-stack) | Technologies and architecture |
| [🏗️ Architecture](#-architecture) | System design and patterns |
| [📊 Project Status](#-project-status) | Current development state |
| [🗺️ Roadmap](#-roadmap) | Development phases and future plans |
| [💼 Portfolio Highlights](#-portfolio-highlights) | Key technical achievements |
| [📚 Technical Documentation](#-technical-documentation) | Development resources and guides |

### 📚 **Technical Resources**

| 📖 **Resource** | 🎯 **Purpose** |
|----------------|----------------|
| [📋 Documentation Hub](./docs/README.md) | Complete technical documentation |
| [🔧 Backend Guide](./backend/README.md) | Spring Boot API development |
| [⚛️ Frontend Guide](./frontend/README.md) | React application development |
| [📊 Development Status](./docs/DEVELOPMENT_STATUS.md) | Current tasks and detailed roadmap |
| [🏗️ API Design](./docs/api-design-choices.md) | Architecture decisions and patterns |

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

## 🚀 Features

- 📋 Manage activities with capacity, time, categories, and assignment
- 🧑‍🏫 Role-based access (admin, coordinator, instructor, user)
- 📝 Online registration with filtering and search
- 📈 Activity and user statistics
- 🔐 Secure authentication using JWT and Spring Security
- 🐳 Dockerized infrastructure with PostgreSQL

---

## 🧱 Tech Stack

| 🏗️ **Layer** | ⚙️ **Technologies** | 📋 **Description** |
|-------------|-------------------|-------------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | Modern React SPA with component-driven architecture |
| **Backend** | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat&logo=springsecurity&logoColor=white) ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white) | Enterprise-grade REST API with JWT authentication |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=flat&logo=hibernate&logoColor=white) | Robust relational database with advanced ORM |
| **DevOps** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat&logo=docker&logoColor=white) | Containerized infrastructure with automated deployment |
| **Tools** | ![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat&logo=apachemaven&logoColor=white) ![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat&logo=openapiinitiative&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Build tools, documentation, and security |

---

## 📊 Project Status

### 🎯 Current Status

**Frontend**: ✅ Authentication system, user management CRUD, responsive UI with TailwindCSS, component library  
**Backend**: ✅ JWT authentication, user API endpoints, Spring Security, OpenAPI documentation  
**Infrastructure**: ✅ Docker containerization, PostgreSQL database, development environment  

### 🚀 Next Steps

- User edit form and registration page
- Activities management system
- Enhanced search and reporting

*For detailed development status and task breakdown, see [Development Status](./docs/DEVELOPMENT_STATUS.md)*

---

## 🗺️ Roadmap

### ✅ **Completed (Current State)**
- Full-stack authentication system with JWT
- User management with CRUD operations  
- Responsive React frontend with TailwindCSS
- Spring Boot API with OpenAPI documentation
- Docker development environment

### 🚧 **In Progress**
- User edit form and registration page
- Enhanced UI/UX improvements

### 🎯 **Planned Features**
- **Activities Management**: Complete CRUD for extracurricular activities
- **Enrollment System**: Student registration and capacity management  
- **Reporting Dashboard**: Analytics and activity statistics
- **Mobile Optimization**: Enhanced responsive design

### 🚀 **Future Enhancements**
- File upload functionality
- Real-time notifications
- Advanced search and filtering
- Production deployment with CI/CD

*This roadmap demonstrates planned feature development and technical growth in full-stack development.*

---

## 🏗️ Architecture

### 🎯 System Design

EduExtra follows **modern enterprise patterns** with clear separation of concerns:

**🔧 Backend (Spring Boot)**
- **Domain-Driven Design**: Organized by business domains (users, activities, enrollments)
- **RESTful API**: Clean endpoints following REST principles
- **Security-First**: JWT authentication with Spring Security
- **Data Layer**: JPA/Hibernate with PostgreSQL for robust data persistence

**⚛️ Frontend (React)**
- **Component-Based**: Modular UI components with TailwindCSS
- **State Management**: Context API for authentication and data modes
- **Modern Tooling**: Vite for fast development, ESLint for code quality
- **Responsive Design**: Mobile-first approach with accessible UI

**🐳 Infrastructure**
- **Containerization**: Docker & Docker Compose for consistent environments
- **Development/Production**: Environment-specific configurations
- **Database**: PostgreSQL with connection pooling and migrations

### 📁 Project Organization

```
edu-extra/
├── backend/eduextra-api/           # 🔧 Spring Boot REST API
│   ├── src/main/java/com/eduextra/
│   │   ├── auth/                   # Authentication & JWT handling
│   │   ├── user/                   # User management domain
│   │   ├── activity/               # Activities domain (in progress)
│   │   └── config/                 # Security & CORS configuration
│   └── src/main/resources/         # Application properties & DB config
├── frontend/src/                   # ⚛️ React SPA
│   ├── components/ui/              # Reusable UI components
│   ├── features/                   # Domain-specific components
│   │   ├── auth/                   # Login, protected routes
│   │   └── users/                  # User management CRUD
│   ├── contexts/                   # Global state (auth, data mode)
│   └── api/                        # HTTP client & API integration
├── docs/                           # 📚 Technical documentation
└── docker-compose.yml             # 🐳 Multi-container orchestration
```

---

## 💼 Portfolio Highlights

### 🎯 **Technical Skills Demonstrated**

**Backend Development**
- **Spring Boot 3.x** with modern Java practices
- **Spring Security** with JWT authentication implementation
- **RESTful API Design** following industry standards
- **JPA/Hibernate** with PostgreSQL integration
- **Exception Handling** with comprehensive error responses

**Frontend Development**
- **React 18** with functional components and hooks
- **Modern State Management** using Context API
- **Responsive Design** with TailwindCSS and mobile-first approach
- **API Integration** with Axios and proper error handling
- **Component Architecture** with reusable UI library

**DevOps & Architecture**
- **Docker Containerization** for development and deployment
- **Environment Configuration** for multiple deployment stages
- **CORS Configuration** for secure cross-origin requests
- **Code Organization** following domain-driven design principles

### 🚀 **Key Technical Achievements**

- ✅ **Full-Stack Authentication**: Complete JWT implementation with refresh tokens
- ✅ **Enterprise-Grade API**: RESTful design with proper status codes and error handling
- ✅ **Modern Frontend**: React SPA with responsive design and accessibility
- ✅ **Development Workflow**: Docker-based development environment
- ✅ **Code Quality**: ESLint, Prettier, and consistent coding standards

---

### 🔗 Development Environment

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
- **API Documentation**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### 📱 Application Features

- **Dashboard**: Overview with statistics and quick actions
- **User Management**: Complete CRUD operations with role-based access
- **Authentication**: Secure login/logout with persistent sessions
- **Design System**: Component library showcase at `/design-system`

---

## 📄 License

This project is for **educational and portfolio purposes**.

---

## 👤 Author

**Brandon Jiménez Villarroel**  
*Full-Stack Developer*

[🔗 GitHub](https://github.com/BrandonJimenez23) • [💼 LinkedIn](https://linkedin.com/in/brandonjimenez23)

---

*EduExtra - Demonstrating modern full-stack development capabilities*
