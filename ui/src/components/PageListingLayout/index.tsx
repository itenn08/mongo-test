import {ReactNode} from 'react';
import Box from '@mui/material/Box';

import {FlexContainer} from '../FlexContainer';

interface Props {
  children: ReactNode;
  renderWidget?: JSX.Element;
}

export const PageListingLayout = ({children, renderWidget}: Props) => (
  <FlexContainer>
    <Box display="flex" justifyContent="space-between">
      {renderWidget || null}
    </Box>
    {children}
  </FlexContainer>
);
