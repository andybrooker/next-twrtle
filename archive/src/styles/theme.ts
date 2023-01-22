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
      'Satoshi',
      'Clash Grotesk',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Clash Grotesk',
      fontSize: '44px',
      fontWeight: '600'
    },
    h2: {
      fontFamily: 'Clash Grotesk',
      fontSize: '32px',
      fontWeight: '500'
    },
    p: {
      fontWeight: '400'
    },
    h3: {
      fontSize: '24px',
      fontWeight: '500',
      fontFamily: 'Clash Grotesk'
    },
    large: {
      fontSize: '19px',
      fontWeight: 500
    },
    medium: {
      fontSize: '15px',
      fontWeight: 400,
      '@media (max-width:600px)': {
        fontSize: '14px'
      }
    },
    small: {
      fontSize: '13px',
      fontWeight: 400,
      '@media (max-width:600px)': {
        fontSize: '12px'
      }
    },
    micro: {
      fontSize: '10px'
    }
  },
  palette: {
    primary: {
      main: '#1DA1F2',
      contrastText: '#FFF',
      lighter: 'rgba(74, 179, 244, 0.5)'
    },
    secondary: {
      main: '#000',
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