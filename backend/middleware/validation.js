import { body, validationResult } from 'express-validator';

const formatValidationErrors = (errors) => {
  const formatted = {};
  for (const err of errors) {
    formatted[err.path] = err.msg;
  }
  return formatted;
};

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = formatValidationErrors(errors.array());
    const firstError = Object.values(formattedErrors)[0]; // Get first error message
    
    return res.status(400).json({
      error: true,
      message: firstError, // Send single error message
      errors: formattedErrors // Also send detailed errors for frontend use
    });
  }
  next();
};

export const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .isLength({ min: 1 })
    .withMessage('Email is required'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-zA-Z])/)
    .withMessage('Password must contain at least one letter'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  
  validateRequest
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .notEmpty()
    .withMessage('Email is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty'),
  
  validateRequest
];

export const validatePost = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post content cannot be empty')
    .isLength({ max: 1000 })
    .withMessage('Post content cannot exceed 1000 characters'),
  
  validateRequest
];