import { useEffect, useState } from "react";
import Form from "../components/Form";
import UpdateTask from "../components/UpdateTask";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { getTasks, deleteTask } from "../api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [taskId, setTaskId] = useState();
  const [updatedTask, setUpdatedTask] = useState();

  // Load tasks from API
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTodos(res.data);
    } catch (error) {
      toast.error("Failed to load tasks.");
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
      console.error(error);
    }
  };

  // Toggle update popup
  const handleUpdatePopup = (id) => {
    setOpenPopUp(!openPopUp);
    setTaskId(id);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start py-6 px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-6">
          📝 Todo List
        </h2>

        {/* Form */}
        <Form setTodos={setTodos} loadTasks={loadTasks} />

        {/* Todo List */}
        <div className="mt-6 space-y-4">
          {todos.length === 0 ? (
            <div className="text-gray-600 text-center p-6 bg-gray-300 rounded-2xl shadow-md">
              <p className="text-lg sm:text-xl">📭 No Tasks Added Yet!</p>
              <p className="text-sm sm:text-base mt-1">
                Start by adding a new task above.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={todo._id || index}
                  className="bg-white shadow-md rounded-2xl p-4 sm:p-5 flex flex-row items-center justify-between transition-all hover:shadow-lg"
                >
                  {/* Task Text */}
                  <span
                    className={`text-gray-800 text-base sm:text-lg break-words flex-1 ${
                      todo.taskStatus ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.task}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-3 ml-4 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <ImCross size={20} />
                    </button>
                    <button
                      onClick={() => handleUpdatePopup(todo._id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MdCheckBoxOutlineBlank size={25} />
                    </button>
                  </div>

                  {/* Update Modal */}
                  {openPopUp && taskId === todo._id && (
                    <UpdateTask
                      task={todo.task}
                      id={todo._id}
                      setOpenPopUp={setOpenPopUp}
                      setTodos={setTodos}
                      setUpdatedTask={setUpdatedTask}
                      taskStatus={todo.taskStatus}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
