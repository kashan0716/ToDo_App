import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { addTask } from "../api";

export default function Form({ setTodos, loadTasks }) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return toast.warn("Please enter a task!");

    try {
      const res = await addTask(task); // centralized API
      loadTasks();
      toast.success("✅ Task added successfully!");
      setTask("");

      if (setTodos) setTodos((prev) => [...prev, res.data]);
    } catch (error) {
      toast.error("❌ Failed to add task");
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 gap-3 sm:gap-4 transition-all"
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Your Task Here..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md"
        >
          <IoMdAdd size={22} /> <span>Add Task</span>
        </button>
      </form>
    </div>
  );
}
