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

// About settings routes
router.get('/about', settingsController.getAboutSettings);
router.post('/about', settingsController.updateAboutSettings);
router.post('/about/reset', settingsController.resetAboutSettings);

// Stats settings routes
router.get('/stats', settingsController.getStatsSettings);
router.post('/stats', settingsController.updateStatsSettings);
router.post('/stats/reset', settingsController.resetStatsSettings);

// Services settings routes
router.get('/services', settingsController.getServicesSettings);
router.post('/services', settingsController.updateServicesSettings);
router.post('/services/reset', settingsController.resetServicesSettings);

// CTA settings routes
router.get('/cta', settingsController.getCtaSettings);
router.post('/cta', settingsController.updateCtaSettings);
router.post('/cta/reset', settingsController.resetCtaSettings);

// Portfolio settings routes
router.get('/portfolio', settingsController.getPortfolioSettings);
router.post('/portfolio', settingsController.updatePortfolioSettings);
router.post('/portfolio/reset', settingsController.resetPortfolioSettings);

// Pricing settings routes
router.get('/pricing', settingsController.getPricingSettings);
router.post('/pricing', settingsController.updatePricingSettings);
router.post('/pricing/reset', settingsController.resetPricingSettings);

// Team settings routes
router.get('/team', settingsController.getTeamSettings);
router.post('/team', settingsController.updateTeamSettings);
router.post('/team/reset', settingsController.resetTeamSettings);

// Contact settings routes
router.get('/contact', settingsController.getContactSettings);
router.post('/contact', settingsController.updateContactSettings);
router.post('/contact/reset', settingsController.resetContactSettings);

// Upload route
router.post('/upload', upload.single('image'), settingsController.uploadImage);

// Add more settings routes here as needed
// Example:
// router.get('/footer', settingsController.getFooterSettings);
// router.post('/footer', settingsController.updateFooterSettings);

module.exports = router;
