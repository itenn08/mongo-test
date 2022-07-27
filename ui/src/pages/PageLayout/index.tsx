import {Box} from '@mui/system';
import React, {ReactNode} from 'react';

import {AppDrawer} from '../../components/AppDrawer';
import AppTopBar from '../../components/AppTopBar';

interface Props {
  children: ReactNode;
  excludeSidebar?: boolean;
  excludeDefaultSpacing?: boolean;
  pageScrollable?: boolean;
  pageTitle?: string;
  showBackAction?: boolean;
  backBtnLabel?: string;
}

const PageLayout = ({
  children,
  excludeSidebar,
  excludeDefaultSpacing,
  pageScrollable,
  pageTitle,
  showBackAction,
  backBtnLabel,
}: Props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100vw',
      ...(pageScrollable
        ? {minHeight: '100vh', overflowY: 'scroll'}
        : {height: '98vh', overflowY: 'hidden'}),
    }}>
    <Box sx={{mx: '2.2em', my: '0.5em'}}>
      <AppTopBar
        pageTitle={pageTitle && pageTitle}
        showBackAction={showBackAction}
        backBtnLabel={backBtnLabel && backBtnLabel}
      />
    </Box>
    <Box sx={{display: 'flex', flexGrow: 1, width: '100%'}}>
      {!excludeSidebar ? <AppDrawer /> : null}
      <Box width="4.5rem" />
      <Box
        sx={{
          pt: '1em',
          mx: !excludeDefaultSpacing ? '2.2em' : null,
        }}
        display="flex"
        flexGrow="1"
        width="0"
        flexDirection="column">
        {children}
      </Box>
    </Box>
  </Box>
);

export default PageLayout;
