/**
 * Validation utilities
 */

import { message } from 'antd';
import type { ValidationRule } from '../types/common';

/**
 * Check if a string is a valid hex color
 */
export const isHexColor = (value?: string | null): boolean => {
  if (!value) return false;
  const v = value.trim();
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
};

/**
 * Check if a string is a valid URL or hash anchor
 */
export const isUrlOrHash = (value?: string | null): boolean => {
  if (!value) return false;
  const v = value.trim();
  if (v.startsWith('#')) return v.length > 1;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a string is a valid email
 */
export const isEmail = (value?: string | null): boolean => {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

/**
 * Check if a string is a valid phone number (Vietnamese format)
 */
export const isPhoneNumber = (value?: string | null): boolean => {
  if (!value) return false;
  const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
  return phoneRegex.test(value.replace(/\s/g, ''));
};

/**
 * Validate string length
 */
export const validateLength = (
  value: string,
  min?: number,
  max?: number
): boolean => {
  const length = value.trim().length;
  if (min !== undefined && length < min) return false;
  if (max !== undefined && length > max) return false;
  return true;
};

/**
 * Validate number range
 */
export const validateRange = (
  value: number,
  min?: number,
  max?: number
): boolean => {
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => {
    if (type.includes('*')) {
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType);
    }
    return file.type === type;
  });
};

/**
 * Common validation constants
 */
export const VALIDATION_LIMITS = {
  LABEL_MAX: 60,
  CTA_LABEL_MAX: 30,
  LINK_MAX: 200,
  TITLE_MAX: 200,
  DESCRIPTION_MAX: 1000,
  UPLOAD_SIZE_LIMIT: 5 * 1024 * 1024, // 5 MB
  LOGO_WIDTH_MIN: 40,
  LOGO_WIDTH_MAX: 800,
  LOGO_HEIGHT_MIN: 20,
  LOGO_HEIGHT_MAX: 600,
} as const;

/**
 * Create validation rule for Ant Design Form
 */
export const createFormRule = (rule: ValidationRule) => {
  const formRule: any = {};

  if (rule.required) {
    formRule.required = true;
    formRule.message = rule.message || 'Trường này là bắt buộc';
  }

  if (rule.minLength !== undefined) {
    formRule.min = rule.minLength;
    formRule.message = rule.message || `Tối thiểu ${rule.minLength} ký tự`;
  }

  if (rule.maxLength !== undefined) {
    formRule.max = rule.maxLength;
    formRule.message = rule.message || `Tối đa ${rule.maxLength} ký tự`;
  }

  if (rule.min !== undefined) {
    formRule.min = rule.min;
    formRule.message = rule.message || `Giá trị tối thiểu là ${rule.min}`;
  }

  if (rule.max !== undefined) {
    formRule.max = rule.max;
    formRule.message = rule.message || `Giá trị tối đa là ${rule.max}`;
  }

  if (rule.pattern) {
    formRule.pattern = rule.pattern;
    formRule.message = rule.message || 'Định dạng không hợp lệ';
  }

  if (rule.validator) {
    formRule.validator = (_: any, value: any) => {
      const result = rule.validator!(value);
      if (result === true) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(typeof result === 'string' ? result : 'Giá trị không hợp lệ'));
    };
  }

  return formRule;
};

/**
 * Show validation error message
 */
export const showValidationError = (error: string) => {
  message.error(error);
};

/**
 * Validate hex color and show error if invalid
 */
export const validateHexColor = (value: string, label: string): boolean => {
  if (!value) return true; // Optional field
  if (!isHexColor(value)) {
    showValidationError(`${label} không hợp lệ. Vui lòng dùng mã màu dạng #RRGGBB.`);
    return false;
  }
  return true;
};

/**
 * Validate URL or hash and show error if invalid
 */
export const validateUrlOrHash = (value: string, label: string, maxLength?: number): boolean => {
  if (!value) return true; // Optional field
  if (!isUrlOrHash(value)) {
    showValidationError(`${label} phải là URL hợp lệ (https://...) hoặc anchor bắt đầu bằng "#".`);
    return false;
  }
  if (maxLength && value.length > maxLength) {
    showValidationError(`${label} không được vượt quá ${maxLength} ký tự.`);
    return false;
  }
  return true;
};

