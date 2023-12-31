import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
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
