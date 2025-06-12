# Chat Application Backend

This backend powers a chat application using Node.js, Express, MongoDB, and Redis. It provides RESTful APIs for user authentication, project management, and user management within projects.

---

## Project Structure & File Explanations

```
backend/
│
├── app.js                   # Main Express app setup and middleware
├── server.js                # HTTP server entry point
├── db/
│   └── db.js                # MongoDB connection logic
├── models/
│   ├── user.model.js        # Mongoose schema/model for users
│   └── project.model.js     # Mongoose schema/model for projects
├── controllers/
│   ├── user.controller.js   # User-related request handlers
│   └── project.controller.js# Project-related request handlers
├── routes/
│   ├── user.routes.js       # User API endpoints
│   └── project.routes.js    # Project API endpoints
├── services/
│   ├── user.service.js      # User business logic
│   ├── project.service.js   # Project business logic
│   └── redis.service.js     # Redis client setup
├── middleware/
│   └── auth.middleware.js   # JWT authentication middleware
└── Readme.md                # This documentation file
```

### File Details

- **app.js**: Sets up Express, middleware (CORS, morgan, cookie-parser), and mounts user/project routes.
- **server.js**: Starts the HTTP server on the specified port.
- **db/db.js**: Connects to MongoDB using Mongoose, using the URI from environment variables.
- **models/user.model.js**: Defines the user schema, password hashing, JWT generation, and comparison methods.
- **models/project.model.js**: Defines the project schema, including project name and user references.
- **controllers/user.controller.js**: Handles user registration, login, profile, logout, and fetching all users.
- **controllers/project.controller.js**: Handles project creation, listing, adding users, and fetching by ID.
- **routes/user.routes.js**: Defines user-related API endpoints and validation.
- **routes/project.routes.js**: Defines project-related API endpoints and validation.
- **services/user.service.js**: Contains user creation and user listing logic.
- **services/project.service.js**: Contains project creation, user addition, and project retrieval logic.
- **services/redis.service.js**: Sets up and exports a Redis client for token blacklisting.
- **middleware/auth.middleware.js**: Middleware to authenticate users via JWT and Redis blacklist.

---

## Setup Instructions

### 1. Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud instance)
- **Redis** (local or cloud instance)

### 2. Clone the Repository

```sh
git clone <your-repo-url>
cd Chat-Application/backend
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password_if_any
```

### 5. Start the Server

```sh
npm start
```

The server will run on the port specified in your `.env` file (default: 3000).

---

## API Endpoints Overview

### User APIs

- `POST /users/register`  
  Register a new user (requires `fullname`, `email`, `password`).

  **Example Request:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }
  ```
  **Example Response:**
  ```json
  {
    "user": {
      "_id": "65f1c1a2e1b2c3d4e5f6a7b8",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com"
    },
    "token": "<jwt_token>"
  }
  ```

- `POST /users/login`  
  Login and receive a JWT token.

  **Example Request:**
  ```json
  {
    "email": "john@example.com",
    "password": "secret123"
  }
  ```
  **Example Response:**
  ```json
  {
    "user": {
      "_id": "65f1c1a2e1b2c3d4e5f6a7b8",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com"
    },
    "token": "<jwt_token>"
  }
  ```

- `POST /users/logout`  
  Logout and blacklist the JWT token.

  **Example Request:**  
  (Send JWT in `Authorization: Bearer <token>` header)

  **Example Response:**
  ```json
  {
    "message": "Logout Successfully"
  }
  ```

- `GET /users/profile`  
  Get the current user's profile (JWT required).

  **Example Request:**  
  (Send JWT in `Authorization: Bearer <token>` header)

  **Example Response:**
  ```json
  {
    "user": {
      "email": "john@example.com",
      "iat": 1710000000,
      "exp": 1710086400
    }
  }
  ```

- `GET /users/all`  
  Get all users except the current user (JWT required).

  **Example Response:**
  ```json
  {
    "users": [
      {
        "_id": "65f1c1a2e1b2c3d4e5f6a7b9",
        "fullname": { "firstname": "Jane", "lastname": "Smith" },
        "email": "jane@example.com"
      }
    ]
  }
  ```

### Project APIs

- `POST /projects/create`  
  Create a new project (JWT required).

  **Example Request:**
  ```json
  {
    "name": "My Project"
  }
  ```
  **Example Response:**
  ```json
  {
    "_id": "65f1c1a2e1b2c3d4e5f6a7c0",
    "name": "my project",
    "users": ["65f1c1a2e1b2c3d4e5f6a7b8"]
  }
  ```

- `GET /projects/all`  
  Get all projects for the logged-in user (JWT required).

  **Example Response:**
  ```json
  {
    "projects": [
      {
        "_id": "65f1c1a2e1b2c3d4e5f6a7c0",
        "name": "my project",
        "users": ["65f1c1a2e1b2c3d4e5f6a7b8"]
      }
    ]
  }
  ```

- `PUT /projects/add-user`  
  Add users to a project (JWT required).

  **Example Request:**
  ```json
  {
    "projectId": "65f1c1a2e1b2c3d4e5f6a7c0",
    "users": ["65f1c1a2e1b2c3d4e5f6a7b9"]
  }
  ```
  **Example Response:**
  ```json
  {
    "project": {
      "_id": "65f1c1a2e1b2c3d4e5f6a7c0",
      "name": "my project",
      "users": [
        "65f1c1a2e1b2c3d4e5f6a7b8",
        "65f1c1a2e1b2c3d4e5f6a7b9"
      ]
    }
  }
  ```

- `GET /projects/get-project/:projectId`  
  Get a project by its ID (JWT required).

  **Example Response:**
  ```json
  {
    "project": {
      "_id": "65f1c1a2e1b2c3d4e5f6a7c0",
      "name": "my project",
      "users": [
        {
          "_id": "65f1c1a2e1b2c3d4e5f6a7b8",
          "fullname": { "firstname": "John", "lastname": "Doe" },
          "email": "john@example.com"
        },
        {
          "_id": "65f1c1a2e1b2c3d4e5f6a7b9",
          "fullname": { "firstname": "Jane", "lastname": "Smith" },
          "email": "jane@example.com"
        }
      ]
    }
  }
  ```

---

## How Authentication Works

- JWT tokens are issued on login and must be sent in the `Authorization` header as `Bearer <token>`.
- On logout, tokens are blacklisted in Redis to prevent reuse.

---

## License

MIT
