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
- ✅ Reusable UI components (Button, Table, Card, Input, Select)
- ✅ Design system with component showcase
- ✅ Semantic HTML structure and accessibility
- ✅ Basic users module with table view
- ✅ API integration
- ✅ Icons system with Lucide React
- ⏳ Forms with validation
- ⏳ Authentication and access control

### Backend
- ✅ Domain-driven structure
- ✅ RESTful API for users
- ✅ CORS configuration
- ✅ OpenAPI/Swagger documentation
- ✅ Comprehensive exception handling
- ✅ Detailed validation error responses
- ⏳ Complete security implementation
- ⏳ API for activities and enrollments

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

## 🐳 Run the Project with Docker

```bash
docker compose up --build
```

- **Backend**: [http://localhost:8080](http://localhost:8080)
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **PostgreSQL**: localhost:5433 (external access)

---

## 📄 License

This project is currently for educational and portfolio purposes only.

---

## 👤 Author

Brandon Jiménez Villarroel  
[GitHub](https://github.com/BrandonJimenez23) · [LinkedIn](https://linkedin.com/in/brandonjimenez23)
