import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTodo, updateTodo } from "../../services/operations/todoAPI";
import ThinkMemoji from "../../assets/ThinkMemoji.png";

export default function AddTodoForm({ showAddTodoForm, setShowAddTodoForm, fetchTodosFromAPI, isAdd, todoId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    setShowAddTodoForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdd) {
      await createTodo(title, description, token);
    } else {
      await updateTodo(todoId, title, description, token);
    }

    fetchTodosFromAPI();

    setShowAddTodoForm(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={showAddTodoForm ? "block" : "hidden"}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        zIndex: "999",
        overflow: "auto",
      }}>
      <div className="flex justify-center items-center h-full">
        <div className={`flex flex-col ${isMobile ? "order-1" : "order-2"}`}>
          {isMobile && (
            <img
              src={ThinkMemoji}
              alt="Thinking Emoji"
              className="w-60 h-60 mb-4"
            />
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-richblack-900 p-6 rounded-lg shadow-md w-80"
            style={{
              maxWidth: "90%",
              borderRadius: "10px",
            }}
          >
            <h2 className="text-3xl text-white font-semibold mb-6">
              {isAdd ? "Add Todo" : "Update Todo"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-white text-md font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={handleTitleChange}
                className="mt-1 border px-4 py-3 border-pure-greys-5 bg-richblack-900 text-white block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-md text-white font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                placeholder="Description"
                onChange={handleDescriptionChange}
                className="mt-1 border px-4 py-3 text-white border-pure-greys-5 bg-richblack-900 block w-full shadow-sm sm:text-sm rounded-md resize-none h-32 my-5"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancelClick}
                className="inline-flex text-white justify-center px-4 py-2 text-sm font-medium rounded-md mr-3"
                style={{
                  background: "linear-gradient(to right, #667EEA, #764BA2)",
                  backgroundSize: "200% auto",
                  backgroundPosition: "right center",
                }}
                onMouseEnter={(e) => e.target.style.backgroundPosition = "right center"}
                onMouseLeave={(e) => e.target.style.backgroundPosition = "left center"}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex text-white justify-center px-4 py-2 text-sm font-medium rounded-md mr-3"
                style={{
                  background: "linear-gradient(to right, #667EEA, #764BA2)",
                  backgroundSize: "200% auto",
                  backgroundPosition: "right center",
                }}
                onMouseEnter={(e) => e.target.style.backgroundPosition = "right center"}
                onMouseLeave={(e) => e.target.style.backgroundPosition = "left center"}
              >
                {
                  isAdd ? "Create" : "Update"
                }
              </button>
            </div>
          </form>
        </div>
        {!isMobile && (
          <img
            src={ThinkMemoji}
            alt="Thinking Emoji"
            className="w-60 h-60 mb-4 order-2 ml-8"
          />
        )}
      </div>
    </div>
  );
}
