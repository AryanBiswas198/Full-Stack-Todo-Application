import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp, sendOtp } from "../services/operations/authAPI";


export default function VerifyEmail() {

  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const handleResend = () => {
    // Implement logic to resend the verification code
    dispatch(sendOtp(signupData.email, navigate));
  };


  const handleClose = () => {
    // Implement logic to close the verification panel
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-2xl font-semibold">Two-Step Verification</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={handleClose}
          >
            <PanelTopCloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <SmartphoneIcon className="mb-3 h-12 w-12 text-blue-500" />
          <p className="mb-2 text-center text-sm text-gray-600">
            {
              `Please enter the OTP (one-time password) to verify your account. A
            Code has been sent to ${signupData.email}`
            }
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              placeholder="Enter your OTP"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-4 py-2 rounded-md border border-richblack-50  focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full border font-semibold border-richblack-50 bg-white text-black hover:bg-black hover:text-white px-4 py-2 rounded-md"
            >
              Verify
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center space-y-2">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={handleResend}
          >
            Not received your code? Resend code
          </button>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Back To SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

function PanelTopCloseIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m9 16 3-3 3 3" />
    </svg>
  );
}

function SmartphoneIcon(props) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}