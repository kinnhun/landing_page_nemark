import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import React from 'react';

export default function MyDocument() {
  return (
    <Html lang="vi">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Nemark - Enterprise Landing Page" />
        <meta name="keywords" content="nemark, landing page, enterprise" />

        {/* Favicons */}
        <link href="/assets/img/favicon.png" rel="icon" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* Preconnect to improve font loading */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
        
        {/* Optimized font loading - only load needed weights */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Prevent FOUC with critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { 
            margin: 0; 
            opacity: 1; 
            transition: opacity 0.3s ease-in-out;
          }
          #__next { 
            min-height: 100vh; 
          }
        `}} />
      </Head>
      <body className="index-page">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Critical SSR setup for Ant Design to prevent FOUC
MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps & { styles: React.ReactElement }> => {
  // Create cache for Ant Design styles
  const cache = createCache();
  
  // Store original renderPage
  const originalRenderPage = ctx.renderPage;

  // Wrap app with StyleProvider to extract styles
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  // Get initial props from Document
  const initialProps = await Document.getInitialProps(ctx);
  
  // Extract styles from cache
  const style = extractStyle(cache, true);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {/* Inject Ant Design styles inline to prevent FOUC */}
        {style && (
          <style 
            dangerouslySetInnerHTML={{ __html: style }} 
            data-ant-cssinjs-cache-key="ant-design-ssr"
          />
        )}
      </>
    ),
  };
};
