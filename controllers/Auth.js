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









//sign up

exports.signUp = async (req, res)=>{

    //data fetch from body
    const  {
        firstName,
        lastName,
        email, 
        password,
        confirmPassword,
        accountType,
        otp
    } = req.body;

    //validate 
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
    {
        return res.status(403).json({
            success: false,
            message: "All fields are required"
        })
    }

    // check if password and confirm password are same
    if(password !==confirmPassword)
    {
        return res.status(400).json({
            success: true,
            message: "Password and Confirm Password should be same"
        });
    }

    //check if user already exists
    const exists_user = await User.findOne({email});
    if(exists_user) {
        return res.status(400).json({
            success: false,
            message: "User already registerd"
        });
    }

    //recent otp
    const recent_otp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
    console.log(recent_otp);

    if(recent_otp.length == 0)
    {
        return res.status(400).json({
            success: false,
            message: "OTP Not Found"
        })
    }
    else if(otp != recent_otp)
    {
        //otp is invalid
        return res.status(400).json({
            success: true,
            message: "OTP didn't match"
        })
    }
}