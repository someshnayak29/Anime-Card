import { combineReducers } from 'redux';
import posts from './posts'; // only reducer we have currently
import auth from './auth';

export default combineReducers ({
    //use any individual reducers here
    posts,// Since both key and value are same posts : posts, therefore we can use only posts
    auth 
})