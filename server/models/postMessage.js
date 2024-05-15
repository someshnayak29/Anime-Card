import mongoose from 'mongoose';

// Define a Schema

const postSchema = mongoose.Schema({
    //Elements of each post

    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String, // base 64 image
    /*likeCount: {
        // not number straightaway as we want it to have additional info i.e. intial value
        type: Number,
        default: 0 //initial value
    },*/
    likes: {
        type : [String], // i.e. array of strings
        default : [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// creating model
const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage; 