import GuestFormContainer from '@/components/Guests/GuestForm/GuestForm.container';
import MainPageGuestFormContainer from '@/components/Guests/GuestForm/MainPageGuestFormContainer';
import { t } from 'i18next';
import Head from 'next/head';

const GuestForm = () => {
  return (
    <>
      <Head>
        <title>{t('guestForm.guestForm')}</title>
      </Head>
      <MainPageGuestFormContainer>
        <GuestFormContainer />
      </MainPageGuestFormContainer>
    </>
  );
};

export default GuestForm;
