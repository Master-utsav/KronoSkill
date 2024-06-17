import mongoose from 'mongoose'

const InstructorSchema = new mongoose.Schema({
  channelName : {
    type: String,
    required: [true, 'Please provide a first name']
  },
  image: {
    type: String,
    required: [true, 'Please provide a image link'],
    unique: true,
  },
  skill: {
    type: [String],
    required : [true , 'Please provide the skill name']
  },
  channelId: {
    type: String,
    required: [true, 'Please provide the channelId link'],
    unique : true,
  },
  channelLink : {
    type : String,
    required : [true , 'Please provide the channel link'],
    unique : true
  }

})

// next js works on edge so first we check that is there any users collection created or not
const Instructor = mongoose.models.Instructor || mongoose.model("Instructor", InstructorSchema);

export default Instructor;
