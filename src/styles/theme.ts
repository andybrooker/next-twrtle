import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import React from 'react';

declare module '@mui/material/styles' {
  
  interface MUICSSProperties extends React.CSSProperties {
     '@media (max-width:600px)': React.CSSProperties
  }
  interface TypographyVariants {
    p: React.CSSProperties,
    large: React.CSSProperties,
    medium: MUICSSProperties,
    small: MUICSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    p?: React.CSSProperties,
    large?: React.CSSProperties,
    medium?: MUICSSProperties,
    small?: MUICSSProperties,
    micro?: React.CSSProperties
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
      fontWeight: 300,
      '@media (max-width:600px)': {
        fontSize: '15px'
      }
    },
    small: {
      fontSize: '14px',
      fontWeight: 300,
      '@media (max-width:600px)': {
        fontSize: '13px'
      }
    },
    micro: {
      fontSize: '11px'
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
  },
});

const shadowColor = '0deg 0% 63%'

theme.shadows[1] = `0.3px 0.5px 0.7px hsl(${shadowColor} / 0.34),
0.4px 0.8px 1px -1.2px hsl(${shadowColor} / 0.34),
1px 2px 2.5px -2.5px hsl(${shadowColor} / 0.34)`

theme.shadows[2] = `0.3px 0.5px 0.7px hsl(${shadowColor} / 0.36),
0.8px 1.6px 2px -0.8px hsl(${shadowColor} / 0.36),
2.1px 4.1px 5.2px -1.7px hsl(${shadowColor} / 0.36),
5px 10px 12.6px -2.5px hsl(${shadowColor} / 0.36)`

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