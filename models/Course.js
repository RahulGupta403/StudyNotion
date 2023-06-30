const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true
    },
    courseDescription: {
        type: String,
        trim: true
    },
    instructor:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    whatWillYouLearn: {
        type: String,
        trim: true
    },
    courseContent: {
        type: mongoose.Schema.ObjectId,
        ref: "Section"
    },
    ratingAndReviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Rating"
        }
    ],
    price:{
        type:Number
    },
    thumbnail: {
        type: String
    },
    tag: {
        type: mongoose.Schema.ObjectId,
        ref: "Tag"
    },
    studentEnrolled: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User"
        }
    ]

});

module.exports = mongoose.model("Course", courseSchema);