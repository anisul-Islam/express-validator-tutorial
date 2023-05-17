# validation with express-validator

- [official doc] (https://express-validator.github.io/docs/)

- step 1: `npm install express-validator`
- step 2: create the sanitation rules that you want to use for validating the data

```js
// validation/auth.js
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

const { check } = require('express-validator');

const validateProduct = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Product Name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Product Name should be at least 3-200 characters long'),
  check('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 3 })
    .withMessage('Description should be at least 3 characters long'),
  check('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  check('category').trim().notEmpty().withMessage('Category is required'),
  check('quantity')
    .trim()
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
];

module.exports = { validateProduct };
```

- step 3: run the validation

```js
// validation/index.js
const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsList = errors.array().map((error) => error.msg);
    // return res.status(400).json({ errors: errorsList });
    return res.status(422).send({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  next();

  // method2
  // const errors = validationResult(req);
  // console.log(errors);
  // if (!errors.isEmpty()) {
  //   const validationErrors = {};
  //   const allErrors = errors.array();
  //   allErrors.forEach((error) => {
  //     validationErrors[error.param] = error.msg;
  //   });

  //   return res.status(400).json({
  //     validationErrors,
  //   });
  // }
  // return next();

  // method 3
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     error: errors.array()[0].msg,
  //   });
  // }
  // return next();
};
```
