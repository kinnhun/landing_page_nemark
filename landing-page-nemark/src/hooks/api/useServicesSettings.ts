import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '@/utils/api';
import type { ServicesSettings } from '@/types/services';

const QUERY_KEYS = {
  servicesSettings: ['settings', 'services'] as const,
};

export const useServicesSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.servicesSettings,
    queryFn: () => apiGet<ServicesSettings>('/api/settings/services'),
    staleTime: 1000 * 60 * 2,
  });
};

export const useUpdateServicesSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: ServicesSettings) =>
      apiPost<ServicesSettings>('/api/settings/services', settings),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.servicesSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.servicesSettings });
    },
  });
};

export const useResetServicesSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<ServicesSettings>('/api/settings/services/reset', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.servicesSettings, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.servicesSettings });
    },
  });
};

