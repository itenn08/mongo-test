import {
  OptionsObject,
  ProviderContext,
  SnackbarMessage,
  useSnackbar as useNotistackSnackbar,
} from "notistack";

export const useSnackbar = (): ProviderContext => {
  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    useNotistackSnackbar();

  const enqueueSnackbar = (message: SnackbarMessage, options?: OptionsObject) =>
    enqueueNotistackSnackbar(message, options);

  return { enqueueSnackbar, closeSnackbar };
};
