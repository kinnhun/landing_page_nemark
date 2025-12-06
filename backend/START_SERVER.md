# Hướng Dẫn Khởi Động Backend Server

## Vấn Đề: Lỗi "Failed to fetch"

Lỗi này xảy ra khi frontend không thể kết nối đến backend server.

## Giải Pháp

### 1. Khởi động Backend Server

Mở terminal mới và chạy:

```bash
cd backend
npm run dev
```

hoặc

```bash
cd backend
npm start
```

### 2. Kiểm tra Server Đang Chạy

Sau khi khởi động, bạn sẽ thấy:

```
🚀 Backend server running on http://localhost:5000
📝 Environment: development
🌐 CORS enabled for: true
📡 API Base: /api
```

### 3. Test API Endpoint

Mở browser và truy cập:
- `http://localhost:5000/api/settings/banner`
- `http://localhost:5000/api/health`

### 4. Kiểm Tra Port

Nếu port 5000 đã được sử dụng, bạn có thể:
- Thay đổi port trong file `.env`: `PORT=5001`
- Hoặc kill process đang sử dụng port 5000

### 5. Kiểm Tra CORS

Backend đã được cấu hình CORS để cho phép frontend (port 3000) kết nối.

## Lưu Ý

- Backend server phải chạy trước khi frontend có thể gọi API
- Đảm bảo cả hai server (frontend và backend) đang chạy cùng lúc
- Frontend chạy trên: `http://localhost:3000`
- Backend chạy trên: `http://localhost:5000`

