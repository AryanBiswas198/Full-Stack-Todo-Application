import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserTodos } from "../services/operations/todoAPI";

export default function MainPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    // Simulating fetching todos from an API
    const fetchTodosFromAPI = async () => {

      setLoading(true);
      try {
        const todosData = await dispatch(getAllUserTodos(token));
        setTodos(todosData); // Set the fetched todos in the state
      } 
      catch (error) {
        console.error("Error fetching todos:", error);
      }
      setLoading(false);
    };

    fetchTodosFromAPI();
    console.log("Printing Token -> ", token);
  }, []);

  return (
    <div className="grid grid-rows-[auto 1fr auto] w-full min-h-screen gap-px">
      <div className="flex items-center p-4 border-b">
        <div className="space-y-2">
          <header className="text-3xl font-bold leading-none">
            Today's Task
          </header>
          <div className="text-sm text-gray-500">March 15, 2024</div>
        </div>
        <div className="ml-auto space-x-4">
          <button className="h-10" size="icon" variant="outline">
            <LogOutIcon className="h-6 w-6" />
            <span className="sr-only">Logout</span>
          </button>
          <Link to="/add-todo" className="h-10" size="icon" variant="outline">
            <PlusIcon className="h-6 w-6" />
            <span className="sr-only">Add</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-px">
        {todos.length === 0 ? (
          <div className="p-4 text-center border-b">
            You do not have any pending work, create a new Todo now
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 items-start gap-4">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 border"
                  id={`todo-${todo.id}`}
                />
                <label
                  className={`flex-1 text-sm font-medium ${
                    todo.completed ? "line-through" : ""
                  }`}
                  htmlFor={`todo-${todo.id}`}
                >
                  {todo.title}
                  <p className="text-xs text-gray-400">{todo.description}</p>
                </label>
                <button className="h-6" size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
        <footer className="p-4 border-t grid grid-cols-1 items-center gap-4">
          <div className="text-sm text-gray-500">{todos.length} items left</div>
        </footer>
      </div>
    </div>
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
