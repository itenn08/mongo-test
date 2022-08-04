import {useMutation, useQuery, useQueryClient} from 'react-query';

import {paramsSerializer, axiosClient} from '../../utils/axios';
import {useSnackbar} from '../useSnackbar';
import {queryKeys as qks, queryKeys} from '../../reactQuery/constants';
import {BASE_URL} from '../../config';
import {Resource, StringValue} from '../../types/misc';
import {Product, ProductUpdateForm} from '../../types/products';
import {NewProductModel} from '../../pages/NewProduct/model';

export const getProductById = async (id: string, params?: any) => {
  const response = await axiosClient.get<Product>(
    `${BASE_URL}/products/${id}`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const getProducts = async (params: any) => {
  const response = await axiosClient.get<Resource<Product>>(
    `${BASE_URL}/products/`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export const useQueryProducts = (params?: any, options?: any) =>
  useQuery(
    [qks.getProducts, params],
    () =>
      getProducts({
        ...params,
      }),
    {
      ...options,
    },
  );

export const useProducts = () => {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();

  const updateProduct = async (
    data: ProductUpdateForm,
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.patch(
        `${BASE_URL}/products/${id}`,
        data,
      );

      if (status === 200) {
        enqueueSnackbar(`Product ${id} updated successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getProducts);
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

  const deleteProduct = async (
    id: string,
    onSuccess?: () => void,
  ): Promise<void> => {
    try {
      const {status} = await axiosClient.delete(`${BASE_URL}/products/${id}`);

      if (status === 200) {
        enqueueSnackbar(`Product has been deleted successfully!`, {
          variant: 'success',
        });
        queryClient.invalidateQueries(queryKeys.getProducts);
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
    updateProduct,
    deleteProduct,
  };
};

const createProduct = async (body: NewProductModel): Promise<StringValue> => {
  const response = await axiosClient.post<StringValue>(
    `${BASE_URL}/products/`,
    {
      ...body,
    },
  );
  return response.data;
};

export const useCreateProduct = (successMsg: string) => {
  const {enqueueSnackbar} = useSnackbar();
  return useMutation((body: NewProductModel) => createProduct(body), {
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
