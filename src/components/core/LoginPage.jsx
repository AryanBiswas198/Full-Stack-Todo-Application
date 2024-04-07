import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import LoginMemoji from "../../assets/LoginMemoji.png"; // Import the LoginMemoji image

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(login(data.email, data.password, navigate));
  };

  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
      <div className="md:w-66 md:mr-20 mb-10 md:mb-0"> {/* Adjusted width and margin for mobile and desktop */}
        <img
          src={LoginMemoji}
          alt="Login Memoji"
          className="w-64 md:w-full"
          style={{ margin: '0 auto' }} // Adjusted width for mobile and desktop
        />
      </div>
      <div className="bg-richblack-900 p-8 md:p-12 rounded-2xl w-full md:max-w-md shadow-lg-purple"> {/* Adjusted width to 80 Tailwind CSS units */}
        <h2 className="font-bold text-white text-4xl mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full"> {/* Adjusted height to 96 Tailwind CSS units */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 mb-7 bg-richblack-900 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }} // Adjust border width here
          />
          {errors.email && (
            <span className="text-white">Email is required</span>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="w-full px-4 py-3 mb-11 bg-richblack-900 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }} // Adjust border width here
          />
          {errors.password && (
            <span className="text-white">Password is required</span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 border border-black text-white font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out"
            style={{
              background: "linear-gradient(to right, #667EEA, #764BA2)",
              backgroundSize: "200% auto",
              backgroundPosition: "right center",
            }}
            onMouseEnter={(e) => e.target.style.backgroundPosition = "right center"}
            onMouseLeave={(e) => e.target.style.backgroundPosition = "left center"}
          >
            Login
          </button>
          <p className="text-center my-2 text-white py-2">or</p>
          <h2 className="text-center text-white mb-6">
            Don't have an account?  
            <Link to="/signupPage">
              <span style={{ background: "linear-gradient(to right, #667EEA, #764BA2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> Register</span>
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
