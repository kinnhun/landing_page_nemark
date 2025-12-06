const BaseService = require('../../helpers/baseService');
const servicesModel = require('../../models/settings/servicesModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class ServicesService extends BaseService {
  constructor() {
    super(servicesModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'services settings');
    
    if (data.items && !Array.isArray(data.items)) {
      throw new ValidationError('Items must be an array');
    }

    return true;
  }
}

module.exports = new ServicesService();

