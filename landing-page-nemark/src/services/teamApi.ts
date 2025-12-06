import type { TeamSettings } from '../types/team';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = API_BASE_URL ? `${API_BASE_URL}/api` : '/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getTeamSettings = async (): Promise<TeamSettings> => {
  try {
    const res = await fetch(`${API_URL}/settings/team`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const json = (await res.json()) as ApiResponse<TeamSettings>;
    return json.data;
  } catch (err) {
    console.warn('teamApi.getTeamSettings: failed to fetch from backend, using default team', err);
    return {
      title: 'Đội Ngũ Nemark',
      description: 'Những chuyên gia giàu kinh nghiệm trong lĩnh vực thiết kế website, phần mềm, AI automation và giải pháp số, luôn sẵn sàng đồng hành cùng doanh nghiệp.',
      members: [
        {
          id: 1,
          name: 'Nguyễn Minh Khôi',
          position: 'Giám Đốc Điều Hành',
          bio: 'Người sáng lập Nemark với tầm nhìn xây dựng hệ sinh thái giải pháp số giúp doanh nghiệp phát triển bền vững trong thời đại công nghệ.',
          avatar: '/assets/img/team/team-1.jpg',
          social: {
            twitter: '#',
            facebook: '#',
            instagram: '#',
            linkedin: '#'
          },
          enabled: true
        },
        {
          id: 2,
          name: 'Trần Thu Hà',
          position: 'Quản Lý Sản Phẩm',
          bio: 'Chịu trách nhiệm xây dựng và hoạch định sản phẩm website – phần mềm, đảm bảo trải nghiệm người dùng mượt mà và hiệu quả.',
          avatar: '/assets/img/team/team-2.jpg',
          social: {
            twitter: '#',
            facebook: '#',
            instagram: '#',
            linkedin: '#'
          },
          enabled: true
        },
        {
          id: 3,
          name: 'Phạm Hoàng Long',
          position: 'Giám Đốc Công Nghệ',
          bio: 'Chuyên gia giải pháp AI, tự động hóa và hệ thống phần mềm với hơn 10 năm kinh nghiệm phát triển các nền tảng công nghệ phức tạp.',
          avatar: '/assets/img/team/team-3.jpg',
          social: {
            twitter: '#',
            facebook: '#',
            instagram: '#',
            linkedin: '#'
          },
          enabled: true
        },
        {
          id: 4,
          name: 'Lê Mai Anh',
          position: 'Trưởng Phòng Vận Hành',
          bio: 'Đảm bảo quy trình làm việc hiệu quả, quản lý dự án và chăm sóc khách hàng giúp Nemark duy trì chất lượng dịch vụ cao nhất.',
          avatar: '/assets/img/team/team-4.jpg',
          social: {
            twitter: '#',
            facebook: '#',
            instagram: '#',
            linkedin: '#'
          },
          enabled: true
        }
      ],
      visible: true,
      columns: 2,
      enableAnimation: true
    } as TeamSettings;
  }
};

export const saveTeamSettings = async (settings: TeamSettings): Promise<TeamSettings | null> => {
  try {
    const res = await fetch(`${API_URL}/settings/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      return null;
    }
    const json = (await res.json()) as ApiResponse<TeamSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving team settings:', err);
    return null;
  }
};

