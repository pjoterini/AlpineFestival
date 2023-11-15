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
    <AppBar
      position="sticky"
      color="default"
      sx={{
        pt: 1,
        minHeight: '85px',
      }}
    >
      <Container
        sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: { xs: 'flex-end', sm: 'space-between' },
          }}
        >
          <Link href={LANDING_PAGE}>
            <Box display={{ xs: 'none', md: 'flex' }}>
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
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            width={{ xs: '100%' }}
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            alignItems={{ xs: 'center' }}
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
                <Button variant="outlined" onClick={logout}>
                  {t('common.logout')}
                </Button>
              </>
            )}
            {!user && !loading && (
              <Link href={LOGIN}>
                <Button variant="outlined"> {t('common.organizer')}</Button>
              </Link>
            )}
          </Stack>
        </Toolbar>
        {router.pathname.includes(PANEL) && user && !loading && <AdminNavbar />}
      </Container>
    </AppBar>
  );
};
