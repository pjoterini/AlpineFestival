import GuestRegistrationContainer from '@/components/GuestRegistration/GuestRegistration.container';
import { t } from 'i18next';
import Head from 'next/head';

const GuestForm = () => {
  return (
    <>
      <Head>
        <title>{t('guestForm.guestForm')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GuestRegistrationContainer />
    </>
  );
};

export default GuestForm;
