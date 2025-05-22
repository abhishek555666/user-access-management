# 🔐 User Access Management System

This is a backend application built for secure user registration, login, and role-based access control using **Node.js**, **TypeScript**, and **MongoDB**. This project was developed as part of the **Leucine Tech Internship Assignment – May 2025**.

---

## 📌 Project Objectives

- Allow users to register and log in securely
- Issue JWT tokens upon successful login
- Implement role-based access (Admin/User)
- Protect API endpoints using middleware
- Persist data with MongoDB

---

## 🚀 Tech Stack

| Tool        | Purpose                      |
|-------------|------------------------------|
| Node.js     | JavaScript runtime           |
| Express.js  | Web framework                |
| TypeScript  | Static typing                |
| MongoDB     | NoSQL database               |
| Mongoose    | MongoDB object modeling      |
| JWT         | User authentication          |
| Bcrypt      | Password hashing             |
| Nodemon     | Dev auto-reloading           |

---

## 📁 Folder Structure

backend/
├── src/
│ ├── controllers/ # Logic for handling requests
│ ├── routes/ # API routes (auth, user)
│ ├── models/ # Mongoose schemas
│ ├── middlewares/ # Auth + role validation
│ ├── utils/ # Helper functions
│ └── server.ts # Entry point
├── .env # Environment config
├── package.json
├── tsconfig.json
└── README.md


---

## 🧪 API Features

| Method | Endpoint        | Access      | Description                  |
|--------|------------------|-------------|------------------------------|
| POST   | `/api/register`  | Public      | Register a new user          |
| POST   | `/api/login`     | Public      | Log in and receive JWT token |
| GET    | `/api/profile`   | Authenticated | View your own profile       |
| GET    | `/api/users`     | Admin Only  | Get list of all users        |

---

## ⚙️ Setup Instructions

> Follow these steps to run the backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-access-management.git
cd user-access-management/backend


Install Dependencies
bash
Copy code
npm install

 
