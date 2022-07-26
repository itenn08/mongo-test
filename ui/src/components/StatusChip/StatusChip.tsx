import {ReactNode} from 'react';
import Chip from '@mui/material/Chip';

const statusWidth = {
  auto: 'auto',
  short: '6rem',
  medium: '8rem',
  long: '10rem',
};

const statusColor = {
  default: 'warning.main',
  primary: 'primary.main',
  secondary: 'secondary.main',
  error: 'error.light',
  info: 'text.secondary',
  success: 'success.main',
  warning: 'warning.light',
  'action.active': 'action.active',
};
interface Props {
  label: string | ReactNode;
  style?: {[key: string]: any};
  length?: 'short' | 'medium' | 'long' | 'auto';
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
  color?: keyof typeof statusColor;
  maxChars?: number;
}

export const StatusChip = ({
  label,
  style,
  maxChars,
  size = 'small',
  color = 'default',
  variant = 'filled',
  length = 'auto',
}: Props) => (
  <Chip
    sx={{
      bgcolor: variant === 'filled' ? statusColor[color] : undefined,
      borderColor: variant === 'outlined' ? statusColor[color] : undefined,
      color:
        variant === 'outlined' ? statusColor[color] : 'primary.contrastText',
      minWidth: maxChars ? `calc(${maxChars}ch + .5em)` : statusWidth[length],
      boxShadow: 0,
      px: '0.25em',
      ...style,
    }}
    variant={variant}
    label={label}
    size={size}
  />
);
