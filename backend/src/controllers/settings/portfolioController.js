const BaseController = require('./baseController');
const portfolioService = require('../../services/settings/portfolioService');

class PortfolioController extends BaseController {
  constructor() {
    super(portfolioService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getPortfolioSettings = this.getPortfolioSettings.bind(this);
    this.updatePortfolioSettings = this.updatePortfolioSettings.bind(this);
    this.resetPortfolioSettings = this.resetPortfolioSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/portfolio
   * @desc    Get portfolio settings
   * @access  Public
   */
  async getPortfolioSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/portfolio
   * @desc    Update portfolio settings
   * @access  Public (should be protected in production)
   */
  async updatePortfolioSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/portfolio/reset
   * @desc    Reset portfolio settings to default
   * @access  Public (should be protected in production)
   */
  async resetPortfolioSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new PortfolioController();

