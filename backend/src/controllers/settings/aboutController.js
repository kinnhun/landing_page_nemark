const BaseController = require('./baseController');
const aboutService = require('../../services/settings/aboutService');

class AboutController extends BaseController {
  constructor() {
    super(aboutService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getAboutSettings = this.getAboutSettings.bind(this);
    this.updateAboutSettings = this.updateAboutSettings.bind(this);
    this.resetAboutSettings = this.resetAboutSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/about
   * @desc    Get about settings
   * @access  Public
   */
  async getAboutSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/about
   * @desc    Update about settings
   * @access  Public (should be protected in production)
   */
  async updateAboutSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/about/reset
   * @desc    Reset about settings to default
   * @access  Public (should be protected in production)
   */
  async resetAboutSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new AboutController();

