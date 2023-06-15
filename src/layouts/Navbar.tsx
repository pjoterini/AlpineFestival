import { logoutUser } from '@/firebase/auth/logoutUser';
import { auth } from '@/firebase/config';
import { Box, Button, Stack, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../assets/logo.png';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { HOME, LANDING_PAGE, LOGIN_FORM } from '@/constants/routes';

export const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.push(HOME);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        padding: { xs: 1, sm: 0 },
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: { xs: 'flex-end', sm: 'space-between' },
          }}
        >
          <Box py={1} display={{ xs: 'none', sm: 'flex' }}>
            <Link href={LANDING_PAGE}>
              <Image
                src={logo}
                width={180}
                height={65}
                alt="Festival logo"
                priority
              />
            </Link>
          </Box>
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 4 }}
            alignItems={{ xs: 'center' }}
          >
            {user && !loading && (
              <>
                <Link href={HOME}>
                  <Button color="primary">
                    {t('common.guestRegistration')}
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button color="primary">{t('common.adminPanel')}</Button>
                </Link>
                <Typography
                  color="primary"
                  display={{ xs: 'none', md: 'flex' }}
                >
                  {t('common.hello')} {user.email}
                </Typography>
                <Button variant="outlined" onClick={logout}>
                  {t('common.logout')}
                </Button>
              </>
            )}
            {!user && !loading && (
              <Button variant="outlined">
                <Link href={LOGIN_FORM}>{t('common.organizer')}</Link>
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
