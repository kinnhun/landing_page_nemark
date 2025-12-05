import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'src', 'data', 'header-settings.json');

async function readSettings() {
  try {
    const raw = await fs.promises.readFile(SETTINGS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

async function writeSettings(data: any) {
  const toWrite = { ...data, lastUpdated: Date.now() };
  await fs.promises.writeFile(SETTINGS_PATH, JSON.stringify(toWrite, null, 2), 'utf-8');
  return toWrite;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const settings = await readSettings();
    if (!settings) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(settings);
  }

  if (req.method === 'POST') {
    try {
      const incoming = req.body;
      // Basic validation: must be an object
      if (!incoming || typeof incoming !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' });
      }
      const saved = await writeSettings(incoming);
      return res.status(200).json(saved);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Write error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
