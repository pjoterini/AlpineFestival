import UserRegistrationContainer from '@/components/UserRegistration/UserRegistration.container';
import { t } from 'i18next';
import Head from 'next/head';

const UserForm = () => {
  return (
    <>
      <Head>
        <title>{t('userForm.userForm')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserRegistrationContainer />
    </>
  );
};

export default UserForm;
