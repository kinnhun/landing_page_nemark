const BaseService = require('../../helpers/baseService');
const ctaModel = require('../../models/settings/ctaModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class CtaService extends BaseService {
  constructor() {
    super(ctaModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'CTA settings');
    return true;
  }
}

module.exports = new CtaService();

