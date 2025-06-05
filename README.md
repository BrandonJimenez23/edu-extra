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

## 📊 Estado del Proyecto

### Frontend
- ✅ Estructura base de carpetas por features
- ✅ Componentes UI reutilizables (Button, Table)
- ✅ Módulo básico de usuarios
- ✅ Integración con API
- ⏳ Autenticación y control de acceso
- ⏳ Formularios con validación

### Backend
- ✅ Estructura por dominios
- ✅ API RESTful para usuarios
- ✅ Configuración CORS
- ✅ Documentación OpenAPI/Swagger
- ⏳ Implementación completa de seguridad
- ⏳ API para actividades e inscripciones

---

## 🗂️ Project Structure

```
edu-extra/
├── backend/                # Java Spring Boot API
│   ├── eduextra-api/       # API principal
│   │   ├── src/            # Código fuente
│   │   │   ├── main/       # Código de la aplicación
│   │   │   └── test/       # Pruebas
│   │   ├── pom.xml         # Dependencias Maven
│   │   └── Dockerfile      # Configuración Docker
├── frontend/               # React + Vite app
│   ├── src/                # Código fuente
│   │   ├── api/            # Configuración de API
│   │   ├── components/     # Componentes reutilizables
│   │   ├── features/       # Módulos por dominio
│   │   ├── hooks/          # Hooks personalizados
│   │   └── styles/         # Estilos CSS
│   ├── package.json        # Dependencias npm
│   └── Dockerfile          # Configuración Docker
├── docker-compose.yml      # Configuración de contenedores
└── README.md               # Este archivo
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
