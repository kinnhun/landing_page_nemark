const BaseService = require('../../helpers/baseService');
const headerModel = require('../../models/settings/headerModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class HeaderService extends BaseService {
  constructor() {
    super(headerModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'header settings');

    // Validate menu structure if present
    if (data.menu && (!data.menu.items || !Array.isArray(data.menu.items))) {
      throw new ValidationError('Invalid menu structure');
    }

    // Validate each menu item
    if (data.menu && data.menu.items) {
      data.menu.items.forEach((item, index) => {
        if (!item.id || !item.label) {
          throw new ValidationError(`Invalid menu item at index ${index}`);
        }
      });
    }

    return true;
  }
}

module.exports = new HeaderService();

