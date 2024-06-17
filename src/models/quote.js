import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
      quote: {
        type: String,
        required: [true, 'Please provide a quote'],
        unique: true
      },
      name: {
        type: String,   
        required: [true, 'Please provide a name']
      },
      title: {
        type: String,
        required: [true, 'Please provide a title']
      }
})

const Quotes = mongoose.models.Quotes || mongoose.model("Quotes", QuoteSchema);

export default Quotes;