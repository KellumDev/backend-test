import { body, validationResult } from 'express-validator';
 
export const validateLocationRequest = [
  body('locationId').notEmpty().custom((value) => {
    // Check if locationId is a single number or an array of numbers
    if (typeof value === 'number' || (Array.isArray(value) && value.every(num => typeof num === 'number'))) {
      return true;
    }
    throw new Error('LocationId must be a number or an array of numbers');
  }),
  body('filterOptions').notEmpty().isObject(),
  body('filterOptions.workerId').optional().custom((value) => {
    // Check if workerId is a single number or an array of numbers
    if (typeof value === 'number' || (Array.isArray(value) && value.every(num => typeof num === 'number'))) {
      return true;
    }
    throw new Error('WorkerId must be a number or an array of numbers');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    console.debug("loggin validation results: ",errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];