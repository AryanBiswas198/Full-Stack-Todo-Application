const express = require("express");
const router = express.Router();

// Import controllers and middleware functions
const {
    sendOtp,
    signup,
    login,
} = require("../controllers/Auth");


// Authentication Routes 

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for Send Otp
router.post("/sendotp", sendOtp);



// EXPORT the router for use in main application
module.exports = router;