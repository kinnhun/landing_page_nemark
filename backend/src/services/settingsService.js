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

  /**
   * Get banner settings
   */
  async getBannerSettings() {
    try {
      const settings = await settingsModel.getBannerSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting banner settings:', err);
      throw new InternalError('Failed to retrieve banner settings');
    }
  }

  /**
   * Update banner settings
   */
  async updateBannerSettings(data) {
    try {
      // Validate data
      this.validateBannerSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateBannerSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating banner settings:', err);
      throw new InternalError('Failed to update banner settings');
    }
  }

  /**
   * Reset banner settings to default
   */
  async resetBannerSettings() {
    try {
      const reset = await settingsModel.resetBannerSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting banner settings:', err);
      throw new InternalError('Failed to reset banner settings');
    }
  }

  /**
   * Validate banner settings data
   */
  validateBannerSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Invalid title');
    }

    if (data.description && typeof data.description !== 'string') {
      throw new ValidationError('Invalid description');
    }

    return true;
  }

  /**
   * Get about settings
   */
  async getAboutSettings() {
    try {
      const settings = await settingsModel.getAboutSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting about settings:', err);
      throw new InternalError('Failed to retrieve about settings');
    }
  }

  /**
   * Update about settings
   */
  async updateAboutSettings(data) {
    try {
      // Validate data
      this.validateAboutSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateAboutSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating about settings:', err);
      throw new InternalError('Failed to update about settings');
    }
  }

  /**
   * Reset about settings to default
   */
  async resetAboutSettings() {
    try {
      const reset = await settingsModel.resetAboutSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting about settings:', err);
      throw new InternalError('Failed to reset about settings');
    }
  }

  /**
   * Validate about settings data
   */
  validateAboutSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }
    return true;
  }

  /**
   * Get stats settings
   */
  async getStatsSettings() {
    try {
      const settings = await settingsModel.getStatsSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting stats settings:', err);
      throw new InternalError('Failed to retrieve stats settings');
    }
  }

  /**
   * Update stats settings
   */
  async updateStatsSettings(data) {
    try {
      // Validate data
      this.validateStatsSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateStatsSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating stats settings:', err);
      throw new InternalError('Failed to update stats settings');
    }
  }

  /**
   * Reset stats settings to default
   */
  async resetStatsSettings() {
    try {
      const reset = await settingsModel.resetStatsSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting stats settings:', err);
      throw new InternalError('Failed to reset stats settings');
    }
  }

  /**
   * Validate stats settings data
   */
  validateStatsSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }
    
    if (data.stats && !Array.isArray(data.stats)) {
      throw new ValidationError('Stats must be an array');
    }

    return true;
  }

  /**
   * Get services settings
   */
  async getServicesSettings() {
    try {
      const settings = await settingsModel.getServicesSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting services settings:', err);
      throw new InternalError('Failed to retrieve services settings');
    }
  }

  /**
   * Update services settings
   */
  async updateServicesSettings(data) {
    try {
      // Validate data
      this.validateServicesSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateServicesSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating services settings:', err);
      throw new InternalError('Failed to update services settings');
    }
  }

  /**
   * Reset services settings to default
   */
  async resetServicesSettings() {
    try {
      const reset = await settingsModel.resetServicesSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting services settings:', err);
      throw new InternalError('Failed to reset services settings');
    }
  }

  /**
   * Validate services settings data
   */
  validateServicesSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }
    
    if (data.items && !Array.isArray(data.items)) {
      throw new ValidationError('Items must be an array');
    }

    return true;
  }
}

module.exports = new SettingsService();
