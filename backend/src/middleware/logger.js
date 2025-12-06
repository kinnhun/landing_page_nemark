/**
 * Request logger middleware
 * Simple console logger for development
 * Install 'morgan' package for production-ready logging
 */
const requestLogger = () => {
  return (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    
    next();
  };
};

module.exports = requestLogger;
