import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import "@/translations/i18n";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider, plPL } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import utc from "dayjs/plugin/utc";
import type { AppProps } from "next/app";
dayjs.extend(utc);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateLibInstance={dayjs.utc}
        dateAdapter={AdapterDayjs}
        adapterLocale="pl"
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
