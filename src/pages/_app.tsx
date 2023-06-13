import { Navbar } from '@/layouts/Navbar';
import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import '@/translations/i18n';
import { ThemeProvider, Container } from '@mui/material';
import { LocalizationProvider, plPL } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import utc from 'dayjs/plugin/utc';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
dayjs.extend(utc);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <Container sx={{ py: { xs: 2, sm: 3 } }}>
        <Component {...pageProps} />
      </Container>
    );
  }

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
        <Navbar />
        <Container sx={{ py: { xs: 2, sm: 3 } }}>
          <Component {...pageProps} />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
