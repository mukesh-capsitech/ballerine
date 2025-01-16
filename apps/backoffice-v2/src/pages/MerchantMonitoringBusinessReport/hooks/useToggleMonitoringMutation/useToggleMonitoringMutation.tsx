import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpError } from '@/common/errors/http-error';
import {
  turnOngoingMonitoring,
  TurnOngoingMonitoringBody,
} from '@/pages/MerchantMonitoringBusinessReport/fetchers';

export const useToggleMonitoringMutation = ({
  state,
  onSuccess,
  onError,
}: {
  state: 'on' | 'off';
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      merchantId: string;
      body?: Omit<TurnOngoingMonitoringBody, 'state'>;
    }) => turnOngoingMonitoring({ merchantId: data.merchantId, body: { ...data.body, state } }),
    onSuccess: data => {
      void queryClient.invalidateQueries();

      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      if (error instanceof HttpError && error.code === 400) {
        toast.error(error.message);

        return;
      }

      onError?.(error);
    },
  });
};
