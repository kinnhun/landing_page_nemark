import "@/styles/globals.css";
import i18n from "../i18n";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import useTemplateScripts from "../hooks/useTemplateScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // Initialize template scripts
  useTemplateScripts();

  // Detect browser language after hydration and update i18n.
  // This prevents hydration mismatch by keeping the initial
  // server-rendered language consistent (fallback 'en').
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
      const short = String(nav).split("-")[0];
      const target = short === "vi" ? "vi" : "en";
      if (i18n.language !== target) {
        i18n.changeLanguage(target).catch(() => {
          /* ignore */
        });
      }
    } catch {
      // ignore detection errors
    }
  }, []);

  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {getLayout(<Component {...pageProps} />)}
    </main>
  );
}
