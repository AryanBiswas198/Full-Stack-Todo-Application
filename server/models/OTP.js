const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },

    otp: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60*5,
    }
});

async function sendVerificationEmail(email, otp){

    try{
        const mailResponse = await mailSender(email, "Verification Email", emailTemplate(otp));
        console.log("Email Send Successfully: ", mailResponse);
    }
    catch(err){
        console.log("Error occured while sending Email ", err);
        throw err;
    }
}

otpSchema.pre("save", async function(next) {

    console.log("New document saved to database");
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", otpSchema);