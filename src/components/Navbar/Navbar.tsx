import { logoutUser } from '@/firebase/auth/logoutUser';
import { auth } from '@/firebase/config';
import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.push('/');
  };

  return (
    <Stack direction="row" p={4} spacing={4} alignItems="center">
      <Link href="/">GuestRegistration / Home</Link>
      {user && !loading && (
        <>
          <Button variant="outlined" onClick={logout}>
            {t('common.logout')}
          </Button>
          <Link href="/admin">Guests Table</Link>
          <Box>hello {user.email}</Box>
        </>
      )}
      {!user && !loading && (
        <Button variant="outlined">
          <Link href="/login">{t('common.login')}</Link>
        </Button>
      )}
    </Stack>
  );
};
