import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'public', 'settingdata', 'general.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(settingsFilePath, 'utf8');
      const settings = JSON.parse(fileContents);
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read settings' });
    }
  } else if (req.method === 'POST') {
    try {
      const settings = req.body;
      fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), 'utf8');
      res.status(200).json({ success: true, message: 'Settings saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
