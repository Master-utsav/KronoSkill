import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    videoChannelName: {
        type: String,
        required: [true, 'Please provide a channel']
    },
    videoLink: {
        type: String,
        required: [true, 'Please provide a video link'],
        unique: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Please provide a thumbnail'],
        unique: true,
    },
    course : {
        type: [String],
        required: [true, 'Please provide the course']
    },
    skill : {
        type: [String],
        required: [true, 'Please provide the skill']
    },
    likeCount: {
        type: Number,
    }
}) 

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default Video