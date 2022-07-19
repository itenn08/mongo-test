import { paramsSerializer } from "./../../utils/axios";
import { useQuery, useQueryClient } from "react-query";
import { User, UserUpdateForm } from "../../types/users";
import { axiosClient } from "../../utils/axios";
import { useSnackbar } from "../useSnackbar";
import { queryKeys as qks, queryKeys } from "../../reactQuery/constants";
import { BASE_URL } from "../../config";

export const getUsers = async (params: any) => {
  const response = await axiosClient.get<User[]>(`${BASE_URL}/user/getAll`, {
    params,
    paramsSerializer,
  });
  return response.data;
};

export const useQueryUsers = (params?: any, options?: any) => {
  return useQuery(
    [qks.getUsers, params],
    () =>
      getUsers({
        ...params,
      }),
    {
      ...options,
    }
  );
};

export const useUsers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const updateUser = async (
    data: UserUpdateForm,
    email: string,
    onSuccess?: () => void
  ): Promise<void> => {
    try {
      const { status } = await axiosClient.put(`/user/${email}`, data);

      if (status === 200) {
        enqueueSnackbar(`User ${data.email} updated successfully!`, {
          variant: "success",
        });
        queryClient.invalidateQueries(queryKeys.getUsers);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(
        error.response?.message ||
          "Sorry! Unable to save changes right now. Please try again.",
        {
          variant: "error",
        }
      );
    }
  };

  const deleteUser = async (
    id: string,
    onSuccess?: () => void
  ): Promise<void> => {
    try {
      const { status } = await axiosClient.delete(`${BASE_URL}/user/${id}`);

      if (status === 200) {
        enqueueSnackbar(`User has been deleted successfully!`, {
          variant: "success",
        });
        queryClient.invalidateQueries(queryKeys.getUsers);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(
        error.response?.message ||
          "Sorry! Unable to save changes right now. Please try again.",
        {
          variant: "error",
        }
      );
    }
  };

  return {
    updateUser,
    deleteUser,
  };
};
