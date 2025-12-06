// Portfolio-related TypeScript types

export type PortfolioCategory = {
  key: string;
  label: string;
};

export type PortfolioItem = {
  id: number | string;
  category: string;
  title: string;
  desc: string;
  img: string; // URL or path to image
  link?: string; // Optional external link
  enabled?: boolean; // Show/hide item
};

export type PortfolioSettings = {
  title?: string;
  description?: string;
  categories?: PortfolioCategory[];
  items?: PortfolioItem[];
  // Display settings
  visible?: boolean; // Show/hide entire section
  columns?: number; // Grid columns (1-4)
  showFilter?: boolean; // Show/hide filter buttons
  // Styling
  backgroundColor?: string;
  textColor?: string;
  // Animation
  enableAnimation?: boolean;
};

