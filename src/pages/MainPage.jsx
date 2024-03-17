import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAllCompletedUserTodos, deleteAllUserTodos, deleteTodo, getAllUserTodos, markTodoAsComplete, markTodoAsIncomplete } from "../services/operations/todoAPI";
import { logout } from "../services/operations/authAPI";
import AddTodoForm from "../components/core/AddTodoForm";
import Footer from "./Footer";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const [todayDate, setTodayDate] = useState('');
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [todoId, setTodoId] = useState(null);


  const fetchTodosFromAPI = async () => {
      setLoading(true);
      try {
        const todosData = await getAllUserTodos(token);
        setTodos(todosData); // Set the fetched todos in the state
      } 
      catch (error) {
        console.error("Error fetching todos:", error);
      }
      setLoading(false);
    };


  useEffect(() => {
    fetchTodosFromAPI();

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTodayDate(today.toLocaleDateString('en-US', options));
  }, []);


  const handleLogout = () => {
    dispatch(logout(navigate));
  }

  const handleDelete = async(todoId) => {
    await deleteTodo(todoId, token);
    await fetchTodosFromAPI();
  }

  const handleUpdate = async(todoId) => {

  }

  const handleTodoComplete = async(todoId) => {
    await markTodoAsComplete(todoId, token);
    await fetchTodosFromAPI();
  }

  const handleTodoIncomplete = async(todoId) => {
    await markTodoAsIncomplete(todoId, token);
    await fetchTodosFromAPI();
  }

  const handleDeleteAllTodos = async() => {
    await deleteAllUserTodos(token);
    await fetchTodosFromAPI();
  }
  
  const handleDeleteAllCompletedTodos = async() => {
    await deleteAllCompletedUserTodos(token);
    await fetchTodosFromAPI();
  }

  return (
    <div className="grid grid-rows-[auto 1fr auto] w-full min-h-screen gap-px px-6">
      <div className="flex items-center p-4">
        <div className="space-y-2">
          <header className="text-5xl font-bold leading-none">
            Today's Task
          </header>
          <div className="text-md text-gray-500 ml-1">{todayDate}</div>
        </div>
        <div className="ml-auto space-x-4">
          <button className="h-10 mb-6" size="icon" variant="outline" onClick={handleLogout}>
            <LogOutIcon className="h-6 w-6"  />
            <span className="sr-only">Logout</span>
          </button>
          <Link className="h-10" size="icon" variant="outline" onClick={() => {
            setShowAddTodoForm(true);
            setIsAdd(true);
            }}>
            <PlusIcon className="h-6 w-6 mr-1" />
            <span className="sr-only">Add</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-px">
        {todos.length === 0 ? (
          <div className="p-5 text-center font-semibold text-lg flex flex-col">
            You do not have any pending work, create a new Todo now
            <button onClick={() => {
              setShowAddTodoForm(true);
              setIsAdd(true);
            }} className="mt-6 mx-auto border border-richblack-50 hover:bg-black hover:opacity-70 hover:text-white rounded-lg px-4 py-2 bg-indigo-600 text-black ">
              Create Now
            </button>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 items-start gap-4 border-t border-b border-richblack-50">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 border border-richblack-50"
                  id={`todo-${todo.id}`}
                  onChange={(e) => e.target.checked ? handleTodoComplete(todo?._id) : handleTodoIncomplete(todo?._id)} 
                />
                <label
                  className={`flex-1 text-lg font-semibold ${
                    todo.completed ? "line-through" : ""
                  }`}
                  htmlFor={`todo-${todo.id}`}
                >
                  {todo.title}
                  <p className="text-xs text-gray-400">{todo.description}</p>
                </label>
                <button className="h-6" size="icon" variant="outline" onClick={() => {
                  setShowAddTodoForm(true);
                  setIsAdd(false);
                  setTodoId(todo?._id);
                }} >
                  <UpdateIcon className="h-4.5 w-5" />
                  <span className="sr-only ">Update</span>
                </button>
                <button className="h-6" size="icon" variant="outline" onClick={() => handleDelete(todo?._id)} >
                  <TrashIcon className="h-4.5 w-5" />
                  <span className="sr-only ">Delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
        <footer className="p-4 grid grid-cols-1 items-center gap-4">
          <div className="text-lg pt-16 font-semibold text-gray-500">{todos.length} items left</div>
          <div className="flex space-x-10 justify-center items-center">
            <button className="text-md font-medium text-gray-500 hover:text-blue-500 hover:underline" onClick={() => handleDeleteAllTodos()}>Delete All Todos</button>
            <button className="text-md font-medium text-gray-500 hover:text-blue-500 hover:underline" onClick={() => handleDeleteAllCompletedTodos()} >
              Delete All Completed
            </button>
          </div>
        </footer>
      </div>
      {showAddTodoForm && <AddTodoForm showAddTodoForm={showAddTodoForm} setShowAddTodoForm={setShowAddTodoForm} fetchTodosFromAPI={fetchTodosFromAPI} isAdd={isAdd} todoId={todoId} />}
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



