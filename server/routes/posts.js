import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'; // since we are on backend we have to write .js explicitly
//For routing we use express
const router = express.Router();

router.get('/', getPosts); // anyone can see posts, so no auth req
router.post('/', auth, createPost); // to create a post u need to be logged in
router.patch('/:id', auth, updatePost); // :id as id is dynamic and user mentioned in url
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); // although anyone can like the post we dont want it to be liked 2,3,... times by a single user

export default router;