import express from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/signup', usersController.signUpGet);
usersRouter.post('/signup', usersController.signUpPost);
usersRouter.get('/login', usersController.loginGet);
usersRouter.post('/login', usersController.loginPost);
usersRouter.get('/join', usersController.joinClubGet);
usersRouter.post('/join', usersController.joinClubPost);
usersRouter.get('/beAdmin', usersController.beAdminGet);
usersRouter.post('/beAdmin', usersController.beAdminPost);
usersRouter.get('/logout', (req, res) => {
  req.logout((err) => {});
  res.redirect('/');
});

export default usersRouter;
