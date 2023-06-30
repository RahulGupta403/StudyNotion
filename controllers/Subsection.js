const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

//create subsection
exports.createSubSection = async (req, res)=>{
    try{
        // data fetch from body 
        const { sectionId, title, timeDuration, description } = req.body;

        //extract file 
        const video = req.files.videoFile;

        //validation
        if(!sectioId || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All files are required"
            });
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        //update subsection with subsection
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                                        {$push:
                                                                                {subSection: subSectionDetails._id}},
                                                                                {new: true});
        // log updated section here after adding populate 

        //return response
        return res.status(200).json({
            success: true,
            message: " SubSection Created Successfully",
            updatedSection,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}


//update subsection




//delete subsection