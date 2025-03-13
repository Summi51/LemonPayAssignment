# LemonPay Assignment

This is a full-stack task management application built with **React.js**, **Node.js / Express**, and **MongoDB**.

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
  "createdAt": "Date (default: now)" }

### **Live Links**
* Backend: https://lemon-pay-assignment.vercel.app/
* Frontend: https://lemonpay.vercel.app/
  
### **Installation & Setup**

## Clone the Repository

* git clone https://github.com/Summi51/LemonPayAssignment.git
* cd lemonpay

### **Backend Setup**
* cd Backend
* npm install
  
### Create a .env file and add:
* PORT=9000
* MONGO_URI=mongodb+srv://samreencomcool3:root@cluster0.kfiqn.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0
* JWT_SECRET=taskwork

### Start the backend server:
* npm start

### **Frontend Setup**
* cd lemonpay
* npm install
* npm run server

### **Screenshots** 

## Desktop
  
* Signup Page : <img width="1428" alt="Screenshot 2025-03-13 at 10 29 57 PM" src="https://github.com/user-attachments/assets/fc7246dd-2160-40e0-8aa1-d2c8955b07bc" />
* Login Page : <img width="1424" alt="Screenshot 2025-03-13 at 10 29 38 PM" src="https://github.com/user-attachments/assets/9fa835c0-1f9e-463a-a854-2e773b1fa5bd" />
* Home Page (Tasks List) : <img width="1409" alt="Screenshot 2025-03-13 at 10 30 33 PM" src="https://github.com/user-attachments/assets/df60f6de-e22d-4ff3-8669-6e54d00e1e4f" />
* Add Task Modal : <img width="1420" alt="Screenshot 2025-03-13 at 10 30 53 PM" src="https://github.com/user-attachments/assets/90ba4377-222f-487b-893a-ef5c748e6c09" />
* Edit & Delete Task Modal : <img width="1418" alt="Screenshot 2025-03-13 at 10 31 13 PM" src="https://github.com/user-attachments/assets/a6da932a-270c-4f5b-ba5f-bee7739b09de" />
* Edit Task Page : <img width="1416" alt="Screenshot 2025-03-13 at 10 31 32 PM" src="https://github.com/user-attachments/assets/bbeea8d4-fbec-4775-b0f0-42e1cc49b3ec" />


## Mobile

* Signup Page : <img width="297" alt="Screenshot 2025-03-13 at 11 12 29 PM" src="https://github.com/user-attachments/assets/5443a73f-6473-4518-9fd6-0f8533ceb4df" />
* Login Page : <img width="299" alt="Screenshot 2025-03-13 at 11 12 50 PM" src="https://github.com/user-attachments/assets/aa1eaf80-9580-4c55-a233-891341e15540" />
* Home Page (Tasks List) : <img width="294" alt="Screenshot 2025-03-13 at 11 13 33 PM" src="https://github.com/user-attachments/assets/cab0f196-01f8-44b4-97e4-2c12be097ce0" />
* Add Task Modal : <img width="297" alt="Screenshot 2025-03-13 at 11 14 28 PM" src="https://github.com/user-attachments/assets/d5cf0abd-5456-4b0a-8e7e-48d27c09d1e8" />
* Edit & Delete Task Modal : <img width="290" alt="Screenshot 2025-03-13 at 11 14 15 PM" src="https://github.com/user-attachments/assets/9b70107d-4fe9-4132-bda6-54e9f367c83b" />
* Edit Task Page : <img width="297" alt="Screenshot 2025-03-13 at 11 14 28 PM" src="https://github.com/user-attachments/assets/e3a46aef-f30d-47f7-b7a1-39fc3aa4c68f" />



