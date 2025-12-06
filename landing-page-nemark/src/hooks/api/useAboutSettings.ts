import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '@/utils/api';
import type { AboutSettings } from '@/types/about';

const QUERY_KEYS = {
  aboutSettings: ['settings', 'about'] as const,
};

export const useAboutSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.aboutSettings,
    queryFn: () => apiGet<AboutSettings>('/api/settings/about'),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUpdateAboutSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: AboutSettings) =>
      apiPost<AboutSettings>('/api/settings/about', settings),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.aboutSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.aboutSettings });
    },
  });
};

export const useResetAboutSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<AboutSettings>('/api/settings/about/reset', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.aboutSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.aboutSettings });
    },
  });
};

