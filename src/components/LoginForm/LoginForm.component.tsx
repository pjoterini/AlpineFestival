import GMInput from '@/components/common/GMInput';
import { auth } from '@/firebase/config';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ILogin } from './LoginForm.container';
import { userLoginSchema } from './loginForm.schema';

interface IProps {
  handleLogin: (values: ILogin) => void;
}

export const LoginForm = ({ handleLogin }: IProps) => {
  const [user, loading] = useAuthState(auth);

  if (user && !loading) return null;

  return (
    <Formik
      initialValues={{
        userEmail: '',
        password: '',
      }}
      validationSchema={userLoginSchema}
      onSubmit={handleLogin}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack
            mt={{ xs: 2, sm: 4 }}
            mx="auto"
            width={{ xs: '100%', sm: '400px' }}
          >
            <Field
              name="userEmail"
              label={t('common.email')}
              component={GMInput}
              error={errors.userEmail}
              touched={touched.userEmail}
            />

            <Field
              name="password"
              label={t('common.password')}
              component={GMInput}
              error={errors.password}
              touched={touched.password}
            />

            <Box ml="auto" mt={2} mb={5}>
              <Button variant="contained" type="submit" size="large">
                {t('common.login')}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
