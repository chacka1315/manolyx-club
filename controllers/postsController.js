import auth from '../middlewares/auth.js';
import validationsChain from '../middlewares/validationsChain.js';
import { matchedData, validationResult } from 'express-validator';
import NotFoundError from '../errors/NotFoundError.js';
import postModel from '../db/PostModel.js';

const messageCreateGet = [
  auth.isAuth,
  (req, res) => {
    res.render('pages/postForm', {
      title: 'New post',
      formData: {},
    });
  },
];

const messageCreatePost = [
  validationsChain.message,
  async (req, res, next) => {
    const validationErr = validationResult(req);

    if (!validationErr.isEmpty()) {
      const errors = validationErr.array();
      return res.render('pages/postForm', {
        errors,
        formData: req.body,
        title: 'New post',
      });
    }

    const { title, message } = matchedData(req);
    const data = { title, message, user_id: req.user.id };
    try {
      await postModel.createPost(data);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

const deleteMessage = [
  auth.isAdmin,
  async (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id)) {
      throw new NotFoundError('No post with that id!');
    }

    try {
      await postModel.deletePost(Number(id));
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

export default { messageCreateGet, messageCreatePost, deleteMessage };
