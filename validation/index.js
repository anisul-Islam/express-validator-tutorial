const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsList = errors.array().map((error) => error.msg);
    // return res.status(422).json({ errors: errorsList });
    return res.status(422).send({
      success: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};
