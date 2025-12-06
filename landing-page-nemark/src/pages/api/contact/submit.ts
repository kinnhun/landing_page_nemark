import type { NextApiRequest, NextApiResponse } from 'next';

interface SubmitRequest {
  sheetId: string;
  tabName: string;
  data: Record<string, string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sheetId, tabName, data }: SubmitRequest = req.body;

    if (!sheetId || !data) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Use Google Apps Script Web App URL if available
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (scriptUrl) {
      // Send to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheetId,
          tabName: tabName || 'Sheet1',
          data,
        }),
      });

      if (response.ok) {
        return res.status(200).json({ message: 'Success' });
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to submit to Google Apps Script: ${errorText}`);
      }
    }

    // Alternative: Use Google Sheets API directly if credentials are available
    // This requires googleapis package and service account credentials
    // For now, we'll return an error asking to set up Google Apps Script
    
    return res.status(500).json({ 
      message: 'Google Sheets integration not configured. Please set up GOOGLE_APPS_SCRIPT_URL environment variable. See README for instructions.' 
    });
  } catch (error: any) {
    console.error('Error submitting to Google Sheet:', error);
    return res.status(500).json({ 
      message: error.message || 'Failed to submit to Google Sheet' 
    });
  }
}

