import { useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTask from "./UpdateTask";
import { ImCross } from "react-icons/im";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();
  const [taskId, setTaskId] = useState();

  const [openPopUp, setOpenPopUp] = useState(false);

  // Load tasks from API
  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/task/get");
      setTodos(res.data);
      // toast.success("Tasks loaded successfully!");
    } catch (error) {
      toast.error("Failed to load tasks. Try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [setTodos]);

  // Function to delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
      console.error(error);
    }
  };
  const handleUpadateTask = (id) => {
    setOpenPopUp(!openPopUp);
    setTaskId(id);
  };

  // const handleUpdateTask = async (id, status) => {
  //   // Optimistically update UI first

  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo._id === id ? { ...todo, taskStatus: !status } : todo
  //     )
  //   );

  //   try {
  //     const res = await axios.put(http://localhost:3000/api/task/${id}, {
  //       taskStatus: !status,
  //       task: updatedTask,
  //     });
  //     toast.success("Task status updated!");
  //     setOpenPopUp(!openPopUp);
  //   } catch (error) {
  //     toast.error("Failed to update task.");
  //     setOpenPopUp(!openPopUp);

  //     console.error(error);

  //     // Rollback UI in case of error
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) =>
  //         todo._id === id ? { ...todo, taskStatus: status } : todo
  //       )
  //     );
  //   }
  // };

  // const handlePopUp=(id)=>{

  // }
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-100 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          📝 Todo List
        </h2>

        {/* Form Component */}
        <Form setTodos={setTodos} setLoad={setLoad} loadTasks={loadTasks} />
        {/* Todo List */}
        <div className="mt-6">
          {todos.length === 0 ? (
            <div className="text-gray-600 text-center p-6 bg-gray-300 rounded-xl">
              <p className="text-lg">📭 No Tasks Added Yet!</p>
              <p className="text-sm">Start By Adding A New Task Above.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={todo._id || index}
                  className="bg-blue-200 text-blue-900 p-3 rounded-xl shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`${
                        todo.taskStatus ? "line-through text-gray-600" : ""
                      }`}
                    >
                      {todo.task}
                    </span>

                    {openPopUp && taskId == todo._id && (
                      <UpdateTask
                        setUpdatedTask={setUpdatedTask}
                        task={todo.task}
                        id={todo._id}
                        setOpenPopUp={setOpenPopUp}
                        setTodos={setTodos}
                        taskStatus={todo.taskStatus}
                      />
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <ImCross size={18} />
                    </button>
                    <button
                      onClick={() => handleUpadateTask(todo._id)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <MdCheckBoxOutlineBlank size={25} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
