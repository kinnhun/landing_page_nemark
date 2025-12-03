import Link from 'next/link';
import React from 'react';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, SkypeOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Reveal } from './Reveal';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-50 text-gray-600 py-12 text-center text-sm border-t border-gray-200">
      <div className="container mx-auto px-4">
        <Reveal width="100%" direction="up">
          <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-teal-500">Nemark</h3>
          <p className="italic mb-8 text-gray-500 max-w-2xl mx-auto">
            Nemark cung cấp giải pháp thiết kế website, phần mềm, AI automation 
            và chuyển đổi số giúp doanh nghiệp tối ưu vận hành và phát triển bền vững.
          </p>

          {/* SOCIAL */}
          <div className="flex justify-center gap-3 mb-8">
            {[TwitterOutlined, FacebookOutlined, InstagramOutlined, SkypeOutlined, LinkedinOutlined].map((Icon, index) => (
              <a key={index} href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-400 shadow-sm hover:shadow-md hover:text-blue-500 hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <Icon className="text-lg" />
              </a>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            {/* COPYRIGHT */}
            <div className="mb-2">
              <span>Bản quyền ©</span>
              <strong className="px-1 text-gray-800">Nemark</strong>
              <span>– Giữ toàn quyền.</span>
            </div>

            {/* CREDITS */}
            <div className="text-xs text-gray-400">
              Phát triển bởi <Link href="/" className="text-blue-500 hover:text-teal-500 transition-colors">KinKin</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
