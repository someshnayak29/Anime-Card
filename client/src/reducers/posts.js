// reducer is a function which accepts state and action and based on action.type
// state always has to be something, therefore we have used [] currently and state is posts here in this case
// we are not gonna use it here therefore we can use export default instead of const store
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

export default(posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL: 
            return action.payload;// since payload has all the data of posts
        case CREATE:
            return [...posts, action.payload];//spread all the posts and new post is stored in action.payload
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); // action.payload is the updated post, update the post which has same id and rest all return as it is
        case DELETE:
            return posts.filter((post) => post._id !== action.payload._id);// keep all posts except one with that id
        default:
            return posts;
    }
}