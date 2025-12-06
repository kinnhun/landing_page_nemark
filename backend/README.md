# Landing Page Backend

Backend API cho Landing Page project.

## Stack

- **Node.js** + **Express**
- File-based storage (JSON)
- CORS enabled

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Run development server
```bash
npm run dev
```

Server sẽ chạy tại: http://localhost:5000

## API Endpoints

### GET /
Thông tin API

### GET /api/settings/header
Lấy header settings

**Response:**
```json
{
  "menu": { "items": [...] },
  "cta": {...},
  "background": {...},
  "text": {...},
  "lastUpdated": 1234567890
}
```

### POST /api/settings/header
Cập nhật header settings

**Request Body:**
```json
{
  "menu": { "items": [...] },
  "cta": {...},
  "background": {...},
  "text": {...}
}
```

**Response:** Settings đã lưu

### GET /health
Health check

## Deploy

### Option 1: Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Set environment variables
heroku config:set FRONTEND_URL=https://your-frontend.com
```

### Option 2: Railway
1. Push code lên GitHub
2. Import vào Railway.app
3. Set environment variables
4. Deploy tự động

### Option 3: VPS
```bash
# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name backend

# Auto restart on reboot
pm2 startup
pm2 save
```

## Data Storage

Data được lưu trong folder `data/`:
- `header-settings.json` - Header settings

**Note:** Trên hosting như Heroku/Railway, file system không persist. Cần dùng database (MongoDB, PostgreSQL) cho production.

## CORS

Backend cho phép CORS từ `FRONTEND_URL` trong `.env`.

Để cho phép nhiều domains:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-domain.com',
    'https://www.your-domain.com'
  ],
  credentials: true
}));
```
