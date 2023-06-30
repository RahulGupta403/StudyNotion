const cloudinary = require("Cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality)=>{
    const options = { folder };

    if(height)
    {
        options.height = height;
    }

    if(quality)
    {
        options.quality = quality;
    }

    options.resources_type = "auto";

    return await cloudinary.uploader.upload(file, tempFilePath, options);
}