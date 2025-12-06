const BaseService = require('../../helpers/baseService');
const portfolioModel = require('../../models/settings/portfolioModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class PortfolioService extends BaseService {
  constructor() {
    super(portfolioModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'portfolio settings');

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate categories
    if (data.categories && !Array.isArray(data.categories)) {
      throw new ValidationError('Categories must be an array');
    }

    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((cat, index) => {
        if (!cat.key || !cat.label) {
          throw new ValidationError(`Invalid category at index ${index}: must have key and label`);
        }
      });
    }

    // Validate items
    if (data.items && !Array.isArray(data.items)) {
      throw new ValidationError('Items must be an array');
    }

    if (data.items && data.items.length > 0) {
      data.items.forEach((item, index) => {
        if (!item.id || !item.title || !item.category) {
          throw new ValidationError(`Invalid item at index ${index}: must have id, title, and category`);
        }
      });
    }

    // Validate columns
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 4)) {
      throw new ValidationError('Columns must be a number between 1 and 4');
    }

    return true;
  }
}

module.exports = new PortfolioService();

