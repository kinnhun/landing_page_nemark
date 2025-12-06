import axios from 'axios';
import { StatsSettings } from '@/types/stats';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

export const getStatsSettings = async (): Promise<StatsSettings> => {
  try {
    const response = await axios.get(`${API_URL}/settings/stats`);
    return response.data.data;
  } catch (err) {
    // Log and return sensible defaults so the frontend doesn't crash during backend downtime
    // Useful while developing if the backend isn't running or endpoint returns 404
    // Keep this helpful for debugging in dev only
    console.warn('statsApi.getStatsSettings: failed to fetch from backend, using default stats', err);
    return {
      stats: [
        { label: 'Khách Hàng Tin Dùng', value: 232 },
        { label: 'Dự Án Hoàn Thành', value: 521 },
        { label: 'Giờ Hỗ Trợ Kỹ Thuật', value: 1453 },
        { label: 'Thành Viên Đội Ngũ', value: 32 }
      ]
    } as StatsSettings;
  }
};

export const updateStatsSettings = async (settings: StatsSettings): Promise<StatsSettings> => {
  const response = await axios.post(`${API_URL}/settings/stats`, settings);
  return response.data.data;
};

export const resetStatsSettings = async (): Promise<StatsSettings> => {
  const response = await axios.post(`${API_URL}/settings/stats/reset`);
  return response.data.data;
};
