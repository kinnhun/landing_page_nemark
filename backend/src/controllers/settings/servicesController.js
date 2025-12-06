const BaseController = require('./baseController');
const servicesService = require('../../services/settings/servicesService');

class ServicesController extends BaseController {
  constructor() {
    super(servicesService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getServicesSettings = this.getServicesSettings.bind(this);
    this.updateServicesSettings = this.updateServicesSettings.bind(this);
    this.resetServicesSettings = this.resetServicesSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/services
   * @desc    Get services settings
   * @access  Public
   */
  async getServicesSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/services
   * @desc    Update services settings
   * @access  Public (should be protected in production)
   */
  async updateServicesSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/services/reset
   * @desc    Reset services settings to default
   * @access  Public (should be protected in production)
   */
  async resetServicesSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new ServicesController();

