/**
 * React Query hooks for Header Settings API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '@/utils/api';
import type { HeaderSettings } from '@/types/header';

const QUERY_KEYS = {
  headerSettings: ['settings', 'header'] as const,
};

/**
 * Get header settings
 */
export const useHeaderSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.headerSettings,
    queryFn: () => apiGet<HeaderSettings>('/api/settings/header'),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

/**
 * Update header settings
 */
export const useUpdateHeaderSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: HeaderSettings) =>
      apiPost<HeaderSettings>('/api/settings/header', settings),
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(QUERY_KEYS.headerSettings, data);
      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.headerSettings });
      
      // Notify other tabs/windows
      try {
        localStorage.setItem('header_settings_updated', String(Date.now()));
        window.dispatchEvent(new Event('header_settings_updated'));
        
        const channel = new BroadcastChannel('app_settings_channel');
        channel.postMessage('header-updated');
        channel.close();
      } catch {
        // Ignore
      }
    },
  });
};

/**
 * Reset header settings to default
 */
export const useResetHeaderSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiPost<HeaderSettings>('/api/settings/header/reset', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.headerSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.headerSettings });
    },
  });
};

