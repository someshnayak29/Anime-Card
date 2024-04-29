import axios from 'axios';

// here we will be making api calls using axios

const url = 'http://localhost:4000/posts'; // url pointing to backend routes

export const fetchPosts = () => axios.get(url); // this will fetch all the posts from the backend server
// now we will use this fetchPosts to perform operation.

// now we will add redux capabilities, all actions toward backend will be done using redux

export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);