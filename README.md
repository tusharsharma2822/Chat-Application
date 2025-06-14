# Chat Application

A full-stack chat application with real-time messaging, project-based collaboration, user authentication, and AI assistant.  
Built with **React** (frontend), **Node.js/Express** (backend), **MongoDB**, **Redis**, and **Remix Icon**.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup & API](#backend-setup--api)
- [Frontend Setup & Usage](#frontend-setup--usage)
- [API Examples](#api-examples)
- [Authentication Flow](#authentication-flow)
- [License](#license)

---

## Features

- User registration & login (JWT-based)
- Project creation and management
- Add/remove users to projects (collaborators)
- Real-time chat (Socket.io, ready for integration)
- AI assistant panel for each project
- Secure: JWT, Redis token blacklist, password hashing
- Modern UI with dark mode, Tailwind CSS, Remix Icon

---

## Project Structure

```
Chat-Application/
│
├── backend/         # Node.js/Express/MongoDB/Redis API
│   ├── app.js
│   ├── server.js
│   ├── db/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── Readme.md
│
├── frontend/        # React/Tailwind/Remix Icon UI
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── context/
│   │   ├── config/
│   │   ├── pages/
│   │   └── routes/
│   └── Readme.md
│
└── Readme.md        # (This file)
```

---

## Backend Setup & API

See [`backend/Readme.md`](./backend/Readme.md) for full details.

### Quickstart

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure `.env`:**
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_redis_password_if_any
   ```
3. **Start server:**
   ```sh
   npm start
   ```

### Main API Endpoints

#### User APIs

- **Register:** `POST /users/register`
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }
  ```
  **Response:**
  ```json
  {
    "user": {
      "_id": "...",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com"
    },
    "token": "<jwt_token>"
  }
  ```

- **Login:** `POST /users/login`
  ```json
  {
    "email": "john@example.com",
    "password": "secret123"
  }
  ```
  **Response:**
  ```json
  {
    "user": { ... },
    "token": "<jwt_token>"
  }
  ```

- **Logout:** `POST /users/logout`  
  (JWT in `Authorization: Bearer <token>`)
  ```json
  { "message": "Logout Successfully" }
  ```

- **Profile:** `GET /users/profile`  
  (JWT required)
  ```json
  { "user": { "email": "john@example.com", ... } }
  ```

- **All Users:** `GET /users/all`  
  (JWT required)
  ```json
  { "users": [ { "_id": "...", "fullname": { ... }, "email": "..." } ] }
  ```

#### Project APIs

- **Create Project:** `POST /projects/create`
  ```json
  { "name": "My Project" }
  ```
  **Response:**
  ```json
  {
    "_id": "...",
    "name": "my project",
    "users": ["..."]
  }
  ```

- **All Projects:** `GET /projects/all`
  ```json
  {
    "projects": [
      {
        "_id": "...",
        "name": "my project",
        "users": ["..."]
      }
    ]
  }
  ```

- **Add Users:** `PUT /projects/add-user`
  ```json
  {
    "projectId": "...",
    "users": ["..."]
  }
  ```
  **Response:**
  ```json
  {
    "project": {
      "_id": "...",
      "name": "my project",
      "users": ["...", "..."]
    }
  }
  ```

- **Get Project by ID:** `GET /projects/get-project/:projectId`
  ```json
  {
    "project": {
      "_id": "...",
      "name": "my project",
      "users": [
        { "_id": "...", "fullname": { ... }, "email": "..." }
      ]
    }
  }
  ```

---

## Frontend Setup & Usage

See [`frontend/Readme.md`](./frontend/Readme.md) for full details.

### Quickstart

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start frontend:**
   ```sh
   npm run dev
   ```
3. **Open** [http://localhost:5173](http://localhost:5173) (or as shown in terminal).

### Main Pages

- `/` - Home: Features, navigation, and call to action
- `/register` - Register new user
- `/login` - Login
- `/dashboard` - List of your projects, create new project, logout
- `/project` - Project chat UI (left: user chat, right: AI assistant)

### Example: Add Collaborator Icon

```jsx
<button title="Add Collaborator">
  <i className="ri-user-add-line"></i>
</button>
```

---

## Authentication Flow

1. **Register** at `/register`
2. **Login** at `/login` (token stored in localStorage)
3. **Access** `/dashboard` to see your projects
4. **Click** a project to open `/project` (chat UI)

---

## License

MIT
