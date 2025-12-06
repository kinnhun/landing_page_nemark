const settingsModel = require('../models/settingsModel');
const { ValidationError, InternalError } = require('../utils/errors');

class SettingsService {
  /**
   * Get header settings
   */
  async getHeaderSettings() {
    try {
      const settings = await settingsModel.getHeaderSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting header settings:', err);
      throw new InternalError('Failed to retrieve header settings');
    }
  }

  /**
   * Update header settings
   */
  async updateHeaderSettings(data) {
    try {
      // Validate data
      this.validateHeaderSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateHeaderSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating header settings:', err);
      throw new InternalError('Failed to update header settings');
    }
  }

  /**
   * Reset header settings to default
   */
  async resetHeaderSettings() {
    try {
      const reset = await settingsModel.resetHeaderSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting header settings:', err);
      throw new InternalError('Failed to reset header settings');
    }
  }

  /**
   * Validate header settings data
   */
  validateHeaderSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    // Validate menu structure if present
    if (data.menu && (!data.menu.items || !Array.isArray(data.menu.items))) {
      throw new ValidationError('Invalid menu structure');
    }

    // Validate each menu item
    if (data.menu && data.menu.items) {
      data.menu.items.forEach((item, index) => {
        if (!item.id || !item.label) {
          throw new ValidationError(`Invalid menu item at index ${index}`);
        }
      });
    }

    return true;
  }
}

module.exports = new SettingsService();
