import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between mt-4 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-4">
      <Link className="flex items-center gap-3" to="/">
        <CheckCircleIcon className="h-10 w-10 text-black" />
        <span
          className="text-4xl font-semibold"
          style={{
            backgroundImage: "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tasks
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-x-6 md:gap-x-10">
        <Link
          to="/"
          className="flex items-center font-semibold text-lg sm:text-2xl text-black transition duration-300 ease-in-out hover:underline hover:text-white"
        >
          <span>Home</span>
        </Link>
        <Link
          to="/todos"
          className="flex items-center font-semibold text-lg sm:text-2xl text-black transition duration-300 ease-in-out hover:underline hover:text-white"
        >
          <span>Todos</span>
        </Link>
        <Link
          to="/logout"
          className="flex items-center font-semibold text-lg sm:text-2xl text-black transition duration-300 ease-in-out hover:underline hover:text-white"
        >
          <span>Logout</span>
        </Link>
      </nav>
    </header>
  );
};


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
  

export default Header;
