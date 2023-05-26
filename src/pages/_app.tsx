import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import '@/translations/i18n';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider, plPL } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Navbar } from '@/components/Navbar/Navbar';
dayjs.extend(utc);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateLibInstance={dayjs.utc}
        dateAdapter={AdapterDayjs}
        adapterLocale="pl"
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <Navbar />
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
