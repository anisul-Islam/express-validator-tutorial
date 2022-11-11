# validation with express-validator

- [official doc] (https://express-validator.github.io/docs/)

- step 1: `npm install express-validator`
- step 2: create the sanitation rules that you want to use for validating the data

```js
// validation/auth.js
const { check } = require("express-validator");

exports.userRegistrationValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 5 })
    .withMessage("name must have at least 5 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 5 })
    .withMessage("password must have at least 5 characters"),
  check("dob")
    .trim()
    .notEmpty()
    .withMessage("dob is missing")
    .isISO8601()
    .toDate()
    .withMessage("Not a valid dob"),
];

exports.userLoginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 5 })
    .withMessage("password must have at least 5 characters"),
];
```

- step 3: run the validation

```js
// validation/index.js
const { check, validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsList = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorsList });
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
