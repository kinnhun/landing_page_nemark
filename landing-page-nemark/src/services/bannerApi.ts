import type { BannerSettings } from '../types/banner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getBannerSettings(): Promise<BannerSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/banner`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<BannerSettings>;
    return json.data;
  } catch (err) {
    console.error('Error fetching banner settings:', err);
    return null;
  }
}

export async function saveBannerSettings(s: BannerSettings): Promise<BannerSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/banner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<BannerSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving banner settings:', err);
    return null;
  }
}

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE_URL}/api/settings/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<{ url: string }>;
    // If the URL is relative, prepend the API base URL (or just the origin if served from same domain)
    // Since the backend returns /uploads/filename.jpg, and we are on port 3000 accessing port 5000,
    // we need to prepend the backend URL.
    
    let url = json.data.url;
    if (url.startsWith('/')) {
        url = `${API_BASE_URL}${url}`;
    }
    return url;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
}
