# Landing Page Project - Separated Backend & Frontend

Project đã được tách thành 2 phần riêng biệt:

## 📁 Structure

```
landing_page_nemark/
├── backend/                 # Node.js + Express API
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── data/               # JSON storage
│   └── README.md
│
└── landing-page-nemark/    # Next.js Frontend
    ├── src/
    ├── public/
    ├── package.json
    ├── .env.local
    └── next.config.ts
```

## 🚀 Quick Start

### 1. Start Backend (Port 5000)

```bash
cd backend
npm install
npm run dev
```

Backend API: http://localhost:5000

### 2. Start Frontend (Port 3000)

```bash
cd landing-page-nemark
npm install
npm run dev
```

Frontend: http://localhost:3000

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📡 API Endpoints

Base URL: `http://localhost:5000`

- `GET /` - API info
- `GET /api/settings/header` - Get header settings
- `POST /api/settings/header` - Update header settings
- `GET /health` - Health check

## 🌐 Deploy

### Backend Deploy Options:
- **Railway.app** (Recommend)
- **Heroku**
- **Render.com**
- **VPS (Ubuntu + PM2)**

### Frontend Deploy Options:
- **Vercel** (Recommend - có support Next.js tốt)
- **Netlify**
- **GitHub Pages** (static export)

### Deploy Steps:

#### 1. Deploy Backend trước
1. Push backend code lên GitHub (hoặc deploy trực tiếp)
2. Deploy lên Railway/Heroku/Render
3. Lấy backend URL (vd: `https://your-backend.railway.app`)

#### 2. Deploy Frontend sau
1. Update `.env.local` hoặc Vercel environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
2. Update CORS trong backend `.env`:
   ```env
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Deploy frontend lên Vercel/Netlify

## ✅ Benefits

- ✅ **Tách biệt hoàn toàn**: Backend và Frontend độc lập
- ✅ **Dễ scale**: Deploy và scale riêng từng service
- ✅ **Dễ maintain**: Update backend không ảnh hưởng frontend
- ✅ **Flexible**: Có thể dùng backend cho nhiều frontend khác
- ✅ **Data persist**: Data lưu trong backend, không bị mất khi deploy frontend

## 🔐 Security Notes

- Backend sử dụng CORS để bảo vệ API
- Có thể thêm authentication/JWT nếu cần
- Rate limiting (recommend cho production)
- Input validation đã có sẵn

## 📝 Notes

### Development:
- Backend và Frontend chạy cùng lúc trên 2 ports khác nhau
- Hot reload có sẵn cho cả 2
- CORS đã được config sẵn

### Production:
- Backend cần database (MongoDB/PostgreSQL) thay vì file JSON
- Nên dùng environment variables cho sensitive data
- Setup monitoring (PM2, Sentry, etc.)
