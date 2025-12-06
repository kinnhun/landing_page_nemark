export interface CtaBackground {
  type: 'solid' | 'gradient';
  gradientFrom: string;
  gradientTo: string;
  opacity: number;
}

export interface CtaOverlay {
  enabled: boolean;
  opacity: number;
}

export interface CtaButton {
  label: string;
  link: string;
  visible: boolean;
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
}

export interface CtaSettings {
  title: string;
  description: string;
  backgroundImage: string;
  background: CtaBackground;
  overlay: CtaOverlay;
  button: CtaButton;
  lastUpdated?: number;
}
