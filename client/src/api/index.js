import axios from 'axios';

// here we will be making api calls using axios

//creating axios instance
const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    // we need this bcoz we have to send our token back to backend, so that backend middleware can verify that we are actually login

    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;

}); // adding something specific to each request, it will happen to all of our req

// const url = 'http://localhost:4000/posts'; 
// url pointing to backend routes, but not needed now, as url points to more than 1 thing now like users..

export const fetchPosts = () => API.get('/posts'); // this will fetch all the posts from the backend server
// now we will use this fetchPosts to perform operation.

// now we will add redux capabilities, all actions toward backend will be done using redux

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);