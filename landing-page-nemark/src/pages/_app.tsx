import "@/styles/globals.css";
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from 'sonner';

import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";

const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

// Create cache once for client-side
const clientCache = createCache();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // Determine layout based on route
  const path = router.pathname;
  const isAdmin = path.startsWith("/admin");

  // Memoize layout to prevent re-render on route change
  const Layout = useMemo(() => {
    return isAdmin ? AdminLayout : UserLayout;
  }, [isAdmin]);

  // Handle route change loading states
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setIsRouteChanging(true);
      }
    };
    
    const handleComplete = () => {
      setIsRouteChanging(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <StyleProvider cache={clientCache} hashPriority="high">
      <ThemeProvider locale="vi">
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Loading overlay during route transitions */}
          {isRouteChanging && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s ease-in-out infinite',
                zIndex: 9999,
              }}
            />
          )}
          
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="top-right" />
          
          {/* Loading animation keyframes */}
          <style jsx global>{`
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      </ThemeProvider>
    </StyleProvider>
  );
}
