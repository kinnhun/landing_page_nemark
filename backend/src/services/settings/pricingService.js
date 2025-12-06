const BaseService = require('../../helpers/baseService');
const pricingModel = require('../../models/settings/pricingModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class PricingService extends BaseService {
  constructor() {
    super(pricingModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'pricing settings');

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate packages
    if (data.packages && !Array.isArray(data.packages)) {
      throw new ValidationError('Packages must be an array');
    }

    if (data.packages && data.packages.length > 0) {
      data.packages.forEach((pkg, index) => {
        if (!pkg.id || !pkg.title || typeof pkg.price !== 'number') {
          throw new ValidationError(`Invalid package at index ${index}: must have id, title, and price`);
        }
        if (!pkg.features || !Array.isArray(pkg.features)) {
          throw new ValidationError(`Invalid package at index ${index}: features must be an array`);
        }
        pkg.features.forEach((feature, fIndex) => {
          if (!feature.text || typeof feature.included !== 'boolean') {
            throw new ValidationError(`Invalid feature at package ${index}, feature ${fIndex}: must have text and included`);
          }
        });
      });
    }

    // Validate columns
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 4)) {
      throw new ValidationError('Columns must be a number between 1 and 4');
    }

    return true;
  }
}

module.exports = new PricingService();

