import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SnackbarProvider} from 'notistack';
import {ThemeProvider} from '@mui/material';

import App from './App';
import {MutationErrorHandler, queryErrorHandler} from './reactQuery/handlers';
import {theme} from './theme/theme';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
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
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}>
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
