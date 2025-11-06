import express from 'express';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import morgan from 'morgan';
import connectPgSimple from 'connect-pg-simple';
import NotFoundError from './errors/NotFoundError.js';
import configurePassport from './config/passport.js';

//routers  import
import indexRouter from './routes/indexRouter.js';
import usersRouter from './routes/usersRouter.js';
import postsRouter from './routes/postsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, 'public');
const pgSessionStore = connectPgSimple(session);
const sessionStore = new pgSessionStore({
  conObject: { connectionString: process.env.DATABASE_URL },
  createTableIfMissing: true,
});

//app setup
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//global middlewares
app.use(morgan('dev'));
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  }),
);
configurePassport(passport);
app.use(passport.session());
app.use((req, res, next) => {
  if (req.user) res.locals.user = req.user;
  next();
});

//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

//errors handling
app.use((req, res) => {
  throw new NotFoundError('Page not found!');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).render('pages/404');
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('🌎 Server is running on PORT ', PORT);
});
