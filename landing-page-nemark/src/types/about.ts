export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSettings {
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  features: AboutFeature[];
}
