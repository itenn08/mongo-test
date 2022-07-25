import { AxiosError } from "axios";

import AuthStore from "../store/Auth";

export const queryErrorHandler = (error: unknown) => {
  const err = error as AxiosError;
  if (err.response?.status === 401) {
    AuthStore.logout();
    window.location.replace("/login");
  }
};

export const MutationErrorHandler = (error: unknown) => {
  const err = error as AxiosError;
  if (err.response?.status === 401) {
    window.location.replace("/login");
  }
};
