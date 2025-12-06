import type { HeaderSettings } from '../types/header';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getHeaderSettings(): Promise<HeaderSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/header`);
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<HeaderSettings>;
    return json.data;
  } catch (err) {
    console.error('Error fetching header settings:', err);
    return null;
  }
}

export async function saveHeaderSettings(s: HeaderSettings): Promise<HeaderSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings/header`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<HeaderSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving header settings:', err);
    return null;
  }
}
