const response = require('../../utils/response');

class BaseController {
  constructor(service) {
    this.service = service;
    
    // Bind methods to preserve 'this' context when used as callbacks
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
  }

  /**
   * Get settings
   */
  async getSettings(req, res, next) {
    try {
      const settings = await this.service.getSettings();
      return response.success(res, settings, 'Settings retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update settings
   */
  async updateSettings(req, res, next) {
    try {
      const settings = await this.service.updateSettings(req.body);
      return response.success(res, settings, 'Settings updated successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * Reset settings to default
   */
  async resetSettings(req, res, next) {
    try {
      const settings = await this.service.resetSettings();
      return response.success(res, settings, 'Settings reset to default');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BaseController;

