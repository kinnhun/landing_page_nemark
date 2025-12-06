const BaseController = require('./baseController');
const statsService = require('../../services/settings/statsService');

class StatsController extends BaseController {
  constructor() {
    super(statsService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getStatsSettings = this.getStatsSettings.bind(this);
    this.updateStatsSettings = this.updateStatsSettings.bind(this);
    this.resetStatsSettings = this.resetStatsSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/stats
   * @desc    Get stats settings
   * @access  Public
   */
  async getStatsSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/stats
   * @desc    Update stats settings
   * @access  Public (should be protected in production)
   */
  async updateStatsSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/stats/reset
   * @desc    Reset stats settings to default
   * @access  Public (should be protected in production)
   */
  async resetStatsSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new StatsController();

