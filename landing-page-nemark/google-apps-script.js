/**
 * Google Apps Script để lưu dữ liệu form vào Google Sheets
 * 
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Mở Google Sheets của bạn
 * 2. Vào menu: Tiện ích (Extensions) > Apps Script
 * 3. Xóa code mặc định và dán toàn bộ code này vào
 * 4. Lưu lại (Ctrl+S hoặc Cmd+S)
 * 5. Chọn hàm "doPost" trong dropdown "Select function"
 * 6. Nhấn nút "Deploy" > "New deployment"
 * 7. Chọn type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (hoặc "Anyone with Google account" nếu muốn bảo mật hơn)
 * 10. Nhấn "Deploy"
 * 11. Copy URL được tạo ra (ví dụ: https://script.google.com/macros/s/...)
 * 12. Thêm URL này vào file .env.local với tên: GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/...
 * 13. Khởi động lại server Next.js
 */

function doPost(e) {
  try {
    // Parse JSON data từ request
    const requestData = JSON.parse(e.postData.contents);
    const { sheetId, tabName, data } = requestData;

    // Validate input
    if (!sheetId || !data) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Missing sheetId or data' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Mở spreadsheet
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    let sheet;
    
    // Tìm hoặc tạo sheet với tên tabName
    try {
      sheet = spreadsheet.getSheetByName(tabName || 'Sheet1');
      if (!sheet) {
        // Nếu không tìm thấy sheet, tạo mới
        sheet = spreadsheet.insertSheet(tabName || 'Sheet1');
      }
    } catch (error) {
      // Nếu có lỗi, sử dụng sheet đầu tiên
      sheet = spreadsheet.getSheets()[0];
    }

    // Lấy headers (dòng đầu tiên)
    const lastRow = sheet.getLastRow();
    let headers = [];
    
    if (lastRow === 0) {
      // Nếu sheet trống, tạo headers từ keys của data
      headers = Object.keys(data);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
      sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
    } else {
      // Lấy headers từ dòng đầu tiên
      const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
      headers = headerRange.getValues()[0];
      
      // Thêm các headers mới nếu có trong data nhưng chưa có trong sheet
      const existingHeaders = headers.filter(h => h !== '');
      const newHeaders = Object.keys(data).filter(key => !existingHeaders.includes(key));
      if (newHeaders.length > 0) {
        headers = headers.concat(newHeaders);
        const newHeaderRange = sheet.getRange(1, 1, 1, headers.length);
        newHeaderRange.setValues([headers]);
        newHeaderRange.setFontWeight('bold');
        newHeaderRange.setBackground('#4285f4');
        newHeaderRange.setFontColor('#ffffff');
      }
    }

    // Tạo row data theo thứ tự headers
    const rowData = headers.map(header => {
      return data[header] || '';
    });

    // Thêm dòng mới
    const newRow = lastRow + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

    // Format dòng mới (tùy chọn)
    const newRowRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // Thêm timestamp nếu có cột "Timestamp"
    const timestampIndex = headers.indexOf('Timestamp');
    if (timestampIndex !== -1) {
      sheet.getRange(newRow, timestampIndex + 1).setValue(new Date());
    }

    // Trả về success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        row: newRow 
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Trả về error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        message: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm doGet để tránh lỗi khi test bằng browser (GET request)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      success: false, 
      message: 'Please use POST method to submit data' 
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function để kiểm tra script hoạt động
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        sheetId: 'YOUR_SHEET_ID_HERE',
        tabName: 'Liên Hệ',
        data: {
          'Họ và Tên': 'Test User',
          'Email': 'test@example.com',
          'Tin nhắn': 'This is a test message'
        }
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

