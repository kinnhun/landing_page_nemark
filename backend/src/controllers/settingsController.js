const settingsService = require('../services/settingsService');
const response = require('../utils/response');

class SettingsController {
  /**
   * @route   GET /api/settings/header
   * @desc    Get header settings
   * @access  Public
   */
  async getHeaderSettings(req, res, next) {
    try {
      const settings = await settingsService.getHeaderSettings();
      return response.success(res, settings, 'Header settings retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/header
   * @desc    Update header settings
   * @access  Public (should be protected in production)
   */
  async updateHeaderSettings(req, res, next) {
    try {
      const settings = await settingsService.updateHeaderSettings(req.body);
      return response.success(res, settings, 'Header settings updated successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/header/reset
   * @desc    Reset header settings to default
   * @access  Public (should be protected in production)
   */
  async resetHeaderSettings(req, res, next) {
    try {
      const settings = await settingsService.resetHeaderSettings();
      return response.success(res, settings, 'Header settings reset to default');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SettingsController();
