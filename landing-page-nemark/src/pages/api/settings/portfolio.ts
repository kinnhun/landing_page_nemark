import type { NextApiRequest, NextApiResponse } from 'next';
import type { PortfolioSettings } from '../../../types/portfolio';
import fs from 'fs';
import path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-settings.json');

async function readSettings() {
  try {
    const raw = await fs.promises.readFile(SETTINGS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // Return default settings if file doesn't exist
    return {
      title: 'Dự Án Tiêu Biểu',
      description: 'Các dự án Nemark đã triển khai, bao gồm website doanh nghiệp, ứng dụng, phần mềm quản lý, hệ thống thương mại điện tử và các giải pháp thương hiệu số.',
      categories: [
        { key: '*', label: 'Tất Cả' },
        { key: 'app', label: 'Ứng Dụng' },
        { key: 'product', label: 'Sản Phẩm' },
        { key: 'branding', label: 'Thương Hiệu' },
        { key: 'books', label: 'Tài Liệu / Ấn Phẩm' },
      ],
      items: [
        { id: 1, category: 'app', title: 'Ứng Dụng Quản Lý', desc: 'Giải pháp quản lý bán hàng & vận hành dành cho doanh nghiệp SMEs.', img: '/assets/img/portfolio/app-1.jpg', enabled: true },
        { id: 2, category: 'product', title: 'Website Thương Mại', desc: 'Hệ thống website bán hàng tối ưu SEO & trải nghiệm người dùng.', img: '/assets/img/portfolio/product-1.jpg', enabled: true },
        { id: 3, category: 'branding', title: 'Thiết Kế Thương Hiệu', desc: 'Bộ nhận diện doanh nghiệp đồng bộ và hiện đại.', img: '/assets/img/portfolio/branding-1.jpg', enabled: true },
        { id: 4, category: 'books', title: 'Tài Liệu Sản Phẩm', desc: 'Tài liệu hướng dẫn & ấn phẩm giới thiệu giải pháp công nghệ.', img: '/assets/img/portfolio/books-1.jpg', enabled: true },
        { id: 5, category: 'app', title: 'Ứng Dụng Mobile', desc: 'Ứng dụng chăm sóc khách hàng & đặt lịch dịch vụ cho doanh nghiệp.', img: '/assets/img/portfolio/app-2.jpg', enabled: true },
        { id: 6, category: 'product', title: 'Website Dịch Vụ', desc: 'Giải pháp website đặt lịch và bán dịch vụ chuyên nghiệp.', img: '/assets/img/portfolio/product-2.jpg', enabled: true },
        { id: 7, category: 'branding', title: 'Logo & Bộ Nhận Diện', desc: 'Xây dựng hình ảnh thương hiệu theo phong cách hiện đại.', img: '/assets/img/portfolio/branding-2.jpg', enabled: true },
        { id: 8, category: 'books', title: 'Ấn Phẩm Số', desc: 'Thiết kế tài liệu digital phục vụ quảng cáo & truyền thông.', img: '/assets/img/portfolio/books-2.jpg', enabled: true },
        { id: 9, category: 'app', title: 'Ứng Dụng Doanh Nghiệp', desc: 'Giải pháp tối ưu vận hành & quản lý nội bộ cho doanh nghiệp.', img: '/assets/img/portfolio/app-3.jpg', enabled: true },
        { id: 10, category: 'product', title: 'Website Doanh Nghiệp', desc: 'Website giới thiệu công ty chuẩn SEO, giao diện chuyên nghiệp.', img: '/assets/img/portfolio/product-3.jpg', enabled: true },
        { id: 11, category: 'branding', title: 'Thiết Kế Bộ Nhận Diện', desc: 'Thiết kế đồng bộ hình ảnh, nâng tầm thương hiệu doanh nghiệp.', img: '/assets/img/portfolio/branding-3.jpg', enabled: true },
        { id: 12, category: 'books', title: 'Tài Liệu Doanh Nghiệp', desc: 'Tài liệu, infographic và báo cáo trình bày hiện đại.', img: '/assets/img/portfolio/books-3.jpg', enabled: true },
      ],
      visible: true,
      columns: 3,
      showFilter: true,
      enableAnimation: true,
    };
  }
}

async function writeSettings(data: PortfolioSettings) {
  // Ensure data directory exists
  const dataDir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dataDir)) {
    await fs.promises.mkdir(dataDir, { recursive: true });
  }

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
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message || 'Write error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

