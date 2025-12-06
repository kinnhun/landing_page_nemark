const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const requestLogger = require('./middleware/logger');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // CORS
    this.app.use(cors(config.cors));
    
    // Body parser - increase limits to allow larger payloads (e.g. base64 images)
    // Note: for production it's better to use multipart uploads and store files, not large JSON bodies.
    this.app.use(express.json({ limit: '5mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '5mb' }));
    
    // Logger
    if (config.nodeEnv === 'development') {
      this.app.use(requestLogger());
    }
  }

  setupRoutes() {
    // Root route
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Landing Page Backend API',
        version: '1.0.0',
        documentation: {
          settings: `${config.api.prefix}/settings`,
          health: `${config.api.prefix}/health`
        }
      });
    });

    // API routes
    this.app.use(config.api.prefix, routes);
  }

  setupErrorHandling() {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Error handler
    this.app.use(errorHandler);
  }

  getInstance() {
    return this.app;
  }
}

module.exports = new App().getInstance();
