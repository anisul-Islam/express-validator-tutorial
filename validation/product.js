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
