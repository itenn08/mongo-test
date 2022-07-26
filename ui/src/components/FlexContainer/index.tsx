import {ReactNode} from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
  containerStyle?: {[key: string]: any};
}

export const FlexContainer = ({children, containerStyle}: Props) => (
  <Box
    sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      ...containerStyle,
    }}>
    {children}
  </Box>
);
