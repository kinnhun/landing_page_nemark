import type { HeaderSettings } from '../types/header';

export async function getHeaderSettings(): Promise<HeaderSettings | null> {
  try {
    const res = await fetch('/api/settings/header');
    if (!res.ok) return null;
    const json = (await res.json()) as HeaderSettings;
    return json;
  } catch {
    return null;
  }
}

export async function saveHeaderSettings(s: HeaderSettings): Promise<HeaderSettings | null> {
  try {
    const res = await fetch('/api/settings/header', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    });
    if (!res.ok) return null;
    const json = (await res.json()) as HeaderSettings;
    return json;
  } catch {
    return null;
  }
}
