// Team-related TypeScript types

export type TeamMemberSocial = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  [key: string]: string | undefined; // Allow other social platforms
};

export type TeamMember = {
  id: number | string;
  name: string;
  position: string;
  bio: string;
  avatar: string; // URL or path to image
  social?: TeamMemberSocial;
  enabled?: boolean; // Show/hide member
  // Styling
  avatarBorderColor?: string;
  positionColor?: string; // Color for position text
};

export type TeamSettings = {
  title?: string;
  description?: string;
  members?: TeamMember[];
  // Display settings
  visible?: boolean; // Show/hide entire section
  columns?: number; // Grid columns (1-2, default 2)
  // Styling
  backgroundColor?: string;
  textColor?: string;
  // Animation
  enableAnimation?: boolean;
};

