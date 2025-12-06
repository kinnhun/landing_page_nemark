export type BannerOverlay = {
  enabled: boolean;
  fromColor: string;
  toColor: string;
  opacity: number;
};

export type BannerCTA = {
  label: string;
  link: string;
  visible: boolean;
};

export type BannerSettings = {
  title: string;
  description: string;
  backgroundImage: string;
  overlay: BannerOverlay;
  cta: BannerCTA;
};
