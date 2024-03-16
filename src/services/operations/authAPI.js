import { toast } from "react-hot-toast";

import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
}  = endpoints;

export function sendOtp(email, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading.....");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", "http://localhost:4000/api/v1/auth/sendotp", {
                email,
                checkUserPresent: true,
            });

            console.log("SEND_OTP API RESPONSE -> ", response);

            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        }
        catch(error){
            console.log("SEND_OTP_API_ERROR................", error);
            toast.error("Could not send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            };
            toast.success("Signup Successful");
            navigate("/");
        } 
        catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));


            navigate("/main-page");
        } 
        catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}