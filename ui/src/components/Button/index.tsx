import { ReactNode } from "react";
import MuiButton, { ButtonProps } from "@mui/material/Button";

interface Props {
  label?: string;
  children?: ReactNode;
  style?: { [key: string]: any };
  buttonProps?: ButtonProps;
  disabled?: boolean;
}

export const Button = ({
  label,
  children,
  style,
  buttonProps,
  disabled,
}: Props) => (
  <MuiButton
    disabled={disabled}
    disableRipple
    disableFocusRipple
    disableElevation
    variant="text"
    size="small"
    sx={{
      ...style,
    }}
    {...buttonProps}
  >
    {children || label}
  </MuiButton>
);
