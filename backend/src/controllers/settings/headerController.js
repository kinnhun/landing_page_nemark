const BaseController = require('./baseController');
const headerService = require('../../services/settings/headerService');

class HeaderController extends BaseController {
  constructor() {
    super(headerService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getHeaderSettings = this.getHeaderSettings.bind(this);
    this.updateHeaderSettings = this.updateHeaderSettings.bind(this);
    this.resetHeaderSettings = this.resetHeaderSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/header
   * @desc    Get header settings
   * @access  Public
   */
  async getHeaderSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/header
   * @desc    Update header settings
   * @access  Public (should be protected in production)
   */
  async updateHeaderSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/header/reset
   * @desc    Reset header settings to default
   * @access  Public (should be protected in production)
   */
  async resetHeaderSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new HeaderController();

