const Course = require("../models.Course");
const Tag = require('../models/tags');
const User = require('../models/User');

//Create Course 

exports.createCourse = async (req, res)=>{
    try{
        // fetch data 
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            })
        }

        // Instructor id and user_id are same

        //check given details 
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails)
        {
    
            return res.status(404).json({
                success: false,
                message: "Tag details not found"
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url
        });

        //add new course to instructor
        await User.findByIdAndUpdate(
            {_id: instructor._id},
            { $push: { courses: newCourse._id } },
            {new: true},
            )

        //update tag schema
        await tags.findByIdAndUpdate(
            {_id: tagDetails._id},
            { $push: { courses: newCourse._id } },
            {new: true},
        )

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully"
        });
    }    
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Failed to Create Course",
            error: ErrorEvent.message
        })
    }
}


exports.showAllCourses = async (req, res)=>{
    try{
        const allCourses = await Course.find({}, { courseName: true,
                                                    price: true,
                                                    thumbnail: true,
                                                    instructor: true,
                                                    ratingAndReviews: true,
                                                    studentEnrolled: true })
                                                        .populate("instructor")
                                                        .exec();
        
        return res.status(200).json({
            success: true,
            message: "Data for all course fetched",
            data: allCourses
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "cannot fetch Course Data",
            error: error.message
        })
    }
}