import AccommodationFormContainer from '@/components/AccommodationForm/AccommodationForm.container';
import { t } from 'i18next';
import Head from 'next/head';

const UserForm = () => {
  return (
    <>
      <Head>
        <title>{t('accommodationForm.accommodationForm')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccommodationFormContainer />
    </>
  );
};

export default UserForm;
