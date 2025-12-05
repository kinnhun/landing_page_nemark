import type { HeaderSettings } from '../types/header';

const SETTINGS_KEY = 'header_settings';

export async function getHeaderSettings(): Promise<HeaderSettings | null> {
  try {
    // Try localStorage first (for saved settings)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return JSON.parse(saved) as HeaderSettings;
      }
    }
    
    // Fallback to static JSON file
    const basePath = process.env.NODE_ENV === 'production' ? '/landing_page_nemark' : '';
    const res = await fetch(`${basePath}/data/header-settings.json`);
    if (!res.ok) return null;
    const json = (await res.json()) as HeaderSettings;
    return json;
  } catch {
    return null;
  }
}

export async function saveHeaderSettings(s: HeaderSettings): Promise<HeaderSettings | null> {
  try {
    // Save to localStorage for static deployment
    if (typeof window !== 'undefined') {
      const toSave = { ...s, lastUpdated: Date.now() };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(toSave));
      return toSave;
    }
    return null;
  } catch {
    return null;
  }
}
