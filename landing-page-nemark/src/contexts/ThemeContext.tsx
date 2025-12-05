import React, { createContext, useContext, useMemo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';

interface ThemeContextType {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, locale = 'vi' }) => {
  // Enterprise-grade theme configuration
  const themeConfig: ThemeConfig = useMemo(() => ({
    token: {
      colorPrimary: '#2563eb',
      colorSuccess: '#10b981',
      colorWarning: '#f59e0b',
      colorError: '#ef4444',
      colorInfo: '#3b82f6',
      borderRadius: 6,
      wireframe: false,
      // Typography
      fontSize: 14,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      // Layout
      controlHeight: 36,
      // Animation
      motion: true,
      motionUnit: 0.1,
    },
    algorithm: antdTheme.defaultAlgorithm,
    components: {
      Layout: {
        headerBg: '#ffffff',
        headerHeight: 64,
        siderBg: '#001529',
      },
      Menu: {
        itemBg: 'transparent',
        darkItemBg: '#001529',
        darkSubMenuItemBg: '#000c17',
      },
      Card: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      Button: {
        primaryShadow: '0 2px 0 rgba(5, 145, 255, 0.1)',
      },
    },
  }), []);

  const antdLocale: Locale = useMemo(() => {
    return locale === 'vi' ? viVN : enUS;
  }, [locale]);

  const value = useMemo(() => ({ theme: themeConfig }), [themeConfig]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider 
        theme={themeConfig} 
        locale={antdLocale}
        // Prevent hydration errors
        virtual
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
