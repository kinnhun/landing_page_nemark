const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Import controllers
const headerController = require('../controllers/settings/headerController');
const bannerController = require('../controllers/settings/bannerController');
const aboutController = require('../controllers/settings/aboutController');
const statsController = require('../controllers/settings/statsController');
const servicesController = require('../controllers/settings/servicesController');
const ctaController = require('../controllers/settings/ctaController');
const portfolioController = require('../controllers/settings/portfolioController');
const pricingController = require('../controllers/settings/pricingController');
const teamController = require('../controllers/settings/teamController');
const contactController = require('../controllers/settings/contactController');
const uploadController = require('../controllers/settings/uploadController');

// Header settings routes
router.get('/header', headerController.getHeaderSettings);
router.post('/header', headerController.updateHeaderSettings);
router.post('/header/reset', headerController.resetHeaderSettings);

// Banner settings routes
router.get('/banner', bannerController.getBannerSettings);
router.post('/banner', bannerController.updateBannerSettings);
router.post('/banner/reset', bannerController.resetBannerSettings);

// About settings routes
router.get('/about', aboutController.getAboutSettings);
router.post('/about', aboutController.updateAboutSettings);
router.post('/about/reset', aboutController.resetAboutSettings);

// Stats settings routes
router.get('/stats', statsController.getStatsSettings);
router.post('/stats', statsController.updateStatsSettings);
router.post('/stats/reset', statsController.resetStatsSettings);

// Services settings routes
router.get('/services', servicesController.getServicesSettings);
router.post('/services', servicesController.updateServicesSettings);
router.post('/services/reset', servicesController.resetServicesSettings);

// CTA settings routes
router.get('/cta', ctaController.getCtaSettings);
router.post('/cta', ctaController.updateCtaSettings);
router.post('/cta/reset', ctaController.resetCtaSettings);

// Portfolio settings routes
router.get('/portfolio', portfolioController.getPortfolioSettings);
router.post('/portfolio', portfolioController.updatePortfolioSettings);
router.post('/portfolio/reset', portfolioController.resetPortfolioSettings);

// Pricing settings routes
router.get('/pricing', pricingController.getPricingSettings);
router.post('/pricing', pricingController.updatePricingSettings);
router.post('/pricing/reset', pricingController.resetPricingSettings);

// Team settings routes
router.get('/team', teamController.getTeamSettings);
router.post('/team', teamController.updateTeamSettings);
router.post('/team/reset', teamController.resetTeamSettings);

// Contact settings routes
router.get('/contact', contactController.getContactSettings);
router.post('/contact', contactController.updateContactSettings);
router.post('/contact/reset', contactController.resetContactSettings);

// Upload route
router.post('/upload', upload.single('image'), uploadController.uploadImage);

// Add more settings routes here as needed
// Example:
// router.get('/footer', footerController.getFooterSettings);
// router.post('/footer', footerController.updateFooterSettings);

module.exports = router;
