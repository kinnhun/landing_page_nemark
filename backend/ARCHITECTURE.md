# Backend API - MVC Architecture

## 📁 Project Structure

```
backend/
├── server.js                   # Entry point
├── src/
│   ├── app.js                 # Express app setup
│   ├── config/
│   │   └── index.js           # Configuration
│   ├── models/
│   │   └── settingsModel.js   # Data models
│   ├── services/
│   │   └── settingsService.js # Business logic
│   ├── controllers/
│   │   └── settingsController.js # Request handlers
│   ├── routes/
│   │   ├── index.js           # Main router
│   │   └── settingsRoutes.js  # Settings routes
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling
│   │   └── logger.js          # Request logging
│   └── utils/
│       ├── fileStorage.js     # File operations
│       ├── errors.js          # Custom errors
│       └── response.js        # Response helpers
├── data/                      # JSON storage
└── .env                       # Environment variables
```

## 🏗️ Architecture

### Model-View-Controller (MVC) Pattern

**Flow:** Request → Routes → Controller → Service → Model → Response

1. **Routes** (`src/routes/`)
   - Define API endpoints
   - Map URLs to controllers
   - Organize by feature

2. **Controllers** (`src/controllers/`)
   - Handle HTTP requests/responses
   - Validate input
   - Call services
   - Return formatted responses

3. **Services** (`src/services/`)
   - Business logic
   - Data validation
   - Orchestrate models
   - Handle transactions

4. **Models** (`src/models/`)
   - Data structure
   - Database/file operations
   - CRUD operations

5. **Middleware** (`src/middleware/`)
   - Error handling
   - Logging
   - Authentication (future)
   - Validation (future)

6. **Utils** (`src/utils/`)
   - Helper functions
   - Common utilities
   - Reusable code

## 🚀 Usage

### Start Server
```bash
npm run dev    # Development with hot reload
npm start      # Production
```

### API Endpoints

#### Settings API
```
GET    /api/settings/header          # Get header settings
POST   /api/settings/header          # Update header settings
POST   /api/settings/header/reset    # Reset to default

GET    /api/health                   # Health check
```

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## 📝 Adding New Features

### 1. Add New Settings Type (Example: Footer)

#### Step 1: Create Model
```javascript
// src/models/footerModel.js
class FooterModel {
  async getFooterSettings() { ... }
  async updateFooterSettings(data) { ... }
}
module.exports = new FooterModel();
```

#### Step 2: Create Service
```javascript
// src/services/footerService.js
class FooterService {
  async getFooter() { ... }
  async updateFooter(data) { ... }
  validateFooter(data) { ... }
}
module.exports = new FooterService();
```

#### Step 3: Create Controller
```javascript
// src/controllers/footerController.js
class FooterController {
  async getFooter(req, res, next) { ... }
  async updateFooter(req, res, next) { ... }
}
module.exports = new FooterController();
```

#### Step 4: Create Routes
```javascript
// src/routes/footerRoutes.js
const router = express.Router();
router.get('/', footerController.getFooter);
router.post('/', footerController.updateFooter);
module.exports = router;
```

#### Step 5: Register Routes
```javascript
// src/routes/index.js
const footerRoutes = require('./footerRoutes');
router.use('/footer', footerRoutes);
```

### 2. Add Authentication

```javascript
// src/middleware/auth.js
const authenticate = (req, res, next) => {
  // Check JWT token
  // Verify user
  next();
};

// src/routes/settingsRoutes.js
router.post('/header', authenticate, settingsController.update);
```

### 3. Add Database (MongoDB)

```bash
npm install mongoose
```

```javascript
// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

// src/models/settingsModel.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  type: String,
  data: Object,
  lastUpdated: Date
});

module.exports = mongoose.model('Settings', settingsSchema);
```

## 🔒 Security Best Practices

### Add Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
// src/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// src/app.js
app.use('/api', limiter);
```

### Add Helmet (Security Headers)
```bash
npm install helmet
```

```javascript
// src/app.js
const helmet = require('helmet');
app.use(helmet());
```

### Input Validation
```bash
npm install joi
```

```javascript
// src/middleware/validation.js
const Joi = require('joi');

const validateSettings = (req, res, next) => {
  const schema = Joi.object({
    menu: Joi.object().required(),
    cta: Joi.object()
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
};
```

## 📊 Monitoring & Logging

### Add Winston Logger
```bash
npm install winston
```

```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
```

## 🧪 Testing

### Add Jest
```bash
npm install --save-dev jest supertest
```

```javascript
// __tests__/settings.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Settings API', () => {
  test('GET /api/settings/header', async () => {
    const res = await request(app).get('/api/settings/header');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
```

## 🚀 Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.com
DATABASE_URL=mongodb://...
JWT_SECRET=your-secret
```

### PM2 (Process Manager)
```bash
pm2 start server.js --name backend
pm2 startup
pm2 save
```

## 📚 Benefits of This Architecture

✅ **Scalable** - Easy to add new features
✅ **Maintainable** - Clear separation of concerns
✅ **Testable** - Each layer can be tested independently
✅ **Reusable** - Services and utils can be reused
✅ **Professional** - Industry-standard structure
✅ **Team-friendly** - Multiple developers can work simultaneously
