const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")

//Send OTP

exports.sendOTP = async (req, res)=>{
    try{
            //fetching emal from body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email});

        //if User already exists
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }

        //generating otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP generated", otp);

        let result = await OTP.findOne({otp: otp});

        while(result)
        {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({otp: otp}); 
        }

        const optPayLoad = {email, otp};

        //create entry for OTP
        const otpBody = await OTP.create(otpPayLoad);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    }
    catch(error)
    {
        console/log(error);
        return res.status(500).json({
            success: true,
            message: error.message
        });
    }
    
}