import GuestFormContainer from '@/components/Guests/GuestForm/GuestForm.container';
import { t } from 'i18next';
import Head from 'next/head';

const GuestForm = () => {
  return (
    <>
      <Head>
        <title>{t('guestForm.guestForm')}</title>
      </Head>
      <GuestFormContainer />
    </>
  );
};

export default GuestForm;
