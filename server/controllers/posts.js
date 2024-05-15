import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        //console.log(postMessages);
        // return status and array of all messages that is done using .json

        return res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();

        res.status(201).json(newPost);//201 is successful creation of post
    } catch (error) {
        res.status(409).json({ message: error.message });//unsuccessful creation
    }
}

// we will get id from req as it is : '/:id'

export const updatePost = async(req, res) => {
    const { id : _id } = req.params; // renamed id to _id

    //check if _id is valid mongoose id
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    const post = req.body;

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new : true });

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {

    const { id : _id } = req.params; // rename id to _id

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndDelete(_id);

    res.json({ message : 'Post deleted successfully' });
}

export const likePost = async(req, res) => {

    const { id : _id } = req.params;

    if(!req.userId) return res,json({ message : 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);

    // now we will see if the user's id is in the like section or not
    const index = post.likes.findIndex((id) => id === String(req.userId)); // likes is an array containing userId who have liked post

    // only when his id is not above then index will be -1
    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));// loop over all the ids and return array of all the likes besides the current persons like
    }

    //const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount : post.likeCount + 1}, { new : true });
    // second arg is obj where we send our updates

    // now we are not updating only the likecount as it is no longes there, we create a new post, as now we have likes in the post
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new : true });

    res.json(updatedPost);
}