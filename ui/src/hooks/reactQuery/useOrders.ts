import {useMutation, useQuery, useQueryClient} from 'react-query';

import {paramsSerializer, axiosClient} from '../../utils/axios';
import {useSnackbar} from '../useSnackbar';
import {queryKeys as qks, queryKeys} from '../../reactQuery/constants';
import {BASE_URL} from '../../config';
import {Resource, StringValue} from '../../types/misc';
import {OrderView, OrderViewForm} from '../../types/orders';

export const getOrders = async (params: any) => {
  const response = await axiosClient.get<Resource<OrderView>>(
    `${BASE_URL}/order/`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const useQueryOrders = (params?: any, options?: any) =>
  useQuery(
    [qks.getOrders, params],
    () =>
      getOrders({
        ...params,
      }),
    {
      ...options,
    },
  );

export const useOrders = () => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();

  const updateOrder = async (
    data: OrderViewForm,
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.patch(`${BASE_URL}/order/${id}`, data);

      if (status === 200) {
        enqueueSnackbar(`order ${id} updated successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getOrders);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(
        error.response?.message ||
          'Sorry! Unable to save changes right now. Please try again.',
        {
          variant: 'error',
        },
      );
    }
  };

  const deleteOrder = async (
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.delete(`${BASE_URL}/order/${id}`);

      if (status === 200) {
        enqueueSnackbar(`Order has been deleted successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getOrders);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(
        error.response?.message ||
          'Sorry! Unable to save changes right now. Please try again.',
        {
          variant: 'error',
        },
      );
    }
  };

  return {
    updateOrder,
    deleteOrder,
  };
};

const createOrder = async (body: OrderViewForm): Promise<StringValue> => {
  const response = await axiosClient.post<StringValue>(`${BASE_URL}/order/`, {
    ...body,
  });
  return response.data;
};

export const useCreateOrder = (successMsg: string) => {
  const {enqueueSnackbar} = useSnackbar();
  return useMutation((body: OrderViewForm) => createOrder(body), {
    onSuccess: () => {
      enqueueSnackbar(successMsg, {
        variant: 'success',
      });
    },
    onError: (err) => {
      console.log(err);
      enqueueSnackbar('An unexpected error occurred, please try again.', {
        variant: 'error',
      });
    },
  });
};
