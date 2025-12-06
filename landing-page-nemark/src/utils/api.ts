/**
 * API utility functions
 */

import { API_BASE_URL } from '../types/api';
import type { ApiResponse, ApiError } from '../types/common';
import type { FetchOptions } from '../types/api';

/**
 * Build URL with query parameters
 */
const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean>): string => {
  const url = new URL(endpoint, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

/**
 * Handle API response
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    let errors: Record<string, string[]> | undefined;

    if (isJson) {
      try {
        const errorData = (await response.json()) as ApiError;
        errorMessage = errorData.message || errorMessage;
        errors = errorData.errors;
      } catch {
        // Ignore JSON parse errors
      }
    }

    const error: ApiError = {
      message: errorMessage,
      errors,
    };
    throw error;
  }

  if (isJson) {
    const json = (await response.json()) as ApiResponse<T>;
    return json.data;
  }

  return (await response.text()) as unknown as T;
};

/**
 * Generic fetch function with error handling
 */
export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(endpoint, params);

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw error;
  }
};

/**
 * GET request
 */
export const apiGet = <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      ...options?.headers,
    },
  });
};

/**
 * POST request
 */
export const apiPost = <T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PUT request
 */
export const apiPut = <T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * DELETE request
 */
export const apiDelete = <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
};

/**
 * Upload file
 */
export const apiUpload = async (endpoint: string, file: File, fieldName = 'image'): Promise<string> => {
  const formData = new FormData();
  formData.append(fieldName, file);

  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const result = await handleResponse<{ url: string }>(response);
  let fileUrl = result.url;

  // If the URL is relative, prepend the API base URL
  if (fileUrl.startsWith('/')) {
    fileUrl = `${API_BASE_URL}${fileUrl}`;
  }

  return fileUrl;
};

