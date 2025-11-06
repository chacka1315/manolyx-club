import express from 'express';
import postsController from '../controllers/postsController.js';

const postsRouter = express.Router();
postsRouter.get('/create', postsController.messageCreateGet);
postsRouter.post('/create', postsController.messageCreatePost);
postsRouter.post('/:id/delete', postsController.deleteMessage);
export default postsRouter;
