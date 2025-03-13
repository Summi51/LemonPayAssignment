# LemonPay Assignment

This is a full-stack task management application built with **React.js / Next.js**, **Node.js / Express**, and **MongoDB**.

## Features

### **Frontend - React.js
- **Authentication**
  - User **signup** and **login** with email and password.
  - Stores JWT token in **local storage** or **cookies**.
- **Task Management**
  - Logged-in users can:
    * **Add** new tasks (task name, description, due date).
    * **View** a list of their tasks.
    * **Edit** or **Delete** specific tasks.
  - Users are redirected to the login page if not authenticated.
- **Styling**
  - Used **Tailwind CSS** for UI design.
  - Form validation for required fields.

### **Backend (Node.js + Express)**
- **Authentication APIs**
  - User **registration** with hashed passwords (bcrypt).
  - User **login** (JWT token generation).
  - Middleware to **protect routes** for authenticated users.
- **Task APIs**
  - CRUD operations:
    * **Create** a task.
    * **Read** user-specific tasks.
    * **Update** an existing task.
    * **Delete** a task.
  - Data validation using **Joi / express-validator**.

### **Database (MongoDB)**
- **User Schema**
  ```json
  {
    "email": "string (unique & required)",
    "password": "string (hashed & required)",
    "createdAt": "Date (default: now)"
  }

  {
  "taskName": "string (required)",
  "description": "string (optional)",
  "dueDate": "Date (required)",
  "createdAt": "Date (default: now)"
}

### **Live Links**
* Backend: https://lemon-pay-assignment.vercel.app/
* Frontend: https://lemonpay.vercel.app/
  
### **Installation & Setup**

## Clone the Repository

* git clone https://github.com/Summi51/LemonPayAssignment.git
* cd LemonPayAssignment

### **Backend Setup**
* cd backend
* npm install
  
### Create a .env file and add:
* PORT=9000
* MONGO_URI=mongodb+srv://samreencomcool3:root@cluster0.kfiqn.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0
* JWT_SECRET=taskwork

### Start the backend server:
* npm start

### **Frontend Setup**
* cd frontend
* npm install
* npm run server

### **Screenshots**

* Signup Page : <img width="1428" alt="Screenshot 2025-03-13 at 10 29 57 PM" src="https://github.com/user-attachments/assets/fc7246dd-2160-40e0-8aa1-d2c8955b07bc" />
* Login Page : <img width="1424" alt="Screenshot 2025-03-13 at 10 29 38 PM" src="https://github.com/user-attachments/assets/9fa835c0-1f9e-463a-a854-2e773b1fa5bd" />
* Home Page (Tasks List) : <img width="1409" alt="Screenshot 2025-03-13 at 10 30 33 PM" src="https://github.com/user-attachments/assets/df60f6de-e22d-4ff3-8669-6e54d00e1e4f" />
* Add Task Modal : <img width="1420" alt="Screenshot 2025-03-13 at 10 30 53 PM" src="https://github.com/user-attachments/assets/90ba4377-222f-487b-893a-ef5c748e6c09" />
* Edit & Delete Task Modal : <img width="1418" alt="Screenshot 2025-03-13 at 10 31 13 PM" src="https://github.com/user-attachments/assets/a6da932a-270c-4f5b-ba5f-bee7739b09de" />
* Edit Task Page : <img width="1416" alt="Screenshot 2025-03-13 at 10 31 32 PM" src="https://github.com/user-attachments/assets/bbeea8d4-fbec-4775-b0f0-42e1cc49b3ec" />







