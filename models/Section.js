const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionName:{
        type: String,
        trim: true
    },
    subSection: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "SubSection"
        }
    ]
});

module.exports = mongoose.model("SubSection", SectionSchema);