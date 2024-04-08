import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAllCompletedUserTodos,
  deleteAllUserTodos,
  deleteTodo,
  getAllUserTodos,
  markTodoAsComplete,
  markTodoAsIncomplete,
} from "../services/operations/todoAPI";
import { logout } from "../services/operations/authAPI";
import AddTodoForm from "../components/core/AddTodoForm";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [todayDate, setTodayDate] = useState("");
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [todoId, setTodoId] = useState(null);

  const fetchTodosFromAPI = async () => {
    setLoading(true);
    try {
      const todosData = await getAllUserTodos(token);
      setTodos(todosData); // Set the fetched todos in the state
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodosFromAPI();

    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTodayDate(today.toLocaleDateString("en-US", options));
  }, []);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleTodoComplete = async (todoId) => {
    await markTodoAsComplete(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleTodoIncomplete = async (todoId) => {
    await markTodoAsIncomplete(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleDeleteAllTodos = async () => {
    await deleteAllUserTodos(token);
    await fetchTodosFromAPI();
  };

  const handleDeleteAllCompletedTodos = async () => {
    await deleteAllCompletedUserTodos(token);
    await fetchTodosFromAPI();
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center pt-28 px-28 pb-5">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold leading-none text-white mb-3">
            Create a
            <span
              style={{
                background: "linear-gradient(to right, #667EEA, #764BA2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              Todo{" "}
            </span>
            Now 🥰{"   "}👻
          </h1>
          <p className="text-lg text-white">{todayDate}</p>
        </div>
        <div className="flex items-center space-x-6">
          {" "}
          {/* Updated line */}
          <button
            onClick={handleLogout}
            className="h-10 mb-2.2 mr-3"
            size="icon"
            variant="outline"
            title="Log Out"
          >
            <LogOutIcon className="h-6 w-6 text-white" />
          </button>

          <Link
            to="#"
            className=""
            size="icon"
            variant="outline"
            onClick={() => {
              setShowAddTodoForm(true);
              setIsAdd(true);
            }}
            style={{
              background: "linear-gradient(to right, #667EEA, #764BA2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
            }}
            title="Add Todo"
          >
            <PlusIcon className="h-8 w-8 mr-1 text-white" />
          </Link>
        </div>
      </div>

      <main className="flex-1 w-full px-14 py-4">
        <div className="flex flex-col gap-px">
          {todos.length === 0 ? (
            <div className="py-28 text-center text-white font-semibold text-lg flex flex-col">
              You do not have any pending work, create a new Todo now
              <button
                onClick={() => {
                  setShowAddTodoForm(true);
                  setIsAdd(true);
                }}
                className="mt-6 mx-auto border border-richblack-50 hover:bg-black hover:opacity-70 hover:text-white rounded-lg px-4 py-2 bg-indigo-600 text-white "
              >
                Create Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-10">
              {todos.map((todo) => (
                <div key={todo.id} className="p-4 rounded-xl bg-richblack-900">
                  <div className="flex items-center space-x-4 py-1.5 px-4">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border border-richblack-50"
                      id={`todo-${todo.id}`}
                      onChange={(e) =>
                        e.target.checked
                          ? handleTodoComplete(todo?._id)
                          : handleTodoIncomplete(todo?._id)
                      }
                    />
                    <label
                      className={`flex-1 text-2xl font-semibold ${
                        todo.completed
                          ? "line-through text-white"
                          : "text-white"
                      }`}
                      htmlFor={`todo-${todo.id}`}
                    >
                      {todo.title}
                      <p className="text-sm font-semibold text-pure-greys-200">
                        {todo.description}
                      </p>
                    </label>
                    <button
                      className="h-6"
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setShowAddTodoForm(true);
                        setIsAdd(false);
                        setTodoId(todo?._id);
                      }}
                      title="Update Todo"
                    >
                      <UpdateIcon className="h-5.5 w-6 mr-5 text-white" />
                      <span className="sr-only">Update</span>
                    </button>
                    <button
                      className="h-6"
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(todo?._id)}
                      title="Delete Todo"
                    >
                      <TrashIcon className="h-5.5 w-6 text-white" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full px-6 py-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-lg pt-16 font-semibold text-white">
            {todos.length} items left
          </p>
          <div className="flex space-x-10">
            <button
              className="text-md font-medium text-white hover:text-blue-100 hover:underline"
              onClick={() => handleDeleteAllTodos()}
            >
              Delete All Todos
            </button>
            <button
              className="text-md font-medium text-white hover:text-blue-100 hover:underline"
              onClick={() => handleDeleteAllCompletedTodos()}
            >
              Delete All Completed
            </button>
          </div>
        </div>
      </footer>

      {showAddTodoForm && (
        <AddTodoForm
          showAddTodoForm={showAddTodoForm}
          setShowAddTodoForm={setShowAddTodoForm}
          fetchTodosFromAPI={fetchTodosFromAPI}
          isAdd={isAdd}
          todoId={todoId}
        />
      )}
    </div>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="60" // Adjust the width as needed
      height="60" // Adjust the height as needed
      viewBox="0 0 60 60" // Larger viewBox to make the icon bigger within the container
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        background: "linear-gradient(to right, #667EEA, #764BA2)",
        borderRadius: "8px", // Adjust the border radius as needed
        padding: "0px", // Adjust the padding as needed
      }}
    >
      <path d="M15 30h30" />{" "}
      {/* Adjust the path to position the smaller icon */}
      <path d="M30 15v30" />{" "}
      {/* Adjust the path to position the smaller icon */}
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UpdateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19h9M4.73 15l-2.26 2.26a2 2 0 0 0 0 2.83l8.49 8.5a2 2 0 0 0 2.83 0l2.26-2.26" />
      <path d="M16 3L2 17l6 6 14-14-6-6z" />
    </svg>
  );
}
