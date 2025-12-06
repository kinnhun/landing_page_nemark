import type { PricingSettings } from '../types/pricing';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = API_BASE_URL ? `${API_BASE_URL}/api` : '/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getPricingSettings = async (): Promise<PricingSettings> => {
  try {
    const res = await fetch(`${API_URL}/settings/pricing`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const json = (await res.json()) as ApiResponse<PricingSettings>;
    return json.data;
  } catch (err) {
    console.warn('pricingApi.getPricingSettings: failed to fetch from backend, using default pricing', err);
    return {
      title: 'Bảng Giá Dịch Vụ',
      description: 'Nemark cung cấp các gói dịch vụ linh hoạt phù hợp với mọi nhu cầu — từ khởi tạo website cơ bản đến giải pháp doanh nghiệp chuyên sâu.',
      packages: [
        {
          id: 1,
          title: 'Gói Cơ Bản',
          description: 'Phù hợp cá nhân hoặc cửa hàng nhỏ muốn có website giới thiệu nhanh chóng, chi phí tiết kiệm.',
          price: 0,
          priceUnit: '/ tháng',
          currency: '₫',
          buttonText: 'Dùng Thử Miễn Phí',
          buttonLink: '#contact',
          buttonSubtext: 'Không yêu cầu thẻ thanh toán',
          features: [
            { id: 1, text: 'Website giao diện sẵn', included: true },
            { id: 2, text: 'Tối ưu chuẩn SEO cơ bản', included: true },
            { id: 3, text: 'Hosting miễn phí 1GB', included: true },
            { id: 4, text: 'Tùy chỉnh giao diện nâng cao', included: false },
            { id: 5, text: 'Tích hợp AI automation', included: false },
            { id: 6, text: 'Hỗ trợ kỹ thuật 24/7', included: false },
            { id: 7, text: 'Quản trị nội dung định kỳ', included: false }
          ],
          popular: false,
          enabled: true
        },
        {
          id: 2,
          title: 'Gói Doanh Nghiệp',
          description: 'Dành cho doanh nghiệp muốn website chuyên nghiệp, đầy đủ tính năng, tối ưu bán hàng & thương hiệu.',
          price: 2900000,
          priceUnit: '/ tháng',
          currency: '₫',
          buttonText: 'Đăng Ký Ngay',
          buttonLink: '#contact',
          buttonSubtext: 'Miễn phí tư vấn & demo',
          features: [
            { id: 1, text: 'Thiết kế giao diện theo thương hiệu', included: true },
            { id: 2, text: 'Tối ưu SEO nâng cao', included: true },
            { id: 3, text: 'Hosting doanh nghiệp 10GB', included: true },
            { id: 4, text: 'Tích hợp thanh toán & vận chuyển', included: true },
            { id: 5, text: 'Tích hợp AI chatbot trả lời tự động', included: true },
            { id: 6, text: 'Hỗ trợ kỹ thuật 24/7', included: true },
            { id: 7, text: 'Phát triển phần mềm theo yêu cầu', included: false }
          ],
          popular: true,
          enabled: true,
          borderColor: '#2563eb',
          scale: 1.05
        },
        {
          id: 3,
          title: 'Gói Chuyên Sâu',
          description: 'Gói giải pháp toàn diện bao gồm website + phần mềm + AI + hệ thống vận hành riêng cho doanh nghiệp.',
          price: 4900000,
          priceUnit: '/ tháng',
          currency: '₫',
          buttonText: 'Nhận Tư Vấn',
          buttonLink: '#contact',
          buttonSubtext: 'Cam kết hiệu quả & bảo trì dài hạn',
          features: [
            { id: 1, text: 'Thiết kế website cao cấp theo yêu cầu', included: true },
            { id: 2, text: 'Xây dựng phần mềm/CRM theo quy trình của bạn', included: true },
            { id: 3, text: 'Tối ưu SEO tổng thể + content chuẩn SEO', included: true },
            { id: 4, text: 'Tích hợp AI automation & phân tích dữ liệu', included: true },
            { id: 5, text: 'Hosting/VPS riêng – bảo mật cao', included: true },
            { id: 6, text: 'Quản trị website hằng tháng', included: true },
            { id: 7, text: 'Hỗ trợ kỹ thuật ưu tiên 24/7', included: true }
          ],
          popular: false,
          enabled: true
        }
      ],
      visible: true,
      columns: 3
    } as PricingSettings;
  }
};

export const savePricingSettings = async (settings: PricingSettings): Promise<PricingSettings | null> => {
  try {
    const res = await fetch(`${API_URL}/settings/pricing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      return null;
    }
    const json = (await res.json()) as ApiResponse<PricingSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving pricing settings:', err);
    return null;
  }
};

