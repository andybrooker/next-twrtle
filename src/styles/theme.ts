import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    p: React.CSSProperties,
    large: React.CSSProperties,
    medium: React.CSSProperties,
    small: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    p?: React.CSSProperties,
    large?: React.CSSProperties,
    medium?: React.CSSProperties,
    small?: React.CSSProperties
  }

  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    p: true,
    large: true,
    medium: true,
    small: true
  }
}

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: [
      'halyard-display',
      'p22-mackinac-pro',
    ].join(','),
    h1: {
      fontFamily: 'p22-mackinac-pro',
      fontSize: '44px',
      fontWeight: '500'
    },
    h2: {
      fontFamily: 'p22-mackinac-pro',
      fontSize: '32px',
      fontWeight: '500'
    },
    p: {
      fontWeight: '300'
    },
    h3: {
      fontSize: '24px',
      fontWeight: '500',
      fontFamily: 'p22-mackinac-pro'
    },
    large: {
      fontSize: '19px',
      fontWeight: 400
    },
    medium: {
      fontSize: '16px',
      fontWeight: 300
    },
    small: {
      fontSize: '14px',
      fontWeight: 300
    }
  },
  palette: {
    primary: {
      main: '#1DA1F2',
      contrastText: '#FFF',
      lighter: 'rgba(74, 179, 244, 0.5)'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  }
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: grey.A700,
          "&.Mui-selected": {
            color: "black"
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
        }
      }
    }
  }
})

export default theme;