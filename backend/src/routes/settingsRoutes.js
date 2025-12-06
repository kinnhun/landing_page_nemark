const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Header settings routes
router.get('/header', settingsController.getHeaderSettings);
router.post('/header', settingsController.updateHeaderSettings);
router.post('/header/reset', settingsController.resetHeaderSettings);

// Add more settings routes here as needed
// Example:
// router.get('/footer', settingsController.getFooterSettings);
// router.post('/footer', settingsController.updateFooterSettings);

module.exports = router;
