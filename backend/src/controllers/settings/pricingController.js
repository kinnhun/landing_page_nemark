const BaseController = require('./baseController');
const pricingService = require('../../services/settings/pricingService');

class PricingController extends BaseController {
  constructor() {
    super(pricingService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getPricingSettings = this.getPricingSettings.bind(this);
    this.updatePricingSettings = this.updatePricingSettings.bind(this);
    this.resetPricingSettings = this.resetPricingSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/pricing
   * @desc    Get pricing settings
   * @access  Public
   */
  async getPricingSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/pricing
   * @desc    Update pricing settings
   * @access  Public (should be protected in production)
   */
  async updatePricingSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/pricing/reset
   * @desc    Reset pricing settings to default
   * @access  Public (should be protected in production)
   */
  async resetPricingSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new PricingController();

