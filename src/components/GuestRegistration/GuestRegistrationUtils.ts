export const speechLengthOptions = [
  {
    value: "0-15",
    label: "less than 15",
  },
  {
    value: "15-30",
    label: "15 to 30",
  },
  {
    value: "30-45",
    label: "30 to 45",
  },
  {
    value: "45-60",
    label: "45 to 60",
  },
  {
    value: "60-75",
    label: "60 to 75",
  },
  {
    value: "75-90",
    label: "75 to 90",
  },
];

// https://mui.com/x/react-date-pickers/localization/

import { createTheme } from "@mui/material/styles";
import { deDE } from "@mui/x-date-pickers/locales";

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  deDE // use 'de' locale for UI texts (start, next month, ...)
);
