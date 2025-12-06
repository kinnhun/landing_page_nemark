const BaseController = require('./baseController');
const teamService = require('../../services/settings/teamService');

class TeamController extends BaseController {
  constructor() {
    super(teamService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getTeamSettings = this.getTeamSettings.bind(this);
    this.updateTeamSettings = this.updateTeamSettings.bind(this);
    this.resetTeamSettings = this.resetTeamSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/team
   * @desc    Get team settings
   * @access  Public
   */
  async getTeamSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/team
   * @desc    Update team settings
   * @access  Public (should be protected in production)
   */
  async updateTeamSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/team/reset
   * @desc    Reset team settings to default
   * @access  Public (should be protected in production)
   */
  async resetTeamSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new TeamController();

