# 📘 Multiverse – MERN Stack 3-Tier Application

## 📌 Overview
Multiverse is a **role-based web application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js).  
It implements a **3-tier architecture** with different access levels for:

- 👩‍💼 **Principal** – Admin role (manages teachers & students)  
- 👨‍🏫 **Teacher** – Teacher role (manages student activities)  
- 👨‍🎓 **Student** – Student role (views learning content, progress)  

This project demonstrates **role-based authentication, CRUD operations,** and a structured **full-stack MERN application**.

---

## 🏗️ Tech Stack
- **Frontend:** React.js, React Router, Axios, TailwindCSS / Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Tokens), bcrypt.js for password hashing  
- **State Management:** Context API / Redux (optional)  

---

## 🎯 Features

### 👩‍💼 Principal
- Create, update, and delete teacher & student accounts  
- Assign teachers to students  
- View reports and analytics  

### 👨‍🏫 Teacher
- Manage assigned students  
- Create & grade assignments  
- Share study material  

### 👨‍🎓 Student
- View personal dashboard  
- Access assignments & resources  
- Submit work and check grades  

---

## 🔑 Role-Based Access Flow
- **Principal →** Full control (Admin panel)  
- **Teacher →** Restricted to assigned students & tasks  
- **Student →** Limited to personal data & learning resources  

---

## ⚙️ Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yuvii01/Multi-Verse.git
cd multiverse
```

2. **Backend Setup**

```bash
cd backend
npm install
npm start
```

3. **Frontend Setup**

```bash
cd frontend
npm install
npm start
```

4. **Environment Variables**

Create a `.env file` inside `backend/` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---


**🚀 Future Improvements**

📊 Add detailed analytics dashboards

📧 Email notifications for assignments

📱 Mobile responsive UI

🔐 Role-based route protection with refresh tokens

---


**🤝 Contributing**

Contributions are welcome! Please fork the repo and submit a pull request.
