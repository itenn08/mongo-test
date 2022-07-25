/* import { createTheme } from "@mui/material/styles"; */

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#457892",
      main: "#0F4C64",
      dark: "#00243A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#6CFFFF",
      main: "#00D1FF",
      dark: "#00A0CC",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#222B45",
      secondary: "#8F9BB3",
      disabled: "rgba(143, 155, 179, 0.5)",
    },
    action: {
      active: "#8F9BB3",
      hover: "rgba(0, 209, 255, 0.04)",
      selected: "rgba(0, 209, 255, 0.08)",
      disabled: "rgba(143, 155, 179, 0.5)",
      disabledBackground: "rgba(34, 43, 69, 0.12)",
      focus: "rgba(34, 43, 69, 0.12)",
    },
    error: {
      light: "#FF605A",
      main: "#FF182F",
      dark: "#C30006",
      contrastText: "#FFFFFF",
    },
    info: {
      light: "#64B6F7",
      main: "#2196F3",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    warning: {
      light: "#FFB400",
      main: "#ED6C02",
      dark: "#C77700",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#61FFC0",
      main: "#00D68F",
      dark: "#00A361",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F2F6F8",
    },
    divider: "#F3F5F6",
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['"Open Sans"', "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 400,
      fontSize: "3.052rem",
      lineHeight: 1.16,
      letterSpacing: "-1.5px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.441rem",
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.953rem",
      lineHeight: "56.02px",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.563rem",
      lineHeight: 1.25,
      letterSpacing: "0.25px",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.33,
      letterSpacing: "-1.5px",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.15px",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.1px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.15px",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.15px",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.4px",
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "1px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
      variants: [
        {
          props: { size: "large" },
          style: {
            fontWeight: 600,
            fontSize: "0.9375rem",
            lineHeight: 1.73,
            letterSpacing: "0.15px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            fontWeight: 600,
            fontSize: "0.9375rem",
            lineHeight: 1.66,
            letterSpacing: "0.4px",
          },
        },
        {
          props: { size: "small" },
          style: {
            fontWeight: 600,
            fontSize: "0.8125rem",
            lineHeight: 1.69,
            letterSpacing: "0.46px",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            background: "rgba(15, 76, 100, 0.08)",
            border: "1px solid rgba(15, 76, 100, 0.5)",
            boxSizing: "border-box",
            borderRadius: "4px",
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "0.75rem",
          lineHeight: 2,
          letterSpacing: "0.15px",

          "& .MuiInputLabel-asterisk": {
            color: "red",
          },
        },
        shrink: {
          transform: "translate(14px, -11px) scale(1) !important",
        },
        outlined: {
          transform: "translate(14px, 10px) scale(1)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.4px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "0.15px",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "1.25rem",
          lineHeight: 1,
          letterSpacing: "0.14px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "linear-gradient(180deg, #095369 0%, #043146 100%)",
          color: "#fff",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "#457892",
            boxSizing: "border-box",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#222B45",
          },
        },
      },
    },
  },
});
