import { createTheme } from "@mui/material/styles";
import { plPL } from "@mui/x-date-pickers/locales";

// THEME FOR DATE PICKERS
// https://mui.com/x/react-date-pickers/localization/

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  plPL // use 'de' locale for UI texts (start, next month, ...)
);
