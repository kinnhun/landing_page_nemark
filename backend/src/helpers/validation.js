const { ValidationError } = require('../utils/errors');

class ValidationHelper {
  /**
   * Validate that data is an object
   */
  static validateObject(data, name = 'data') {
    if (!data || typeof data !== 'object') {
      throw new ValidationError(`Invalid ${name}`);
    }
    return true;
  }

  /**
   * Validate that value is a string
   */
  static validateString(value, name = 'value') {
    if (value !== undefined && typeof value !== 'string') {
      throw new ValidationError(`Invalid ${name}: must be a string`);
    }
    return true;
  }

  /**
   * Validate that value is an array
   */
  static validateArray(value, name = 'value') {
    if (value !== undefined && !Array.isArray(value)) {
      throw new ValidationError(`Invalid ${name}: must be an array`);
    }
    return true;
  }

  /**
   * Validate that value is a number
   */
  static validateNumber(value, name = 'value', min = null, max = null) {
    if (value !== undefined) {
      if (typeof value !== 'number') {
        throw new ValidationError(`Invalid ${name}: must be a number`);
      }
      if (min !== null && value < min) {
        throw new ValidationError(`Invalid ${name}: must be at least ${min}`);
      }
      if (max !== null && value > max) {
        throw new ValidationError(`Invalid ${name}: must be at most ${max}`);
      }
    }
    return true;
  }

  /**
   * Validate that value is a boolean
   */
  static validateBoolean(value, name = 'value') {
    if (value !== undefined && typeof value !== 'boolean') {
      throw new ValidationError(`Invalid ${name}: must be a boolean`);
    }
    return true;
  }
}

module.exports = ValidationHelper;

