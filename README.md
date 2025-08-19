# 📝 To Do App

A simple and responsive **To-Do List application** built with **React** and **TailwindCSS**, using a **mock API** for task management.  
This app allows you to add, edit, mark as complete/incomplete, delete, and filter tasks efficiently.

---

## 🚀 Features
- ✅ Add new tasks  
- ✏️ Edit existing tasks  
- 🔄 Mark tasks as **complete** or revert them to **incomplete**  
- 🗑️ Delete tasks (with confirmation dialog)  
- 🔍 Filter tasks (**All / Completed / Incomplete**)  
- 📅 Tasks sorted by newest first  
- ⚡ Fully responsive design (mobile, tablet, desktop)  

---

## 🗂️ Project Structure
frontend/
│── public/ # Static files
│── src/
│ ├── components/ # Reusable UI components
│ │ ├── AddNewTaskModal.jsx
│ │ ├── ConfirmDialog.jsx
│ │ ├── EditTaskModal.jsx
│ │ ├── FilterBar.jsx
│ │ ├── TaskItem.jsx
│ │ └── modal.css
│ ├── api.js # Mock API integration
│ ├── App.js # Main app component
│ ├── App.css
│ ├── index.js # Entry point
│ ├── index.css
│ └── ...
│── .env # Environment variables
│── package.json # Project metadata & dependencies
│── tailwind.config.js # TailwindCSS configuration
│── README.md # Documentation


---

##  Tech Stack
- **Frontend:** React (Hooks)  
- **Styling:** TailwindCSS  
- **API:** Mock API (no real backend)  

---

##  Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/todo-app.git


Navigate into the project folder:

cd todo-app/frontend


Install dependencies:

npm install


Start the project:

npm run start


Open the app in your browser:
👉 http://localhost:3000

📖 Usage

Click Add New Task to create a task.

Use the checkbox to mark tasks as complete or incomplete.

Click Edit to update task details.

Click Delete to remove a task (confirmation required).

Use the Filter Bar to switch between All, Completed, and Incomplete tasks.

