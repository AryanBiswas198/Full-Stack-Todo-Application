import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/core/LoginModal";
import SignupModal from "../components/core/SignupModal";
import Footer from "./Footer";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setLoginClicked(true); // Update state when login button is clicked
    setSignupClicked(false); // Reset state for signup button
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setLoginClicked(false); // Reset state when modal is closed
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setSignupClicked(true); // Update state when signup button is clicked
    setLoginClicked(false); // Reset state for login button
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
    setSignupClicked(false); // Reset state when modal is closed
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <header className="flex items-center justify-between mt-2 p-7">
        <Link className="flex items-center gap-3" to="/">
          <CheckCircleIcon className="h-8 w-8" />
          <span className="text-4xl font-semibold">Tasks</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4" />
      </header>

      <main className="flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            Your Tasks. Organized.
          </h1>
          <p className="text-richblack-400 text-lg">
            The only to-do list you'll ever need.
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-4">
          <input
            className="w-full border border-richblack-50 rounded-lg px-4 py-2"
            placeholder="Enter your email"
            required
            type="email"
          />
          <button className="w-full rounded-lg bg-black text-white font-medium py-2.5 hover:opacity-80">
            Sign up for early access
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={openLoginModal}
              className={`rounded-full border-2 border-richblack-50 h-12 w-36 ${loginClicked ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
              variant="outline"
            >
              Login
            </button>

            <button
              onClick={openSignupModal}
              className={`rounded-full border-2 border-richblack-50 h-12 w-36 ${signupClicked ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              Sign up
            </button>
          </div>
        </div>
      </main>

      {/* <footer className="flex items-center justify-center bg-richblack-5 p-4">
        <p className="text-sm text-gray-500">
          © 2024 Aryan Biswas. All rights reserved.
        </p>
      </footer> */}
      <Footer />

      <LoginModal isOpen={showLoginModal} onClose={closeLoginModal} />
      <SignupModal isOpen={showSignupModal} onClose={closeSignupModal} />
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

