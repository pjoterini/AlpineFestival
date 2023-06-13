import { userLoginSchema } from '@/components/LoginForm/utils/loginUserSchema';
import GMInput from '@/components/common/GMInput';
import { auth } from '@/firebase/config';
import { Box, Button, Stack } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ILogin } from './LoginForm.container';

interface IProps {
  handleLogin: (values: ILogin) => void;
}

export const LoginForm = ({ handleLogin }: IProps) => {
  const [user, loading] = useAuthState(auth);

  if (!user && !loading) {
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

              <Box mx="auto" mt={2} mb={5}>
                <Button variant="outlined" type="submit">
                  {t('common.login')}
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    );
  } else {
    return <Box></Box>;
  }
};
