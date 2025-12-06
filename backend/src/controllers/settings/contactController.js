const BaseController = require('./baseController');
const contactService = require('../../services/settings/contactService');

class ContactController extends BaseController {
  constructor() {
    super(contactService);
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getContactSettings = this.getContactSettings.bind(this);
    this.updateContactSettings = this.updateContactSettings.bind(this);
    this.resetContactSettings = this.resetContactSettings.bind(this);
  }

  /**
   * @route   GET /api/settings/contact
   * @desc    Get contact settings
   * @access  Public
   */
  async getContactSettings(req, res, next) {
    return this.getSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/contact
   * @desc    Update contact settings
   * @access  Public (should be protected in production)
   */
  async updateContactSettings(req, res, next) {
    return this.updateSettings(req, res, next);
  }

  /**
   * @route   POST /api/settings/contact/reset
   * @desc    Reset contact settings to default
   * @access  Public (should be protected in production)
   */
  async resetContactSettings(req, res, next) {
    return this.resetSettings(req, res, next);
  }
}

module.exports = new ContactController();

