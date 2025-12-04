import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { ThemeConfig } from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";

type BrandColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

type TypographySettings = {
  primaryFont: string;
  headingFont: string;
  baseFontSize: string;
  headingFontWeight: string;
  bodyFontWeight: string;
  lineHeight: string;
};

type GeneralSettings = {
  brandColors: BrandColors;
  typography: TypographySettings;
};

interface ThemeContextType {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  locale = "vi",
}) => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);

  // Load settings from localStorage or fallback to public JSON
  useEffect(() => {
    const load = async () => {
      try {
        if (typeof window !== "undefined") {
          const saved = window.localStorage.getItem("generalSettings");
          if (saved) {
            setSettings(JSON.parse(saved));
            return;
          }
        }

        // Fallback to public file
        const res = await fetch("/settingdata/general.json");
        if (res.ok) {
          const data = await res.json();
          setSettings(data as GeneralSettings);
        }
      } catch {
        // ignore
      }
    };
    load();

    // Listen for storage changes so theme updates across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === "generalSettings" && e.newValue) {
        try {
          setSettings(JSON.parse(e.newValue));
        } catch {}
      }
    };

    // Also listen for a custom event so same-tab saves update immediately
    const onCustom = (e: Event) => {
      try {
        const ce = e as CustomEvent<GeneralSettings>;
        if (ce && ce.detail) setSettings(ce.detail);
      } catch {}
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      window.addEventListener("generalSettingsUpdated", onCustom as EventListener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("generalSettingsUpdated", onCustom as EventListener);
      }
    };
  }, []);

  // Build theme tokens from settings with sensible defaults
  const themeConfig: ThemeConfig = useMemo(() => {
    const brand = settings?.brandColors ?? {
      primary: "#2563eb",
      secondary: "#10b981",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#1f2937",
    };

    const typo = settings?.typography ?? {
      primaryFont:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      headingFont:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      baseFontSize: "16px",
      headingFontWeight: "700",
      bodyFontWeight: "400",
      lineHeight: "1.6",
    };

    // parse base font size (e.g. "16px") -> number
    const parsedFontSize =
      parseInt(String(typo.baseFontSize).replace("px", ""), 10) || 14;

    return {
      token: {
        colorPrimary: brand.primary,
        colorSuccess: brand.secondary,
        colorWarning: brand.accent,
        colorError: "#ef4444",
        colorInfo: brand.primary,
        borderRadius: 6,
        wireframe: false,
        fontSize: parsedFontSize,
        fontFamily: typo.primaryFont,
        controlHeight: 36,
        motion: true,
        motionUnit: 0.1,
      },
      algorithm: antdTheme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: brand.background,
          headerHeight: 64,
          siderBg: "#001529",
        },
        Menu: {
          itemBg: "transparent",
          darkItemBg: "#001529",
          darkSubMenuItemBg: "#000c17",
        },
        Card: {
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        },
        Button: {
          primaryShadow: "0 2px 0 rgba(0,0,0,0.06)",
        },
      },
    } as ThemeConfig;
  }, [settings]);

  // Apply CSS variables globally so custom styles pick up changes
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const brand = settings?.brandColors;
    const typo = settings?.typography;
    if (brand) {
      root.style.setProperty("--brand-primary", brand.primary);
      root.style.setProperty("--brand-secondary", brand.secondary);
      root.style.setProperty("--brand-accent", brand.accent);
      root.style.setProperty("--brand-background", brand.background);
      root.style.setProperty("--brand-text", brand.text);
    }
    if (typo) {
      root.style.setProperty("--font-primary", typo.primaryFont);
      root.style.setProperty("--font-heading", typo.headingFont);
      root.style.setProperty("--base-font-size", typo.baseFontSize);
      root.style.setProperty("--heading-weight", typo.headingFontWeight);
      root.style.setProperty("--body-weight", typo.bodyFontWeight);
      root.style.setProperty("--line-height", String(typo.lineHeight));
    }
  }, [settings]);

  const antdLocale = useMemo(() => {
    return locale === "vi" ? viVN : enUS;
  }, [locale]);

  const value = useMemo(
    () => ({ theme: themeConfig, settings }),
    [themeConfig, settings]
  );

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
