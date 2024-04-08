import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-between min-h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1582491795316-0782a861c529?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <Header />

      <main className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32">
        <div className="text-center mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Your Tasks.{" "}
            <span
              style={{
                backgroundImage:
                  "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Organized.
            </span>
          </h1>
          <p
            className="text-md md:text-lg"
            style={{
              backgroundImage:
                "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The only to-do list you'll ever need.
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-4 mt-4 sm:mt-6">
          <input
            className="w-full border border-richblack-50 rounded-lg px-4 py-2"
            placeholder="Enter your email"
            required
            type="email"
          />
          <button className="w-full rounded-lg bg-black text-white font-medium py-2.5 hover:opacity-80">
            Sign up for daily emails...
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-4">
            <Link to="signupPage">
              <button
                className="w-full px-4 py-2 border border-black text-white font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out"
            style={{
              background: "linear-gradient(to right, #667EEA, #764BA2)",
              backgroundSize: "200% auto",
              backgroundPosition: "right center",
            }}
            onMouseEnter={(e) => e.target.style.backgroundPosition = "right center"}
            onMouseLeave={(e) => e.target.style.backgroundPosition = "left center"}
              >
                Create your first todo
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}