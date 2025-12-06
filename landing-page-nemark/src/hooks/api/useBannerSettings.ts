/**
 * React Query hooks for Banner Settings API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '@/utils/api';
import type { BannerSettings } from '@/types/banner';

const QUERY_KEYS = {
  bannerSettings: ['settings', 'banner'] as const,
};

export const useBannerSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.bannerSettings,
    queryFn: () => apiGet<BannerSettings>('/api/settings/banner'),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUpdateBannerSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: BannerSettings) =>
      apiPost<BannerSettings>('/api/settings/banner', settings),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.bannerSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bannerSettings });
    },
  });
};

export const useResetBannerSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiPost<BannerSettings>('/api/settings/banner/reset', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.bannerSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bannerSettings });
    },
  });
};

