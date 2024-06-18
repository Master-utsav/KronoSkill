import mongoose from 'mongoose'

const PlaylistSchema = new mongoose.Schema({
     
    title : {
        type : String,
        required : [true, 'Please provide a title']
    },
    description : {
        type : String,
        required : [true, 'Please provide a description']
    },
    thumbnail : {
        type : String,
        required : [true, 'Please provide a thumbnail']
    },
    skill : {
        type : [String],
        required : [true, 'Please provide the skill']
    },
    playlistUrl:{
        type : String,
        required : [true, 'Please provide the playlist url'],
        unique : true
    },
    channelTitle: {
        type: String,
        required: [true, 'Please provide a channel']
    },
    rating: [{
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rateNumber: {
          type: Number,
          required: true
        }
      }],
    bookmarks: [{
        playlistUrl: {
          type: String,
          unique: true,
        },
        isMarked : {
          type: Boolean,
          default: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
      }],
})
  
  // Ensure virtuals are included in toJSON and toObject outputs
  PlaylistSchema.set('toJSON', { virtuals: true });
  PlaylistSchema.set('toObject', { virtuals: true });

const Playlists = mongoose.models.Playlists || mongoose.model("Playlists", PlaylistSchema);

export default Playlists