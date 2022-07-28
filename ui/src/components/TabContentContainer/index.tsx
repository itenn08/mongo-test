import Box from '@mui/material/Box';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export const TabContentContainer = ({children}: Props) => (
  <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
    {children}
  </Box>
);
