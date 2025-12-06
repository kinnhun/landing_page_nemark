const express = require('express');
const router = express.Router();
const settingsRoutes = require('./settingsRoutes');

// API routes
router.use('/settings', settingsRoutes);

// Add more API routes here
// Example:
// const userRoutes = require('./userRoutes');
// const authRoutes = require('./authRoutes');
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
