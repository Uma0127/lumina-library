<div align="center">

<img src="https://img.shields.io/badge/LUMINA-Digital%20Library-6366f1?style=for-the-badge&logoColor=white" alt="LUMINA" />

# LUMINA — Book Library Management System

**A modern, full-stack digital library management system built with the MERN stack.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](#live-demo) · [Features](#features) · [Quick Start](#quick-start) · [API Docs](#api-endpoints) · [Deployment](#deployment)

</div>

---

## Overview

LUMINA is a production-ready **Book Library Management System** that allows authenticated users to manage a **shared digital library**. Every user who logs in sees the same collection — add a book, edit its status, or remove it, and the change is instantly reflected for all users.

Built with a clean **MERN stack** architecture, LUMINA features a professional dark-themed SaaS dashboard, JWT-protected REST APIs, real-time search and filtering, and a fully responsive layout.

---

## Features

### Authentication
- Secure user **Signup** and **Login**
- **JWT-based** authentication with 7-day token expiry
- **bcryptjs** password hashing (salt rounds: 12)
- Protected routes — unauthenticated users are redirected to Login

### Shared Library
- All authenticated users share the **same book collection**
- Any user can **add**, **edit**, or **delete** any book
- Changes are **instantly visible** to all logged-in users

### Book Management
- Add books with title, author, category, and status
- Edit any book's details
- Delete books with a **confirmation dialog**
- Mark books as **Available** or **Issued**

### Search & Filtering
- **Real-time search** by book title or author name
- Filter by **category** (14 categories supported)
- Filter by **availability status**
- Combine search and filters simultaneously

### Dashboard
- Personalized greeting (Good Morning / Afternoon / Evening)
- Live statistics: **Total Books**, **Available**, **Issued**, **Categories**
- Recent books section
- Quick **Add New Book** shortcut

### UI / UX
- Professional **dark-themed** SaaS dashboard design
- Fully **responsive** — mobile, tablet, desktop
- **Toast notifications** for all actions
- **Loading states** and **empty states**
- Smooth hover animations on book cards
- Collapsible **sidebar drawer** on mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, React Router v6 |
| Styling | Pure CSS with custom design system |
| HTTP Client | Axios |
| Backend | Node.js 22, Express.js 4 |
| Database | MongoDB Atlas, Mongoose 8 |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Notifications | react-hot-toast |
| Dev Tools | Nodemon |

---

## Architecture

```
┌─────────────────────────────────┐
│     React + Vite (Port 5173)    │
│  Login / Signup / Dashboard /   │
│         Books Collection        │
└────────────┬────────────────────┘
             │ Axios HTTP + JWT Bearer Token
             ▼
┌─────────────────────────────────┐
│   Express REST API (Port 5000)  │
│  /api/auth  ·  /api/books       │
│  JWT Middleware · Validation    │
└────────────┬────────────────────┘
             │ Mongoose ODM
             ▼
┌─────────────────────────────────┐
│        MongoDB Atlas            │
│   users collection              │
│   books collection (shared)     │
└─────────────────────────────────┘
```

---

## Project Structure

```
lumina-library/
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Sidebar.jsx         # Collapsible sidebar with mobile drawer
│   │   │   ├── StatsCard.jsx       # Dashboard statistics card
│   │   │   ├── BookCard.jsx        # Individual book display card
│   │   │   ├── BookModal.jsx       # Add / Edit book modal
│   │   │   ├── SearchBar.jsx       # Search + category + status filters
│   │   │   ├── EmptyState.jsx      # Empty collection UI
│   │   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   │   └── ProtectedRoute.jsx  # Auth guard for routes
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Signup page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   └── Books.jsx           # Full book collection page
│   │   ├── services/
│   │   │   └── api.js              # Axios instance + all API calls
│   │   ├── App.jsx                 # Route definitions
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global design system styles
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # signup, login, getMe
│   │   └── bookController.js       # getBooks, createBook, updateBook, deleteBook
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification middleware
│   ├── models/
│   │   ├── User.js                 # User schema with bcrypt pre-save hook
│   │   └── Book.js                 # Shared book schema
│   ├── routes/
│   │   ├── authRoutes.js           # POST /signup, POST /login, GET /me
│   │   └── bookRoutes.js           # Full CRUD — all protected
│   ├── seed.js                     # Database seeder
│   ├── .env
│   ├── .env.example
│   ├── server.js                   # Express app entry point
│   └── package.json
│
└── README.md
```

---

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **MongoDB Atlas** account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lumina-library.git
cd lumina-library
```

### 2. Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key_here
CLIENT_URL=http://localhost:5173
```

### 3. Configure Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional)

```bash
cd ../backend
node seed.js
```

This creates 4 users and 15 shared books.

### 5. Start the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# ✅ MongoDB connected successfully
# 🚀 LUMINA Server running on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# ➜ Local: http://localhost:5173
```

Open **http://localhost:5173**

---

## Seeded Accounts

After running `node seed.js`:

| Name | Email | Password |
|---|---|---|
| Aditya | aditya@lumina.com | password123 |
| Nishmitha | nishmitha@lumina.com | password123 |
| Library User One | user1@lumina.test | Test@12345 |
| Library User Two | user2@lumina.test | Test@12345 |

> All users share the same 15-book library.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user info | ✅ |

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

---

### Books (All require JWT)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Get all shared books |
| `POST` | `/api/books` | Add a new book |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |

**Query Parameters for GET /api/books:**

| Param | Type | Example |
|---|---|---|
| `search` | string | `?search=atomic` |
| `category` | string | `?category=Fiction` |
| `status` | string | `?status=Available` |

**POST /api/books body:**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "category": "Self-Help",
  "status": "Available"
}
```

**Supported Categories:**
`Fiction` · `Non-Fiction` · `Science` · `Technology` · `History` · `Biography` · `Self-Help` · `Fantasy` · `Mystery` · `Romance` · `Horror` · `Philosophy` · `Art` · `Other`

---

## Environment Variables

### Backend — `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWTs | `your_strong_secret` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend — `frontend/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## MongoDB Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **free cluster** (M0)
3. Under **Database Access** → create a database user with read/write permissions
4. Under **Network Access** → click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) for development
5. Click **Connect** → **Drivers** → copy the connection string
6. Replace `<password>` with your database user's password
7. Paste into `backend/.env` as `MONGO_URI`

