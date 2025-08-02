import express from 'express'
import { createdComment, getCommentById } from '../controllers/commentController.js';
const router = express.Router();


router.get('/:id', getCommentById)
router.post('/', createdComment)
export default router;