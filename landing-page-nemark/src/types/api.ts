/**
 * API-related types
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

