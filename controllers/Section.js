const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res)=>{
    try{
        //data fetch 
        const {sectionName, courseId } = req.body;

        //data Validation
        if(!sectoinName || !courseId)
        {
            return res.send(200).json({
                success: false,
                message: "Missing Properties"
            });
        }

        //create new section
        const newSection = await Section.create({ sectionName });

        // update course with section Objectid 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                        courseId,
                                                                        {
                                                                            $push:{ courseContent: newSection._id }
                                                                        },
                                                                        { new: true});
        //use populate to replace section/ Sub_section both in updatedCourseDetails
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            updatedCourseDetails
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, Please try again Later",
            error: error.message
        })
    }
}



exports.updateSection = async (req, res)=>{
    try{
        //data input
        const { sectionName, sectionId } = req.body;

        //data validation
        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate( sectionId, {sectionName}, {new: true});

        // return res
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully"
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, Please try again Later",
            error: error.message
        })
    }
}


exports.deleteSection() = async (req, res)=>{
    try{
        //get Id   sending id in params
        const { sectionId } = req.params;

        //use findByIdand delete
        await Section.findByIdAndDelete(sectionId);

        //return response
        return res.status(200).json({
            success: true,
            message: "section Deleted Succcessfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section ",
            error: error.message
        });
    }
}
