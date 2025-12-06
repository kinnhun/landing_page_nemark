// Contact-related TypeScript types

export type ContactInfo = {
  id: number | string;
  type: 'address' | 'phone' | 'email' | 'custom'; // Type of contact info
  label: string; // e.g., "Địa Chỉ", "Hotline", "Email"
  value: string; // e.g., "Hà Nội, Việt Nam", "0123456789", "contact@nemark.vn"
  icon?: string; // Icon name (optional, defaults based on type)
  enabled?: boolean; // Show/hide this contact info
  link?: string; // Optional link (e.g., tel:, mailto:, or URL)
};

export type ContactFormField = {
  id: number | string;
  name: string; // Field name (e.g., "name", "email", "subject", "message")
  label: string; // Display label
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  enabled?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string; // Regex pattern
  };
  options?: Array<{ value: string; label: string }>; // For select fields
};

export type ContactSettings = {
  title?: string;
  description?: string;
  contactInfo?: ContactInfo[]; // List of contact info cards
  formFields?: ContactFormField[]; // List of form fields
  googleSheetUrl?: string; // Google Sheet URL
  googleSheetTabName?: string; // Google Sheet tab name
  submitButtonText?: string;
  // Display settings
  visible?: boolean; // Show/hide entire section
  showContactInfo?: boolean; // Show/hide contact info cards
  showForm?: boolean; // Show/hide contact form
  // Layout
  contactInfoColumns?: number; // Grid columns for contact info (1-3)
  // Styling
  backgroundColor?: string;
  textColor?: string;
  // Animation
  enableAnimation?: boolean;
};

