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

  /**
   * @route   GET /api/settings/banner
   * @desc    Get banner settings
   * @access  Public
   */
  async getBannerSettings(req, res, next) {
    try {
      const settings = await settingsService.getBannerSettings();
      return response.success(res, settings, 'Banner settings retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/banner
   * @desc    Update banner settings
   * @access  Public (should be protected in production)
   */
  async updateBannerSettings(req, res, next) {
    try {
      const settings = await settingsService.updateBannerSettings(req.body);
      return response.success(res, settings, 'Banner settings updated successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/banner/reset
   * @desc    Reset banner settings to default
   * @access  Public (should be protected in production)
   */
  async resetBannerSettings(req, res, next) {
    try {
      const settings = await settingsService.resetBannerSettings();
      return response.success(res, settings, 'Banner settings reset to default');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/upload
   * @desc    Upload an image
   * @access  Public (should be protected)
   */
  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return next(new Error('No file uploaded'));
      }
      
      // Construct the URL
      // Assuming the server is running on the same host/port or behind a proxy
      // For now, we return a relative path or a full URL if we knew the host
      // Ideally, config should have the base URL.
      // We'll return the path relative to the server root, e.g., /uploads/filename.jpg
      
      const fileUrl = `/uploads/${req.file.filename}`;
      
      return response.success(res, { url: fileUrl }, 'Image uploaded successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   GET /api/settings/about
   * @desc    Get about settings
   * @access  Public
   */
  async getAboutSettings(req, res, next) {
    try {
      const settings = await settingsService.getAboutSettings();
      return response.success(res, settings, 'About settings retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/about
   * @desc    Update about settings
   * @access  Public (should be protected in production)
   */
  async updateAboutSettings(req, res, next) {
    try {
      const settings = await settingsService.updateAboutSettings(req.body);
      return response.success(res, settings, 'About settings updated successfully');
    } catch (err) {
      next(err);
    }
  }

  /**
   * @route   POST /api/settings/about/reset
   * @desc    Reset about settings to default
   * @access  Public (should be protected in production)
   */
  async resetAboutSettings(req, res, next) {
    try {
      const settings = await settingsService.resetAboutSettings();
      return response.success(res, settings, 'About settings reset to default');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SettingsController();
