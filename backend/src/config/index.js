const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  // In development allow the request origin to simplify local testing (keeps credentials support).
  // In production restrict to FRONTEND_URL if provided.
  cors: (() => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    if ((process.env.NODE_ENV || 'development') === 'development') {
      return { origin: true, credentials: true };
    }
    return { origin: frontendUrl, credentials: true };
  })(),
  
  // Data storage paths
  dataDir: path.join(__dirname, '../../data'),
  
  // API configuration
  api: {
    prefix: '/api',
    version: 'v1'
  },
  
  // Rate limiting (optional for future)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

module.exports = config;
