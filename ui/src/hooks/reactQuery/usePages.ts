import {useMutation, useQuery, useQueryClient} from 'react-query';

import {paramsSerializer, axiosClient} from '../../utils/axios';
import {useSnackbar} from '../useSnackbar';
import {queryKeys as qks, queryKeys} from '../../reactQuery/constants';
import {BASE_URL} from '../../config';
import {Page, PageUpdateForm} from '../../types/pages';
import {Resource, StringValue} from '../../types/misc';
import {NewPageModel} from '../../pages/NewPage/model';

export const getPages = async (params: any) => {
  const response = await axiosClient.get<Resource<Page>>(`${BASE_URL}/page/`, {
    params,
    paramsSerializer,
  });
  return response.data;
};

export const useQueryPages = (params?: any, options?: any) =>
  useQuery(
    [qks.getPages, params],
    () =>
      getPages({
        ...params,
      }),
    {
      ...options,
    },
  );

export const usePages = () => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();

  const updatePage = async (
    data: PageUpdateForm,
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.patch(`${BASE_URL}/page/${id}`, data);

      if (status === 200) {
        enqueueSnackbar(`Page ${id} updated successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getPages);
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

  const deletePage = async (
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.delete(`${BASE_URL}/page/${id}`);

      if (status === 200) {
        enqueueSnackbar(`Page has been deleted successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getPages);
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
    updatePage,
    deletePage,
  };
};

const createPage = async (body: NewPageModel): Promise<StringValue> => {
  const response = await axiosClient.post<StringValue>(`${BASE_URL}/page/`, {
    ...body,
  });
  return response.data;
};

export const useCreatePage = (successMsg: string) => {
  const {enqueueSnackbar} = useSnackbar();
  return useMutation((body: NewPageModel) => createPage(body), {
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
