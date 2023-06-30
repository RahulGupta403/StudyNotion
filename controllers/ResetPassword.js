const User = require("../models/User");
const mailSender = require('../utils/mailSender');

//resetPasswordToken
exports.resetPasswordToken = async  (req, res)=>{
    try{

            //get email from req body 
        const email = req.body.email;

        //check user for this email, email Validation
        const user = await User.findOne({ email: email});
        if(!user){
            return res.json({ 
                Success: false,
                message: "Your Email is not registered."
            });
        };
        // generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updateDetails = await User.findByIdAndUpdate({email: email},
                                                            { token: token,
                                                            resetPasswordExpires: Date.now()+5*60*1000},
                                                            {new: true});

        //create url
        const url = "http://localhost:3000/update-password/${token}"

        //send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link: {url}`);

        //return response
        return res.json({
            success: true,
            message: "Email Sent Successfully, Please check Email for password reset link"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting password"
        })
    }
};