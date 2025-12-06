import axios from 'axios';
import { CtaSettings } from '@/types/cta';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

export const getCtaSettings = async (): Promise<CtaSettings> => {
  try {
    const response = await axios.get(`${API_URL}/settings/cta`);
    return response.data.data;
  } catch (err) {
    console.warn('ctaApi.getCtaSettings: failed to fetch from backend, using default CTA', err);
    return {
      title: 'Đồng Hành Cùng Nemark Trong Hành Trình Chuyển Đổi Số',
      description: 'Bạn đang cần một website chuyên nghiệp, phần mềm quản lý linh hoạt hay giải pháp AI tự động hóa quy trình? Nemark sẵn sàng hỗ trợ và xây dựng giải pháp phù hợp nhất cho doanh nghiệp của bạn.',
      backgroundImage: '/assets/img/cta-bg.jpg',
      background: {
        type: 'gradient',
        gradientFrom: '#2563eb',
        gradientTo: '#14b8a6',
        opacity: 1
      },
      overlay: {
        enabled: true,
        opacity: 0.1
      },
      button: {
        label: 'Liên Hệ Ngay',
        link: '#contact',
        visible: true,
        backgroundColor: '#ffffff',
        textColor: '#2563eb',
        hoverBackgroundColor: '#f3f4f6',
        hoverTextColor: '#2563eb'
      }
    } as CtaSettings;
  }
};

export const updateCtaSettings = async (settings: CtaSettings): Promise<CtaSettings> => {
  const response = await axios.post(`${API_URL}/settings/cta`, settings);
  return response.data.data;
};

export const resetCtaSettings = async (): Promise<CtaSettings> => {
  const response = await axios.post(`${API_URL}/settings/cta/reset`);
  return response.data.data;
};
