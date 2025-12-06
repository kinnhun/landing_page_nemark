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

  /**
   * Get CTA settings
   */
  async getCtaSettings() {
    try {
      const settings = await settingsModel.getCtaSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting CTA settings:', err);
      throw new InternalError('Failed to retrieve CTA settings');
    }
  }

  /**
   * Update CTA settings
   */
  async updateCtaSettings(data) {
    try {
      // Validate data
      this.validateCtaSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateCtaSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating CTA settings:', err);
      throw new InternalError('Failed to update CTA settings');
    }
  }

  /**
   * Reset CTA settings to default
   */
  async resetCtaSettings() {
    try {
      const reset = await settingsModel.resetCtaSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting CTA settings:', err);
      throw new InternalError('Failed to reset CTA settings');
    }
  }

  /**
   * Validate CTA settings data
   */
  validateCtaSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    return true;
  }

  /**
   * Get portfolio settings
   */
  async getPortfolioSettings() {
    try {
      const settings = await settingsModel.getPortfolioSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting portfolio settings:', err);
      throw new InternalError('Failed to retrieve portfolio settings');
    }
  }

  /**
   * Update portfolio settings
   */
  async updatePortfolioSettings(data) {
    try {
      // Validate data
      this.validatePortfolioSettings(data);
      
      // Update settings
      const updated = await settingsModel.updatePortfolioSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating portfolio settings:', err);
      throw new InternalError('Failed to update portfolio settings');
    }
  }

  /**
   * Reset portfolio settings to default
   */
  async resetPortfolioSettings() {
    try {
      const reset = await settingsModel.resetPortfolioSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting portfolio settings:', err);
      throw new InternalError('Failed to reset portfolio settings');
    }
  }

  /**
   * Validate portfolio settings data
   */
  validatePortfolioSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate categories
    if (data.categories && !Array.isArray(data.categories)) {
      throw new ValidationError('Categories must be an array');
    }

    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((cat, index) => {
        if (!cat.key || !cat.label) {
          throw new ValidationError(`Invalid category at index ${index}: must have key and label`);
        }
      });
    }

    // Validate items
    if (data.items && !Array.isArray(data.items)) {
      throw new ValidationError('Items must be an array');
    }

    if (data.items && data.items.length > 0) {
      data.items.forEach((item, index) => {
        if (!item.id || !item.title || !item.category) {
          throw new ValidationError(`Invalid item at index ${index}: must have id, title, and category`);
        }
      });
    }

    // Validate columns
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 4)) {
      throw new ValidationError('Columns must be a number between 1 and 4');
    }

    return true;
  }

  /**
   * Get pricing settings
   */
  async getPricingSettings() {
    try {
      const settings = await settingsModel.getPricingSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting pricing settings:', err);
      throw new InternalError('Failed to retrieve pricing settings');
    }
  }

  /**
   * Update pricing settings
   */
  async updatePricingSettings(data) {
    try {
      // Validate data
      this.validatePricingSettings(data);
      
      // Update settings
      const updated = await settingsModel.updatePricingSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating pricing settings:', err);
      throw new InternalError('Failed to update pricing settings');
    }
  }

  /**
   * Reset pricing settings to default
   */
  async resetPricingSettings() {
    try {
      const reset = await settingsModel.resetPricingSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting pricing settings:', err);
      throw new InternalError('Failed to reset pricing settings');
    }
  }

  /**
   * Validate pricing settings data
   */
  validatePricingSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate packages
    if (data.packages && !Array.isArray(data.packages)) {
      throw new ValidationError('Packages must be an array');
    }

    if (data.packages && data.packages.length > 0) {
      data.packages.forEach((pkg, index) => {
        if (!pkg.id || !pkg.title || typeof pkg.price !== 'number') {
          throw new ValidationError(`Invalid package at index ${index}: must have id, title, and price`);
        }
        if (!pkg.features || !Array.isArray(pkg.features)) {
          throw new ValidationError(`Invalid package at index ${index}: features must be an array`);
        }
        pkg.features.forEach((feature, fIndex) => {
          if (!feature.text || typeof feature.included !== 'boolean') {
            throw new ValidationError(`Invalid feature at package ${index}, feature ${fIndex}: must have text and included`);
          }
        });
      });
    }

    // Validate columns
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 4)) {
      throw new ValidationError('Columns must be a number between 1 and 4');
    }

    return true;
  }

  /**
   * Get team settings
   */
  async getTeamSettings() {
    try {
      const settings = await settingsModel.getTeamSettings();
      return settings;
    } catch (err) {
      console.error('Service error getting team settings:', err);
      throw new InternalError('Failed to get team settings');
    }
  }

  /**
   * Update team settings
   */
  async updateTeamSettings(data) {
    try {
      // Validate data
      this.validateTeamSettings(data);
      
      // Update settings
      const updated = await settingsModel.updateTeamSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error('Service error updating team settings:', err);
      throw new InternalError('Failed to update team settings');
    }
  }

  /**
   * Reset team settings to default
   */
  async resetTeamSettings() {
    try {
      const reset = await settingsModel.resetTeamSettings();
      return reset;
    } catch (err) {
      console.error('Service error resetting team settings:', err);
      throw new InternalError('Failed to reset team settings');
    }
  }

  /**
   * Validate team settings data
   */
  validateTeamSettings(data) {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid settings data');
    }

    // Validate title
    if (data.title && typeof data.title !== 'string') {
      throw new ValidationError('Title must be a string');
    }

    // Validate members
    if (data.members && !Array.isArray(data.members)) {
      throw new ValidationError('Members must be an array');
    }

    if (data.members && data.members.length > 0) {
      data.members.forEach((member, index) => {
        if (!member.id || !member.name || !member.position || !member.bio) {
          throw new ValidationError(`Invalid member at index ${index}: must have id, name, position, and bio`);
        }
        if (!member.avatar || typeof member.avatar !== 'string') {
          throw new ValidationError(`Invalid member at index ${index}: avatar must be a string`);
        }
      });
    }

    // Validate columns (1-2 for team)
    if (data.columns !== undefined && (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 2)) {
      throw new ValidationError('Columns must be a number between 1 and 2');
    }

    return true;
  }
}

module.exports = new SettingsService();
