export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export interface ServicesSettings {
  title: string;
  description: string;
  items: ServiceItem[];
  lastUpdated?: number;
}
