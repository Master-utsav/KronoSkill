import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Please provide a skill'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    }
})

const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);

export default Skill