const BaseController = require('./baseController');
const bannerService = require('../../services/settings/bannerService');

class BannerController extends BaseController {
  constructor() {
    super(bannerService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getBannerSettings = this.getBannerSettings.bind(this);
    this.updateBannerSettings = this.updateBannerSettings.bind(this);
    this.resetBannerSettings = this.resetBannerSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/banner
   * @desc    Get banner settings
   * @access  Public
   */
  async getBannerSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/banner
   * @desc    Update banner settings
   * @access  Public (should be protected in production)
   */
  async updateBannerSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/banner/reset
   * @desc    Reset banner settings to default
   * @access  Public (should be protected in production)
   */
  async resetBannerSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new BannerController();

