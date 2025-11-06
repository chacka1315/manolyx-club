import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import db from '../db/queries.js';

export default function configurePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.findUserByUsername(username);
        if (!user) {
          return done(null, false, {
            message: 'No account with that username.',
          });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Wrong password!' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.findUserById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
}
