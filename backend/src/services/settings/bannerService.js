const BaseService = require('../../helpers/baseService');
const bannerModel = require('../../models/settings/bannerModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class BannerService extends BaseService {
  constructor() {
    super(bannerModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'banner settings');

    if (data.title !== undefined) {
      ValidationHelper.validateString(data.title, 'title');
    }

    if (data.description !== undefined) {
      ValidationHelper.validateString(data.description, 'description');
    }

    return true;
  }
}

module.exports = new BannerService();

