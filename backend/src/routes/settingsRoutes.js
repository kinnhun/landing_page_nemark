const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const upload = require('../middleware/upload');

// Header settings routes
router.get('/header', settingsController.getHeaderSettings);
router.post('/header', settingsController.updateHeaderSettings);
router.post('/header/reset', settingsController.resetHeaderSettings);

// Banner settings routes
router.get('/banner', settingsController.getBannerSettings);
router.post('/banner', settingsController.updateBannerSettings);
router.post('/banner/reset', settingsController.resetBannerSettings);

// Upload route
router.post('/upload', upload.single('image'), settingsController.uploadImage);

// Add more settings routes here as needed
// Example:
// router.get('/footer', settingsController.getFooterSettings);
// router.post('/footer', settingsController.updateFooterSettings);

module.exports = router;
