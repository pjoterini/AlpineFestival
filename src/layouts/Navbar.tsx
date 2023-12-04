import { GUEST_FORM, LANDING_PAGE, LOGIN, PANEL } from '@/constants/routes';
import { logoutUser } from '@/firebase/auth/logoutUser';
import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { Box, Button, Stack, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '/public/logo.png';
import AdminNavbar from './AdminNavbar';

export const Navbar = () => {
  const { user, loading } = useIsAdmin();
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.push(GUEST_FORM);
  };

  return (
    <AppBar position="sticky" color="default">
      <Container
        sx={{
          paddingLeft: { xs: 0, sm: 2 },
          paddingRight: { xs: 0, sm: 2, md: 4 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: { xs: 'flex-end', sm: 'space-between' },
          }}
        >
          <Link href={LANDING_PAGE}>
            <Box py={1} display={{ xs: 'none', md: 'flex' }}>
              <Image
                src={logo}
                width={180}
                height={65}
                alt="Festival logo"
                priority
              />
            </Box>
          </Link>
          <Stack
            width={{ xs: '100%' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={{ xs: 1, sm: 3 }}
            py={{ xs: 1, sm: 0 }}
            pl={{ xs: 2, sm: 0 }}
          >
            {user && !loading && (
              <>
                <Link href={GUEST_FORM}>
                  <Button color="primary">
                    {t('common.guestRegistration')}
                  </Button>
                </Link>
                <Link href={PANEL}>
                  <Button color="primary">{t('common.userPanel')}</Button>
                </Link>
                <Typography
                  color="primary"
                  display={{ xs: 'none', md: 'flex' }}
                >
                  {t('common.hello')} {user.email}
                </Typography>
                <Button
                  sx={{
                    position: { xs: 'absolute', sm: 'relative' },
                    right: { xs: 20, sm: 0 },
                    top: { xs: 5, sm: 0 },
                  }}
                  variant="outlined"
                  onClick={logout}
                >
                  {t('common.logout')}
                </Button>
              </>
            )}
            {!user && !loading && (
              <Box
                pr={{ xs: 2, sm: 0 }}
                py={{ xs: 1, sm: 0 }}
                alignSelf="flex-end"
              >
                <Link href={LOGIN}>
                  <Button variant="outlined">{t('common.organizer')}</Button>
                </Link>
              </Box>
            )}
          </Stack>
        </Toolbar>
        {router.pathname.includes(PANEL) && user && !loading && <AdminNavbar />}
      </Container>
    </AppBar>
  );
};
