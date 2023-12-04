import Layout from '@/layouts/Layout';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import '@/translations/i18n';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider, plPL } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import utc from 'dayjs/plugin/utc';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import favicon from '/public/favicon.ico';
dayjs.extend(utc);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
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
        <Provider store={store}>
          <Layout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="shortcut icon" href={favicon.src} sizes="any" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
