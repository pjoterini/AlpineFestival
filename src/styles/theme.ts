import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main:
        // '#cf2e2e',
        '#000000',
    },
  },
  typography: {
    // fontSize:
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
        },
      },
    },
  },
});
