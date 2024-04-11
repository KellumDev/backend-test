import { body, validationResult } from 'express-validator';
 
export const validateWorkerRequest = [
  body('workerId').notEmpty(),
  body('filterOptions').notEmpty().isObject(),
  body('filterOptions.status').optional().isString(),
  body('filterOptions.locationId').optional().isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.debug("loggin validation results: ",errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];