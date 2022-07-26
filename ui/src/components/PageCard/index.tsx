import {ReactNode} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';

export interface Props {
  children: ReactNode;
  headerStyles?: {[key: string]: string | number};
  headerTextOverrideStyles?: {[key: string]: string | number};
  headerActionIcon?: JSX.Element;
  minHeight?: number | string;
  headerLabel?: string;
  customHeader?: JSX.Element;
  containerStyles?: {[key: string]: any};
  contentContainerStyles?: {[key: string]: any};
  handleAction?: () => void;
}

export const PageCard = ({
  children,
  headerLabel = '',
  containerStyles,
  headerStyles,
  headerTextOverrideStyles,
  headerActionIcon,
  minHeight,
  customHeader,
  contentContainerStyles,
  handleAction = () => {},
}: Props) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        minHeight,
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
        ...containerStyles,
      }}>
      {customHeader || headerLabel ? (
        <CardHeader
          sx={{
            minHeight: '2rem',
            mt: '1em',
            mx: '0.5em',
            ...headerStyles,
          }}
          action={
            headerActionIcon ? (
              <IconButton onClick={handleAction} aria-label="settings">
                {headerActionIcon}
              </IconButton>
            ) : null
          }
          title={
            customHeader || (
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  ...headerTextOverrideStyles,
                }}>
                {headerLabel}
              </Typography>
            )
          }
        />
      ) : null}

      <CardContent
        sx={{
          mx: '0.5em',
          ...contentContainerStyles,
        }}>
        {children}
      </CardContent>
    </Card>
  );
};
