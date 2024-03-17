// AddTodoForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo, updateTodo } from "../../services/operations/todoAPI";

export default function AddTodoForm({ showAddTodoForm, setShowAddTodoForm, fetchTodosFromAPI, isAdd, todoId}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    setShowAddTodoForm(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isAdd){
        await createTodo(title, description, token);
    }
    else{
        await updateTodo(todoId, title, description, token);
    }
    
    fetchTodosFromAPI();

    setShowAddTodoForm(false);
  };

  return (
    <div className={showAddTodoForm ? "block" : "hidden"}
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "999",
      overflow: "auto",
    }}>
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4">
            {isAdd ? "Add Todo" : "Update Todo"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
            className="mt-1 border p-2 border-richblack-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
            className="mt-1 border p-2 border-richblack-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md resize-none h-32"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancelClick}
            className="inline-flex border border-richblack-50 justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:bg-black hover:text-white hover:opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex border border-richblack-50 justify-center px-4 py-2 text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 hover:bg-black hover:text-white hover:opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {
                isAdd ? "Create" : "Update"
            }
          </button>
        </div>
      </form>
    </div>
  );
}
