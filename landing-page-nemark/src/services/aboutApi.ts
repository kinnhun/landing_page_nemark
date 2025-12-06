import type { AboutSettings } from '../types/about';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getAboutSettings(): Promise<AboutSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/about`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<AboutSettings>;
    return json.data;
  } catch (err) {
    console.error('Error fetching about settings:', err);
    return null;
  }
}

export async function saveAboutSettings(s: AboutSettings): Promise<AboutSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/about`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<AboutSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving about settings:', err);
    return null;
  }
}
