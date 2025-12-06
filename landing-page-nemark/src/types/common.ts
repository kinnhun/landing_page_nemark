/**
 * Common types used across the application
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Common form field validation rules
 */
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  validator?: (value: unknown) => boolean | string;
}

/**
 * File upload constraints
 */
export interface UploadConstraints {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
}

