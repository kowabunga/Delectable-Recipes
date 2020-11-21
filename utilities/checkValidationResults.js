import { validationResult } from 'express-validator';

const checkValidationResults = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return [true, errors];
  }
  return [false, null];
};

export default checkValidationResults;
