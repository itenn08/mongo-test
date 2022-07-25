import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { MutationErrorHandler, queryErrorHandler } from "./reactQuery/handlers";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";

import App from "./App";
import { theme } from "./theme/theme";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      onError: queryErrorHandler,
    },
    mutations: {
      onError: MutationErrorHandler,
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          maxSnack={3}
        >
          <App />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
