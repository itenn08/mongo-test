import {useQuery, useQueryClient} from 'react-query';

import {paramsSerializer, axiosClient} from '../../utils/axios';
import {useSnackbar} from '../useSnackbar';
import {queryKeys as qks, queryKeys} from '../../reactQuery/constants';
import {BASE_URL} from '../../config';
import {Category, CategoryFetch, UpdateCategory} from '../../types/categories';

export const getCategories = async (params: any) => {
  const response = await axiosClient.get<CategoryFetch>(
    `${BASE_URL}/category/`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const useQueryCategories = (params?: any, options?: any) =>
  useQuery(
    [qks.getCategories, params],
    () =>
      getCategories({
        ...params,
      }),
    {
      ...options,
    },
  );

export const getCategoriesByName = async (params: any) => {
  const response = await axiosClient.get<CategoryFetch>(
    `${BASE_URL}/category/search`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const useSearchCategoryByName = (params?: any, options?: any) =>
  useQuery(
    [qks.getCategories, params],
    () =>
      getCategoriesByName({
        ...params,
      }),
    {
      ...options,
    },
  );

export const getCategoriesById = async (id: string, params?: any) => {
  const response = await axiosClient.get<Category>(
    `${BASE_URL}/category/${id}`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const useSearchCategoryById = (
  id: string,
  params?: any,
  options?: any,
) =>
  useQuery(
    [qks.getCategories, params],
    () =>
      getCategoriesById(id, {
        ...params,
      }),
    {
      ...options,
    },
  );

export const useCategories = () => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();

  const updateCategory = async (
    data: UpdateCategory,
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.patch(
        `${BASE_URL}/category/${id}`,
        data,
      );

      if (status === 200) {
        enqueueSnackbar(`Category ${id} updated successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getCategories);
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

  const deleteCategory = async (
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.delete(`${BASE_URL}/category/${id}`);

      if (status === 200) {
        enqueueSnackbar(`Category has been deleted successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getCategories);
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

  const updateAllCategories = async (
    data: Category[],
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.patch(`${BASE_URL}/category`, data);

      if (status === 200) {
        enqueueSnackbar(`Categories updated successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getCategories);
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

  const createCategory = async (
    data: UpdateCategory,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.post(`${BASE_URL}/category`, data);

      if (status === 201) {
        enqueueSnackbar(`Categories created successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getCategories);
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
    updateCategory,
    deleteCategory,
    updateAllCategories,
    createCategory,
  };
};
