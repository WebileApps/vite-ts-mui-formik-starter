import { red } from '@mui/material/colors';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface PaletteColor {
    main: string;
    dark: string;
    light: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface TypeText {
    primary: string;
    primaryDark: string;
    secondary: string;
    secondaryDark: string;
    disabled: string;
    disabledLight: string;
    lightPrimary: string;
    themePrimary: string;
    blackPrimary: string;
    blackSecondary: string;
    loginText: string;
    dialogTitle: string;
    dialogMailText: string;
    profileGreen: string;
    spinnerText: string;
    resendOtp: string;
    sectionLabel: string;
    riskLabelText: string;
    dividerLight: string;
    activeLink: string;
  }
  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
  interface PaletteColorOptions {
    main?: string;
    dark?: string;
    light?: string;
  }
}

export function AppThemeContextProvider({ children }: { children: React.ReactNode }) {
  const primaryText = '#011E33';
  const lightText = '#FFFFFF';
  const mainTheme = '#163869';
  const blackText = '#000000';
  const defaultTheme = createTheme();
  defaultTheme.shadows.pop();
  defaultTheme.shadows.pop();
  defaultTheme.shadows.push('0px 2px 2px rgba(0, 0, 0, 0.2)');
  defaultTheme.shadows.push('0px 2px 24px rgba(0, 0, 0, 0.08)');
  const theme = createTheme({
    shadows: [...defaultTheme.shadows],
    palette: {
      background: {
        default: '#EFF3FE',
      },
      primary: {
        main: mainTheme,
        light: lightText,
        dark: blackText,
      },
      error: {
        main: red.A400,
        dark: '#CB1919',
        light: '#CB3833',
      },
      text: {
        primary: primaryText,
        primaryDark: alpha(primaryText, 0.9),
        secondary: alpha(primaryText, 0.8),
        secondaryDark: alpha(primaryText, 0.7),
        disabled: alpha(primaryText, 0.6),
        disabledLight: alpha(primaryText, 0.2),
        lightPrimary: alpha(lightText, 0.9),
        themePrimary: alpha(mainTheme, 0.8),
        blackPrimary: alpha(blackText, 0.9),
        blackSecondary: alpha(blackText, 0.7),
        loginText: 'rgba(40, 40, 40, 0.9)',
        dialogTitle: '#344B5C',
        dialogMailText: '#0898FC',
        profileGreen: '#10FFC6',
        spinnerText: '#0595FD',
        resendOtp: '#0596FD',
        sectionLabel: '#2057A6',
        riskLabelText: '#303030',
        dividerLight: 'rgba(188, 194, 231, 0.22)',
        activeLink: 'rgb(227, 230, 248, 0.3)',
      },
      divider: 'rgba(1, 30, 51, 0.2)',
    },
    typography: {
      fontFamily: ['Roboto', 'Nunito', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: primaryText,
          },
          h4: {
            fontSize: 24,
            color: primaryText,
            fontWeight: 600,
            [defaultTheme.breakpoints.down('md')]: {
              fontSize: 22,
              lineHeight: '24px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'unset',
            borderRadius: '3px',
            fontSize: 18,
            paddingTop: 10,
            paddingBottom: 10,
          },
          containedPrimary: {
            background: 'linear-gradient(90.45deg, #1EB1F3 0.32%, #0090FF 99.62%)',
          },
          outlinedPrimary: {
            background: lightText,
            border: '1px solid #0899FC',
            '&:hover': {
              border: '1px solid #0899FC',
              backgroundColor: lightText,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#16A8F7',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: 'rgba(0, 128, 255, 1)',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': { color: '#0495FE' },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              color: '#2AC9EE',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: '#677885',
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
