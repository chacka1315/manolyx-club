import { body } from 'express-validator';
import userModel from '../db/UserModel.js';

const emailErr = 'This email address is not valid.';
const nameLengthErr = 'must be between  2 and 50 characters.';
const alphaErr = 'must only contain letters.';
const strongPasswordErr = `must contain at least one capital letter, one lowercase letter, and one number.`;

const confirmationPasswordMatchPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Confirmation password does not match the password.');
  }
  return true;
};

const emailNotInUse = async (value) => {
  const user = await userModel.findUserByUsername(value);
  if (user) {
    throw new Error('This email has already an account.');
  }
};

const signup = [
  body('username').trim().isEmail().withMessage(emailErr).custom(emailNotInUse),
  body('firstname')
    .trim()
    .isAlpha('fr-FR', { ignore: " '." })
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`First name ${nameLengthErr}`),
  body('lastname')
    .trim()
    .isAlpha('fr-FR', { ignore: " '" })
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`Last name ${nameLengthErr}`),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(`Password ${strongPasswordErr}`),
  body('password_confirmation').custom(confirmationPasswordMatchPassword),
];

const login = [
  body('username').trim().isEmail().withMessage(emailErr),
  body('password').trim().notEmpty().withMessage('Password must not be empty.'),
];

const message = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage('Title must be between 1 and 60 characters.'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message should not remain empty.'),
];

export default { signup, login, message };
