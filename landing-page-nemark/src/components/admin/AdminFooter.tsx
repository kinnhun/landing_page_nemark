import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AdminFooter: React.FC = () => {
  return (
    <Footer className="bg-white border-t border-gray-100 py-3 text-xs text-gray-500">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-4 w-full">
        <span className="block">© {new Date().getFullYear()} Nemark Admin. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
        </div>
      </div>
    </Footer>
  );
};

export default AdminFooter;
