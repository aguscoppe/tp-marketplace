import { createTheme } from '@mui/material';

export const theme = createTheme({
  a: {
    textDecoration: 'none',
  },
  typography: {
    body1: {
      '@media (max-width: 700px)': {
        fontSize: '12px',
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          '@media (max-width: 700px)': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          '@media (max-width: 700px)': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          '@media (max-width: 700px)': {
            fontSize: '12px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
        },
      },
    },
    input: {
      fontFamily: 'Montserrat',
    },
    a: {
      textDecoration: 'none',
    },
  },
});
