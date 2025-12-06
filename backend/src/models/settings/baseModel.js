const config = require('../../config');
const FileStorage = require('../../utils/fileStorage');

const storage = new FileStorage(config.dataDir);

class BaseModel {
  constructor(fileName, defaultSettings) {
    this.fileName = fileName;
    this.defaultSettings = defaultSettings;
  }

  /**
   * Get settings
   */
  async getSettings() {
    const settings = await storage.read(this.fileName);
    if (!settings) return this.defaultSettings;
    
    // Merge with defaults to ensure all fields exist
    return this.mergeWithDefaults(settings);
  }

  /**
   * Update settings
   */
  async updateSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.fileName, toSave);
  }

  /**
   * Reset to default settings
   */
  async resetSettings() {
    return await storage.write(this.fileName, this.defaultSettings);
  }

  /**
   * Merge settings with defaults (override in subclasses for custom merging)
   */
  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings
    };
  }
}

module.exports = BaseModel;

