# Notes App

A simple web application to create, manage, and organize notes with categories.

## ⚠️ Important: Database Configuration

Before running the app, update your MySQL credentials in:
```
backend/src/main/resources/application.properties
```

Change these values:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

## Requirements

| Tool | Version |
|------|---------|
| Java JDK | 17.0.18 |
| Maven | 3.9.x (included via mvnw) |
| Node.js | 24.14.0 |
| npm | included with Node.js |
| MySQL | 8.0.45 |

## Project Structure
```
/
├── backend/    → Spring Boot REST API
├── frontend/   → React + Vite SPA
└── start.sh    → Script to run the app
```

## Setup & Run

### Option 1 - Automatic (recommended)
```bash
chmod +x start.sh
./start.sh
```

### Option 2 - Manual

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/notes/active | Get active notes |
| GET | /api/notes/archived | Get archived notes |
| POST | /api/notes | Create note |
| PUT | /api/notes/{id} | Update note |
| PATCH | /api/notes/{id}/archive | Toggle archive |
| DELETE | /api/notes/{id} | Delete note |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category |
| DELETE | /api/categories/{id} | Delete category |
| POST | /api/notes/{noteId}/categories/{categoryId} | Add category to note |
| DELETE | /api/notes/{noteId}/categories/{categoryId} | Remove category from note |

## Database

- Engine: MySQL 8.0.45
- Database name: `notesdb`
- Tables are auto-created by Hibernate on first run