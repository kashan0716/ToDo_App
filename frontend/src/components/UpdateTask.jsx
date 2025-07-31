import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateTask({ task, id, setTodos, setOpenPopUp }) {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [status, setTaskStatus] = useState(false);

  const handleUpdateTask = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await axios.put(`http://localhost:3000/api/task/${id}`, {
        task: updatedTask,
        taskStatus: status,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id
            ? { ...todo, task: updatedTask, taskStatus: status }
            : todo
        )
      );

      toast.success("Task updated successfully!");
      setOpenPopUp(false);
    } catch (error) {
      toast.error("Failed to update task.");
      console.error(error);
      setOpenPopUp(false);
    }
  };

  const handleStatus = (e) => {
    setTaskStatus(e.target.checked);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdateTask}
        className="bg-white p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Update Your Task
        </h2>

        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          placeholder="Enter Your New Task Here.."
          className="my-3 w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full  bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