---

## Production Build

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

---

## Deployment

### Frontend → Netlify

1. Push your repository to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Set **Base directory**: `frontend`
4. Set **Build command**: `npm run build`
5. Set **Publish directory**: `frontend/dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
7. Deploy

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repository
3. Set **Root directory**: `backend`
4. Set **Build command**: `npm install`
5. Set **Start command**: `npm start`
6. Add environment variables:
   ```
   MONGO_URI=your_atlas_uri
   JWT_SECRET=your_production_secret
   CLIENT_URL=https://your-app.netlify.app
   PORT=5000
   ```
7. Deploy

### Post-Deployment

Update `frontend/.env` (or Netlify env vars) with the live Render URL:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

Update `backend/.env` (or Render env vars) with the live Netlify URL:
```
CLIENT_URL=https://your-app.netlify.app
```

---

## Security

| Feature | Implementation |
|---|---|
| Password hashing | bcryptjs with 12 salt rounds |
| Authentication | JWT with 7-day expiry |
| Route protection | Express middleware on all book routes |
| Input validation | express-validator on all POST/PUT routes |
| CORS | Restricted to known frontend origins |
| Secrets | Stored in `.env`, never committed |

---

## Screenshots

> _(Add screenshots here)_

| Login | Dashboard | Books Collection |
|---|---|---|
| ![Login]() | ![Dashboard]() | ![Books]() |

---

## Live Demo

> 🔗 _(Add your live demo link here)_

---

## Future Improvements

- [ ] Book cover image upload (Cloudinary)
- [ ] Borrower tracking — record who issued which book
- [ ] Due date and return date management
- [ ] Email notifications for overdue books
- [ ] Export library to CSV / PDF
- [ ] Admin and member role system
- [ ] Book ratings and reviews
- [ ] Dark / light theme toggle
- [ ] Pagination for large libraries
- [ ] Activity log — track who added / edited / deleted

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with ❤️ using the MERN Stack

**LUMINA** — Digital Library Management

</div>
