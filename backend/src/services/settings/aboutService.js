const BaseService = require('../../helpers/baseService');
const aboutModel = require('../../models/settings/aboutModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class AboutService extends BaseService {
  constructor() {
    super(aboutModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'about settings');
    return true;
  }
}

module.exports = new AboutService();

