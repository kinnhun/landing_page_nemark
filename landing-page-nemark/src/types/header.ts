// Centralized header-related TypeScript types

export type MenuItem = {
  id: string;
  label: string;
  link?: string;
  enabled?: boolean;
  children?: MenuItem[];
};

export type LogoSettings = {
  url?: string;
  scrolledUrl?: string;
  width?: number;
  height?: number;
};

export type BackgroundVariant = {
  // type of background
  type?: 'solid' | 'gradient' | 'transparent';
  // for solid
  color?: string;
  // for gradient
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number; // degrees
  // common
  opacity?: number; // 0..1
  blur?: number; // px
  shadow?: boolean;
};

export type TextSettings = {
  defaultColor?: string;
  hoverColor?: string;
  activeColor?: string;
};

export type MobileSettings = {
  iconColor?: string;
  drawerBg?: string;
  textColor?: string;
};

export type CTASettings = {
  label?: string;
  link?: string;
  visible?: boolean;
};

export type SizeSettings = {
  padding?: string;
  height?: number;
};

export type HeaderSettings = {
  logo?: LogoSettings;
  // background now has separate variants for top / scrolled states
  background?: {
    initial?: BackgroundVariant;
    scrolled?: BackgroundVariant;
  };
  text?: TextSettings;
  mobile?: MobileSettings;
  cta?: CTASettings;
  size?: SizeSettings;
  menu?: { items: MenuItem[] };
};
