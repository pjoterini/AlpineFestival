import { userLoginSchema } from '@/components/GuestRegistration/utils/validationSchemas/loginUserSchema';
import GMInput from '@/components/common/GMInput';
import { loginUser } from '@/firebase/auth/loginUser';
import { auth } from '@/firebase/config';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface ILogin {
  userEmail: string;
  password: string;
}

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleLogin = async (values: ILogin) => {
    await loginUser(values);
    router.replace('/admin');
  };

  if (!user && !loading) {
    return (
      <>
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
              <Stack p={4} minWidth="320px" spacing={2} alignItems="center">
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

                <Button
                  sx={{ maxWidth: '50%' }}
                  variant="outlined"
                  type="submit"
                >
                  {t('common.login')}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </>
    );
  } else {
    return <Box></Box>;
  }
};

export default Login;
