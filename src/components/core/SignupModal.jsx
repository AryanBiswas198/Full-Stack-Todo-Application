import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import toast from "react-hot-toast";
import {sendOtp} from "../../services/operations/authAPI";

const SignupModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {

    if(data.password !== data.confirmPassword){
      toast.error("Passwords do not match");
      return;
    }

    dispatch(setSignupData(data)); // Store signup data in the slice
    dispatch(sendOtp(data.email, navigate));
  };

  return (
    <div
      className={isOpen ? "block" : "hidden"}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "999",
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          margin: "10% auto",
          padding: "20px",
          borderRadius: "30px",
          maxWidth: "400px",
        }}
      >
        <span
          style={{
            cursor: "pointer",
            float: "right",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          onClick={onClose}
        >
          &times;
        </span>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="w-full px-4 py-2 mb-4 border border-richblack-50 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <span className="text-red-500">First Name is required</span>
          )}
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="w-full px-4 py-2 mb-4 border border-richblack-50 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <span className="text-red-500">Last Name is required</span>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-richblack-50 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-richblack-50 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mb-4 border border-richblack-50 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">Confirm Password is required</span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mb-2 border border-richblack-50 bg-white text-black hover:bg-black hover:text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
