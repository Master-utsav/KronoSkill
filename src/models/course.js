import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    course: {
        type: [String],  // Corrected: Use "String" instead of "string"
        required: true,
        unique: true
    },
    skills: {
        type: [String]  // Example: Add a field for skills associated with the course
    },
    description: {
        type: [String],
        required: [true, 'Please provide a description']
    }

});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;