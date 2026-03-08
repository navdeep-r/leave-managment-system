# 📅 Leave Management System

A full-stack, production-quality Leave Management MVP built with **Vue 3**, **Tailwind CSS**, **Node.js/Express**, and **MongoDB Atlas**.

---

## ✨ Features

- **Employee** – Register, login, apply for leave, track request status
- **Employer** – Register, login, view all requests, approve or reject
- **JWT Authentication** – Secure, token-based auth with 7-day expiry
- **Role-Based Access Control** – Employee and employer routes are fully separated
- **Glassmorphic UI** – Modern, premium design with animations and dark theme
- **Toast Notifications** – Real-time success/error feedback
- **Responsive** – Works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| Vue 3 + Composition API | UI Framework |
| Tailwind CSS v4 | Styling |
| Pinia | State Management |
| Vue Router | Client-side routing |
| Axios | HTTP requests + JWT interceptor |
| vue-toastification | Toast notifications |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| Mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth |
| express-validator | Request validation |

### Database
| Tool | Purpose |
|------|---------|
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
leave-managment/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route handlers
│   ├── middleware/           # JWT auth + RBAC
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── server.js             # Express entry point
│   └── .env.example
├── frontend/
│   └── src/
│       ├── components/       # Sidebar, StatusBadge
│       ├── router/           # Vue Router + guards
│       ├── services/         # API service functions
│       ├── store/            # Pinia auth store
│       └── views/            # All page components
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd leave-managment
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leave-mgmt
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Install and run the backend

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:5000`

### 4. Install and run the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 API Endpoints

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login + get JWT |

### Leaves
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/leaves/apply` | Employee | Apply for leave |
| GET | `/api/leaves/my-requests` | Employee | Get own requests |
| GET | `/api/leaves/all` | Employer | Get all requests |
| PUT | `/api/leaves/:id/approve` | Employer | Approve a request |
| PUT | `/api/leaves/:id/reject` | Employer | Reject a request |

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (salt rounds = 10)
- All protected routes require `Authorization: Bearer <token>` header
- RBAC middleware blocks cross-role access with 403 responses
- Environment secrets stored in `.env` (never committed)

---

## 📸 Pages

| Page | Route |
|------|-------|
| Landing | `/` |
| Login | `/login` |
| Register | `/register` |
| Employee – Apply Leave | `/employee/apply` |
| Employee – My Requests | `/employee/my-requests` |
| Employer – All Requests | `/employer/all-requests` |
