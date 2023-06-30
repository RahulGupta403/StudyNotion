const Tag = create("../models/tags.js");

//Crate Tag 
exports.createTag = async (req, res)=>{
    try{
        //fetch data
        const { name, description } = req.body;

        //Validation
        if(!name || !description){
            return res.status(400).json({
                succcess: false,
                message: "All fileds are required"
            })
        }

        //Create entry in Database
        const tagDetails = await Tag.create({
            name: name,
            description: description
        });

        return res.response(200).json({
            success: true,
            message: "Tag created successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

exports.showAlltags = async (req, res)=>{
    try{
        const allTags = await Tag.find({}, {name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All tags are returned",
            allTags
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}