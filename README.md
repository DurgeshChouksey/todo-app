# 📝 Full-Stack Todo App

A clean and responsive full-stack Todo application built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.

This project supports **user authentication**, **secure token refresh flow**, and full CRUD for todos with priority, tags, and timestamps. Ideal for learning full-stack development and building real-world MERN applications.

---

## 🔗 Live Demo

👉 [Click here to try the app](https://todo-app-omega-liard.vercel.app)

This is the live deployed version of the Todo App frontend, powered by Vercel and connected to a live Railway backend.

---

## 🚀 Features

- ✅ User Signup & Login with JWT authentication
- 🔄 Access Token + Refresh Token flow
- 🛡️ Protected routes (only logged-in users can access dashboard)
- ✍️ Create, Edit, Delete, and Toggle todos
- 🏷️ Add tags and priority levels to todos
- 📱 Responsive layout for desktop, tablet, and mobile
- 🔐 Secure token handling with auto logout on failure

---

## 📁 Project Structure

root/
├── backend/         # Node.js + Express + MongoDB
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── .env
│
├── frontend/        # React (Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── styles/
│   └── .env
│
└── README.md

---

## 🔧 Tech Stack

| Frontend        | Backend              | Auth        | Database |
|----------------|----------------------|-------------|----------|
| React (Vite)   | Node.js + Express    | JWT + Refresh Token | MongoDB  |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Setup Backend
```
cd backend
npm install
```
Create .env file inside backend/ with:
```
PORT=5001
MONGO_URI=your_mongodb_connection
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```
Start the backend:
```
npm run dev
```

### 3. Setup Frontend
```
cd ../frontend
npm install

VITE_API_URL=http://localhost:5001

npm run dev
```

🧠 Learning Goals
	•	Structuring full-stack applications
	•	Handling authentication securely (Access + Refresh tokens)
	•	Working with protected routes in React
	•	Clean responsive UI layout
	•	Connecting frontend with RESTful backend API


🙌 Acknowledgments
	•	UI inspired by clean productivity apps
	•	Backend patterns based on industry-standard REST practices

 
