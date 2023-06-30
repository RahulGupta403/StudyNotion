const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth 
exports.auth = async(req, res, next)=>{
    try{
        //extract token
        const token = req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer", "");

        //token missing
        if(!token)
        {
            return res.status(401).json({
                success: true,
                message: "Token is missing"
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error)
        {
            //verificatoin issues
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();
    }
    catch(error)
    {
        res.send(401).json({
            success: false,
            message: "something Went wrong While validating"
        })
    }
}


//isStudent
exports.isStudent = async(req, res, next)=>{
    try{
        if(user.user.accountType!=="Student")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for student only"
            });
        }
        next();
    }
    catch(error)
    {
        return res.send(500).json({
            success: false,
            message: "User role cannot be verified, Please try again later"
        })
    }
}



//   isInstructor
exports.isInstructor = async(req, res, next)=>{
    try{
        if(user.user.accountType!=="Instructor")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only"
            });
        }
        next();
    }
    catch(error)
    {
        return res.send(500).json({
            success: false,
            message: "User role cannot be verified, Please try again later"
        })
    }
}



//isAdmin
exports.isAdmin = async(req, res, next)=>{
    try{
        if(user.user.accountType!=="Admin")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only"
            });
        }
        next();
    }
    catch(error)
    {
        return res.send(500).json({
            success: false,
            message: "User role cannot be verified, Please try again later"
        })
    }
}