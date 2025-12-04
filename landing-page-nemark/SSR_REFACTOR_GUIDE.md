# Enterprise-Grade SSR Setup with Next.js & Ant Design v5

## ✅ Đã hoàn thành Full SSR Refactor

### 🎯 Các vấn đề đã giải quyết:

1. **✅ Không FOUC (Flash of Unstyled Content)**
   - Sử dụng `@ant-design/cssinjs` với SSR cache extraction
   - Styles được inject inline trong `_document.tsx`
   - Critical CSS được preload

2. **✅ Không flash trắng khi load trang**
   - Loading component với smooth transition
   - Route change indicator với progress bar animation
   - Skeleton loading states

3. **✅ Không bị chờ _devMiddlewareManifest.json**
   - Đã tắt static export (`output: "export"`)
   - Enable full SSR mode
   - Optimize build configuration

4. **✅ Không lỗi hydration**
   - `ClientOnly` component để xử lý client-side only code
   - Mounted state trong layouts để sync server/client
   - Proper SSR setup với `getInitialProps`

5. **✅ Không render lại layout khi chuyển route**
   - Memoize layouts với `useMemo`
   - Route-based layout selection
   - Persistent layout structure

6. **✅ Hoạt động mượt như CMS/Dashboard chuyên nghiệp**
   - Enterprise-grade theme configuration
   - Optimized font loading
   - SWC minification
   - Tree-shaking với modularizeImports

---

## 📁 Cấu trúc files đã tạo/sửa:

### 1. **next.config.ts** ✅
- Tắt static export
- Enable SSR mode
- Optimize bundle size với modularizeImports
- SWC minification

### 2. **src/pages/_document.tsx** ✅
- SSR cache extraction cho Ant Design
- Inline styles injection
- Optimized font loading
- Prevent FOUC với critical CSS

### 3. **src/pages/_app.tsx** ✅
- StyleProvider với client-side cache
- ThemeProvider wrapper
- Route change loading states
- Layout memoization
- Loading progress bar

### 4. **src/contexts/ThemeContext.tsx** ✅
- Enterprise theme configuration
- Multi-language support (vi/en)
- Consistent design tokens
- Virtual rendering để tránh hydration errors

### 5. **src/components/Loading.tsx** ✅
- Loading component với Ant Design Spin
- Smooth loading experience

### 6. **src/components/ClientOnly.tsx** ✅
- Utility component để xử lý client-only code
- Prevent hydration mismatches

### 7. **src/layouts/AdminLayout.tsx** ✅
- SSR-compatible layout
- Mounted state để sync server/client
- Smooth transitions

### 8. **src/layouts/UserLayout.tsx** ✅
- SSR-compatible layout
- Loading skeleton on server-side

---

## 🚀 Cách sử dụng:

### Development:
```bash
npm run dev
```

### Production build:
```bash
npm run build
npm start
```

---

## 💡 Best Practices đã áp dụng:

1. **SSR-First Architecture**
   - Full server-side rendering
   - Ant Design styles được extract trên server
   - No client-side flash

2. **Performance Optimization**
   - Font preloading
   - SWC minification
   - Tree-shaking
   - Code splitting

3. **Hydration Safety**
   - ClientOnly wrapper cho browser APIs
   - Mounted state pattern
   - Consistent server/client rendering

4. **User Experience**
   - Loading states
   - Route transition indicators
   - No layout shift
   - Smooth animations

5. **Type Safety**
   - Full TypeScript support
   - Type-safe theme configuration
   - Proper interface definitions

---

## 🎨 Theme Configuration:

Theme được centralize trong `ThemeContext.tsx`:
- Primary color: #2563eb
- Professional color palette
- Consistent spacing
- Custom component styles

---

## 🔧 Troubleshooting:

Nếu gặp lỗi hydration:
1. Wrap component trong `<ClientOnly>`
2. Use mounted state pattern
3. Check console warnings

Nếu thấy FOUC:
1. Clear `.next` cache
2. Rebuild project
3. Check StyleProvider setup

---

## 📝 Notes:

- Đã test với Next.js 16.0.6
- Compatible với Ant Design v6
- React 19.2.0
- TypeScript 5

**Giờ website sẽ hoạt động mượt mà như một CMS chuyên nghiệp! 🎉**
