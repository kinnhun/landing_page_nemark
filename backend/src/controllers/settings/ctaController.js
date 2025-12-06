const BaseController = require('./baseController');
const ctaService = require('../../services/settings/ctaService');

class CtaController extends BaseController {
  constructor() {
    super(ctaService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getCtaSettings = this.getCtaSettings.bind(this);
    this.updateCtaSettings = this.updateCtaSettings.bind(this);
    this.resetCtaSettings = this.resetCtaSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/cta
   * @desc    Get CTA settings
   * @access  Public
   */
  async getCtaSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/cta
   * @desc    Update CTA settings
   * @access  Public (should be protected in production)
   */
  async updateCtaSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/cta/reset
   * @desc    Reset CTA settings to default
   * @access  Public (should be protected in production)
   */
  async resetCtaSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new CtaController();

