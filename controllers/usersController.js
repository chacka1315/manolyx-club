import db from '../db/queries.js';
import validationsChain from '../middlewares/validationsChain.js';
import { validationResult, matchedData, body } from 'express-validator';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import auth from '../middlewares/auth.js';

const signUpGet = (req, res) => {
  res.render('pages/signup', {
    title: 'Sign up',
    formData: {},
  });
};

const signUpPost = [
  validationsChain.signup,
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      return res.render('pages/signup', {
        formData: req.body,
        errors,
        title: 'Register',
      });
    }

    const { username, firstname, lastname, password } = matchedData(req);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        username,
        firstname,
        lastname,
        password: hashedPassword,
      };
      await db.createUser(userData);
      res.redirect('/users/login');
    } catch (error) {
      next(error);
    }
  },
];

const loginGet = (req, res) => [
  res.render('pages/login', {
    title: 'Sign in',
    formData: {},
  }),
];

const loginPost = [
  validationsChain.login,
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      const formData = {
        username: req.body.username,
        password: req.body.password,
      };

      return res.render('pages/login', {
        formData,
        errors,
        title: 'Sign in',
      });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).render('pages/login', {
          title: 'Sign in',
          formData: req.body,
          message: info.message,
        });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  },
];

const joinClubGet = [
  auth.isAuth,
  (req, res, next) => {
    res.render('pages/beMember', {
      title: 'Join club',
    });
  },
];

const joinClubPost = [
  auth.isAuth,
  body('password').trim().notEmpty(),
  async (req, res, next) => {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      const error = 'Password should not remain empty.';
      return res.render('pages/beMember', {
        error,
        title: 'Join club',
      });
    }

    const password = req.body.password;
    if (password !== process.env.CLUB_PASSWORD) {
      const error = '❌ Incorrect password';
      return res.render('pages/beMember', {
        error,
        title: 'Join club',
      });
    }

    try {
      await db.makeMember(req.user.id);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

const beAdminGet = [
  auth.isMember,
  (req, res, next) => {
    res.render('pages/beAdmin', {
      title: 'Become admin',
    });
  },
];

const beAdminPost = [
  auth.isMember,
  body('password').trim().notEmpty(),
  async (req, res, next) => {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      const error = 'Password should not remain empty.';
      return res.render('pages/beMember', {
        error,
        title: 'Become admin',
      });
    }

    const password = req.body.password;
    if (password !== process.env.ADMIN_PASSWORD) {
      const error = '❌ Incorrect password';
      return res.render('pages/beAdmin', {
        error,
        title: 'Become admin',
      });
    }

    try {
      await db.makeAdmin(req.user.id);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

export default {
  signUpGet,
  signUpPost,
  loginGet,
  joinClubGet,
  beAdminGet,
  beAdminPost,
  loginPost,
  joinClubPost,
};
