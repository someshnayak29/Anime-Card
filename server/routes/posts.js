import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
//For routing we use express
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // :id as id is dynamic and user mentioned in url
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;