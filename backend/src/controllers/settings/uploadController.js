const response = require('../../utils/response');

class UploadController {
  constructor() {
    // Bind methods to preserve 'this' context when used as callbacks
    this.uploadImage = this.uploadImage.bind(this);
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
}

module.exports = new UploadController();

