import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '@/utils/api';
import type { StatsSettings } from '@/types/stats';

const QUERY_KEYS = {
  statsSettings: ['settings', 'stats'] as const,
};

export const useStatsSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.statsSettings,
    queryFn: () => apiGet<StatsSettings>('/api/settings/stats'),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUpdateStatsSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: StatsSettings) =>
      apiPost<StatsSettings>('/api/settings/stats', settings),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.statsSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statsSettings });
    },
  });
};

export const useResetStatsSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<StatsSettings>('/api/settings/stats/reset', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.statsSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statsSettings });
    },
  });
};

