// Pricing-related TypeScript types

export type PricingFeature = {
  id?: string | number;
  text: string;
  included: boolean; // true = có, false = không có (line-through)
};

export type PricingPackage = {
  id: string | number;
  title: string;
  description: string;
  price: number; // Số tiền (không có dấu phẩy)
  priceUnit?: string; // "/ tháng", "/ năm", etc.
  currency?: string; // "₫", "$", etc.
  buttonText: string;
  buttonLink?: string;
  buttonSubtext?: string;
  features: PricingFeature[];
  popular?: boolean; // Highlight package này
  enabled?: boolean; // Show/hide package
  // Styling
  borderColor?: string; // Màu border cho popular package
  scale?: number; // Scale cho popular package (1.05 = 105%)
};

export type PricingSettings = {
  title?: string;
  description?: string;
  packages?: PricingPackage[];
  // Display settings
  visible?: boolean; // Show/hide entire section
  columns?: number; // Grid columns (1-4, default 3)
  // Styling
  backgroundColor?: string;
  textColor?: string;
  // Animation
  enableAnimation?: boolean;
};

