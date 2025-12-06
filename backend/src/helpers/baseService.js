const { ValidationError, InternalError } = require('../utils/errors');

class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Get settings
   */
  async getSettings() {
    try {
      const settings = await this.model.getSettings();
      return settings;
    } catch (err) {
      console.error(`Service error getting ${this.model.constructor.name} settings:`, err);
      throw new InternalError(`Failed to retrieve settings`);
    }
  }

  /**
   * Update settings
   */
  async updateSettings(data) {
    try {
      // Validate data
      if (this.validateSettings) {
        this.validateSettings(data);
      }
      
      // Update settings
      const updated = await this.model.updateSettings(data);
      return updated;
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      console.error(`Service error updating ${this.model.constructor.name} settings:`, err);
      throw new InternalError(`Failed to update settings`);
    }
  }

  /**
   * Reset settings to default
   */
  async resetSettings() {
    try {
      const reset = await this.model.resetSettings();
      return reset;
    } catch (err) {
      console.error(`Service error resetting ${this.model.constructor.name} settings:`, err);
      throw new InternalError(`Failed to reset settings`);
    }
  }
}

module.exports = BaseService;

