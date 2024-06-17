import mongoose from "mongoose";


const AdvantagesSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please provide a title']
    },
    description : {
        type: String,
        required: [true, 'Please provide a description']
    },
    content : {
        type : HTMLElement,
        required : [true, 'Please provide a content']
    }
})

const Advantages = mongoose.models.Advantages || mongoose.model("Advantages", AdvantagesSchema);

export default Advantages