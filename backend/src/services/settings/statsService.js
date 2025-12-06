const BaseService = require('../../helpers/baseService');
const statsModel = require('../../models/settings/statsModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class StatsService extends BaseService {
  constructor() {
    super(statsModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'stats settings');
    
    if (data.stats && !Array.isArray(data.stats)) {
      throw new ValidationError('Stats must be an array');
    }

    return true;
  }
}

module.exports = new StatsService();

