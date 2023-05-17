const { check } = require('express-validator');

exports.userRegistrationValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is missing')
    .isLength({ min: 5, max: 31 })
    .withMessage('name must have at least 5 characters')
    .isLength({ max: 31 })
    .withMessage('name can have maximum 31characters'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is missing')
    .isEmail()
    .withMessage('Not a valid email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 5 })
    .withMessage('password must have at least 5 characters'),
  check('dob')
    .trim()
    .notEmpty()
    .withMessage('dob is missing')
    .isISO8601()
    .toDate()
    .withMessage('Not a valid dob'),
  check('image')
    .optional()
    .isString()
    .withMessage('User image must be a string'),
];

exports.userLoginValidator = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is missing')
    .isEmail()
    .withMessage('Not a valid email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 5 })
    .withMessage('password must have at least 5 characters'),
];

const validateUserPasswordUpdate = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('oldPassword')
    .trim()
    .notEmpty()
    .withMessage('Old Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long'),
  check('newPassword')
    .trim()
    .notEmpty()
    .withMessage('New Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long'),
  check('confirmedPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
