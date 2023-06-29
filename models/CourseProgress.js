const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    courseID:{
        type: mongoose.Schema.ObjectId,
        ref: "course"
    },
    completedVideos: {
        type: mongoose.Schema.ObjectId,
        ref: "SubSection"
    }
});

module.exports = mongoose.model("CourseProgress", courseProgress);