import { useState } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../api";

export default function UpdateTask({ task, id, setTodos, setOpenPopUp }) {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [status, setTaskStatus] = useState(false);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, { task: updatedTask, taskStatus: status });
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id
            ? { ...todo, task: updatedTask, taskStatus: status }
            : todo
        )
      );
      toast.success("✅ Task updated successfully!");
      setOpenPopUp(false);
    } catch (error) {
      toast.error("❌ Failed to update task.");
      console.error(error);
      setOpenPopUp(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleUpdateTask}
        className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-lg flex flex-col gap-4 transition-all"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900">
          Update Your Task
        </h2>

        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          placeholder="Enter Your New Task Here..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setTaskStatus(e.target.checked)}
            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
          />
          <label className="text-gray-700 select-none">Mark as completed</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
