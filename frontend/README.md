# Chat Application Frontend

This is the frontend for the Chat Application, built with React, Tailwind CSS, and Remix Icon. It provides a modern, responsive UI for user authentication, project management, and real-time chat.

---

## Project Structure & File Explanations

```
frontend/
│
├── src/
│   ├── App.jsx                # Main app component, wraps routes with user context
│   ├── main.jsx               # Entry point, renders App and imports global CSS and Remix Icon
│   ├── index.css              # Tailwind CSS import and global styles
│   ├── context/
│   │   └── user.context.jsx   # React context for user state
│   ├── config/
│   │   └── axios.js           # Axios instance for API requests (not shown, but expected)
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with features and navigation
│   │   ├── Login.jsx          # Login form and logic
│   │   ├── Register.jsx       # Registration form and logic
│   │   ├── DashBoard.jsx      # Project dashboard for logged-in users
│   │   └── Project.jsx        # Project chat UI (user chat and AI assistant)
│   └── routes/
│       └── AppRoutes.jsx      # React Router setup for all pages
└── Readme.md                  # This documentation file
```

---

## File Details & Usage Examples

### `src/App.jsx`

Wraps the application in the `UserProvider` context and renders the main routes.

```javascript
import { UserProvider } from './context/user.context.jsx'
import AppRoutes from './routes/AppRoutes'  

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
```

---

### `src/main.jsx`

Entry point. Imports Tailwind CSS, Remix Icon, and renders the app.

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

### `src/index.css`

Loads Tailwind CSS.

```css
@import "tailwindcss";
```

---

### `src/context/user.context.jsx`

Provides a React context for user state across the app.

```javascript
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // You can add more user-related logic here (e.g., login, logout)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

### `src/routes/AppRoutes.jsx`

Defines all main routes using React Router.

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashBoard from '../pages/DashBoard';
import Project from '../pages/Project';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/dashboard' element={ <DashBoard /> } />
            <Route path='/project' element={ <Project/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
```

---

### `src/pages/Home.jsx`

Landing page with navigation, feature highlights, and footer.

**Features Section Example:**
```javascript
const features = [
	{
		icon: (
			<svg
				className="w-8 h-8 text-cyan-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h1"
				/>
			</svg>
		),
		title: 'Real-time Chat',
		desc: 'Instant messaging with friends and groups, powered by a fast backend.',
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-emerald-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8"
				/>
			</svg>
		),
		title: 'Secure & Private',
		desc: 'End-to-end encryption keeps your conversations safe and private.',
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-cyan-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"
				/>
			</svg>
		),
		title: 'Easy to Use',
		desc: 'Modern, intuitive interface for seamless chatting on any device.',
	},
]
```

---

### `src/pages/Login.jsx`

Login form with email and password fields, show/hide password toggle, and navigation to register.

**Example Usage:**
```javascript
<input
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  id="email"
  name="email"
  autoComplete="email"
  required
  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
  placeholder="Email"
/>
```

---

### `src/pages/Register.jsx`

Registration form with first name, last name, email, password, show/hide password, and error handling.

**Example Usage:**
```javascript
<input
  value={firstName}
  onChange={e => setFirstName(e.target.value)}
  type="text"
  id="firstName"
  name="firstName"
  required
  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
  placeholder="First Name"
/>
```

---

### `src/pages/DashBoard.jsx`

Displays all projects for the logged-in user, allows creating new projects, and logout.

**Example:**
```javascript
<button onClick={() => isUserReady && setIsModalOpen(true)} className={`project w-full md:w-auto p-4 border border-cyan-400 rounded-md px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700${!isUserReady ? ' opacity-50 cursor-not-allowed' : ''}`} disabled={!isUserReady}>
  Create a New Project
  <i className="ri-link ml-2"></i>
</button>
```
**Project Card Example:**
```javascript
<div
  key={project._id}
  onClick={() => {
    navigate(`/project`, {
      state: { project }
    })
  }}
  className='project flex flex-col gap-2 cursor-pointer p-4 border border-cyan-400 rounded-md min-w-0 bg-gray-900 transition-all duration-200 hover:bg-cyan-900 hover:scale-105 hover:shadow-lg relative'
>
  <h2 className='font-semibold break-words'>
    {project.name}
  </h2>
  {/* Person count at bottom-right */}
  <div className="absolute bottom-2 right-2 flex items-center gap-1 text-cyan-300 text-sm bg-black/60 px-2 py-1 rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.253.714 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    {project.users ? project.users.length : 0}
  </div>
</div>
```

---

### `src/pages/Project.jsx`

Split-screen UI:  
- **Left:** User chat (with add collaborator icon using Remix Icon: `<i className="ri-user-add-line"></i>`)
- **Right:** AI Assistant responses

**Example:**
```javascript
<button title="Add Collaborator">
  <i className="ri-user-add-line"></i>
</button>
```
**Message Example:**
```javascript
{messages.map((msg, idx) => (
  <div key={idx}>
    <span style={{ color: "#00bcd4", fontWeight: "bold" }}>{msg.sender}: </span>
    <span>{msg.text}</span>
  </div>
))}
```

---

## How to Run

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the frontend (usually on port 5173 for Vite or 3000 for CRA):

   ```sh
   npm run dev
   ```

3. Make sure the backend is running and accessible.

---

## Authentication Flow Example

- Register at `/register`
- Login at `/login` (token is stored in localStorage)
- Access `/dashboard` to see your projects
- Click a project to open `/project` (chat UI)

---

## Icons

Remix Icon is globally available (see `main.jsx`):

```html
<i className="ri-user-add-line"></i> <!-- Add Collaborator Icon -->
```

---

## Styling

Tailwind CSS is used for all styling.  
You can customize styles in `index.css` and use Tailwind utility classes throughout components.

---

## License

MIT