import express from 'express';
import { signin, signup } from '../controllers/user.js';
//For routing we use express
const router = express.Router();

router.post('/signin', signin);// signin is post bcoz backend have to perform operation based on the users info
router.post('/signup', signup);

export default router;