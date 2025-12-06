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
    
    if (!scriptUrl) {
      return res.status(500).json({ 
        success: false,
        message: 'Google Sheets integration not configured. Please set up GOOGLE_APPS_SCRIPT_URL environment variable.',
        instructions: [
          '1. Mở file google-apps-script.js trong thư mục root của project',
          '2. Copy toàn bộ code trong file đó',
          '3. Mở Google Sheets của bạn và vào: Tiện ích > Apps Script',
          '4. Dán code vào và lưu lại',
          '5. Deploy > New deployment > Web app',
          '6. Execute as: Me, Who has access: Anyone',
          '7. Copy URL được tạo ra',
          '8. Tạo file .env.local trong thư mục landing-page-nemark và thêm: GOOGLE_APPS_SCRIPT_URL=<URL_VỪA_COPY>',
          '9. Khởi động lại server Next.js'
        ]
      });
    }

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

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { success: false, message: responseText };
    }

    if (response.ok && responseData.success) {
      return res.status(200).json({ 
        success: true,
        message: 'Gửi tin nhắn thành công!' 
      });
    } else {
      throw new Error(responseData.message || `Failed to submit to Google Apps Script: ${response.statusText}`);
    }
  } catch (error: any) {
    console.error('Error submitting to Google Sheet:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to submit to Google Sheet' 
    });
  }
}

