import Link from 'next/link';
import React from 'react';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, SkypeOutlined, LinkedinOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#2f3942] text-white py-8 text-center text-sm">
      <div className="container mx-auto px-4">
        
        <h3 className="text-4xl font-bold mb-4 text-white">Nemark</h3>
        <p className="italic mb-8 text-gray-300">
          Nemark cung cấp giải pháp thiết kế website, phần mềm, AI automation 
          và chuyển đổi số giúp doanh nghiệp tối ưu vận hành và phát triển bền vững.
        </p>

        {/* SOCIAL */}
        <div className="flex justify-center gap-2 mb-8">
          {[TwitterOutlined, FacebookOutlined, InstagramOutlined, SkypeOutlined, LinkedinOutlined].map((Icon, index) => (
            <a key={index} href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
              <Icon />
            </a>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-6">
          {/* COPYRIGHT */}
          <div className="mb-1">
            <span>Bản quyền ©</span>
            <strong className="px-1">Nemark</strong>
            <span>– Giữ toàn quyền.</span>
          </div>

          {/* CREDITS */}
          <div className="text-xs">
            Phát triển bởi <Link href="/" className="text-blue-500 hover:text-blue-400">KinKin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
