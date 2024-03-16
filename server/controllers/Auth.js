const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();

// Send Otp Handler
exports.sendOtp = async(req, res) => {
    try{
        // Fetch data 
        const {email} = req.body;

        // validate
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User Already Registered",
            });
        }

        // Generate Otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("OTP Generated : ", otp);

        const result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        // Create an entry for otp in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


// Signup Handler
exports.signup = async(req, res) => {
    try{
        // Fetch data from req.body
        const {
            firstName, 
            lastName,
            email, 
            password, 
            confirmPassword,
            otp,
        } = req.body;


        // Validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success: false,
                message: "All Fields Are Required",
            });
        }

        if(password != confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password do not match",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // find most recent otp stored
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // Return res
        return res.status(200).json({
            success: true,
            message: "User Is Registered Successfully",
            user,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


// Login Handler
exports.login = async(req, res) => {
    try{

        // Fetch data from req body
        const {
            email,
            password,
        } = req.body;

        // Validate
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Input Fields Are Required",
            });
        }

        // Check if User Present or not
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is Not Signed Up",
            });
        }

        // Compare Pass
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email,
                id: user._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            // Create Cookie and Send Response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token, 
                user,
                message: "Logged In Successfully",
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect",
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}