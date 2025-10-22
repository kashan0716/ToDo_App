import axios from "axios";

// 🔹 Centralized backend URL
export const BACKEND_URL = "https://todo-app-backend-zz4a.onrender.com/api";

// Axios instance
const API = axios.create({
  baseURL: BACKEND_URL,
});

// ✅ Task API functions
export const addTask = (task) => API.post("/task/add", { task });
export const getTasks = () => API.get("/task/get");
export const deleteTask = (id) => API.delete(`/task/${id}`);
export const updateTask = (id, data) => API.put(`/task/${id}`, data);
