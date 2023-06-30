const Profile = require('../models/Profile');
const User = require("../models/User.js");

exports.updateProfile = async(req, res)=>{
    try{
        //get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

        //get userId
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //finding profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Details has been Successfully Updated"
        })


    }
    catch(error)
    {
    return res.status(500).json({
            success: false,
            message: "Error while updating Profile",
            error: error.message
        })
    }
}


//delete Account
//schedule this task
exports.deleteAccount = async(req, res)=>{
    try{
        // get id of user   
        const id = req.user.id;

        //Validation
        const userDetails = await User.findById(id);
        if(!userDetails)
        {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            });
        }


        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails});

        //unenroll user from all courses



        //delete user
        await User.findByIdAndDelete({ _id:id });

        //return response
        return res.status(200).json({
            sucess: true,
            message: "User Deleted Successfully"
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Error while updating Profile",
            error: error.message
        })
    }
}