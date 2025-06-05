# EduExtra – ERP for Extracurricular Activities Management

**EduExtra** is a full-stack web application designed to help educational institutions manage extracurricular activities in a structured, digital, and user-friendly way.

This platform acts as a hybrid between an **ERP system** and a **public-facing enrollment portal**, offering administrative tools for coordinators and participation access for students, teachers, and local community members.

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

| Layer         | Technologies |
|--------------|--------------|
| Frontend     | React, Vite, TailwindCSS, Axios |
| Backend      | Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL |
| DevOps       | Docker, Docker Compose, GitHub Actions |
| Build Tools  | Maven, ESLint, Prettier |

---

## 📊 Project Status

### Frontend
- ✅ Feature-based folder structure
- ✅ Reusable UI components (Button, Table, Card, Input, Select, Logo)
- ✅ Design system with component showcase
- ✅ Semantic HTML structure and accessibility
- ✅ Basic users module with table view
- ✅ API integration with Axios
- ✅ Icons system with Lucide React
- ✅ Main layout with responsive sidebar and topbar
- ✅ Route system with protected routes
- ✅ Dashboard with statistics and quick actions
- ✅ Activities management page
- ✅ User menu with dropdown functionality
- ✅ Search functionality in header
- ✅ Mobile-responsive design
- ✅ Custom color palette and typography (Poppins + Inter)
- ⏳ Forms with validation
- ⏳ Authentication integration
- ⏳ Real-time notifications
- ⏳ Dark/light theme toggle

### Backend
- ✅ Domain-driven structure
- ✅ RESTful API for users with pagination
- ✅ CORS configuration
- ✅ OpenAPI/Swagger documentation
- ✅ Comprehensive exception handling
- ✅ Detailed validation error responses
- ✅ JWT Authentication and Authorization
- ✅ Spring Security configuration
- ✅ Refresh token system
- ✅ Custom UserDetailsService
- ✅ Security filters and middleware
- ⏳ API for activities and enrollments
- ⏳ Role-based access control endpoints
- ⏳ File upload functionality
- ⏳ Email notifications
- ⏳ Database optimizations

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
