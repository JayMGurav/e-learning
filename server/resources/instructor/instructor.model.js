var mongoose = require('mongoose');

var SocialHandlesSchema = new mongoose.Schema({
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String }
});

var instructorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is the required field ']
        },
        email: {
            type: String,
            required: [true, 'email is the required field '],
            unique: true,
            lowercase: true,
            trim: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'others']
        },
        password: {
            type: String,
            required: [true, 'Password is the required field ']
        },
        avatar: {
            type: String
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        skills: [
            {
                type: String
            }
        ],
        bio: {
            type: String,
            required: true
        },
        profession: {
            type: String,
            required: true
        },
        socialMediaHandles: SocialHandlesSchema
    },
    { timestamps: true }
);
var Instructor = mongoose.model('instructor', instructorSchema);
module.exports = Instructor;
