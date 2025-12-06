const BaseService = require('../../helpers/baseService');
const teamModel = require('../../models/settings/teamModel');
const ValidationHelper = require('../../helpers/validation');
const { ValidationError } = require('../../utils/errors');

class TeamService extends BaseService {
  constructor() {
    super(teamModel);
  }

  validateSettings(data) {
    ValidationHelper.validateObject(data, 'team settings');

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate members
    if (data.members && !Array.isArray(data.members)) {
      throw new ValidationError('Members must be an array');
    }

    if (data.members && data.members.length > 0) {
      data.members.forEach((member, index) => {
        if (!member.id || !member.name || !member.position || !member.bio) {
          throw new ValidationError(`Invalid member at index ${index}: must have id, name, position, and bio`);
        }
        if (!member.avatar || typeof member.avatar !== 'string') {
          throw new ValidationError(`Invalid member at index ${index}: avatar must be a string`);
        }
      });
    }

    // Validate columns (1-2 for team)
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 2)) {
      throw new ValidationError('Columns must be a number between 1 and 2');
    }

    return true;
  }
}

module.exports = new TeamService();

