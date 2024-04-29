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
    const newPost = new PostMessage(post);
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

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(_id);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount : post.likeCount + 1}, { new : true });
    // second arg is obj where we send our updates

    res.json(updatedPost);
}