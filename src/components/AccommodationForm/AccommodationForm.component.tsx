import {
  AccommodationFormProps,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import GMInput from '../common/GMInput';
import { accomodationFormSchema } from './AccomodationForm.schema';

interface IProps {
  onSubmit: (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => void;
  formSubmitStatus: Status;
}

const AccommodationForm = ({ onSubmit, formSubmitStatus }: IProps) => {
  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        tel: '',
      }}
      validationSchema={accomodationFormSchema}
      onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack
            mt={{ xs: 2, sm: 4 }}
            mx="auto"
            width={{ xs: '100%', sm: '60%' }}
          >
            <Typography variant="h5" component="h1">
              {t('accommodationForm.accommodationForm')}
            </Typography>
            <Field
              name="name"
              label={t('common.accommodation')}
              component={GMInput}
              error={errors.name}
              touched={touched.name}
            />
            <Field
              name="address"
              label={t('common.address')}
              component={GMInput}
              error={errors.address}
              touched={touched.address}
            />
            <Field
              name="tel"
              type="tel"
              label={t('common.tel')}
              component={GMInput}
              error={errors.tel}
              touched={touched.tel}
            />

            <Box ml="auto" mt={2} mb={5}>
              <Button variant="contained" type="submit" size="large">
                {t('guestForm.submit')}
              </Button>
            </Box>
            {formSubmitStatus !== Status.IDLE && (
              <Typography
                variant="h5"
                mx="auto"
                color={
                  formSubmitStatus === Status.FAILED
                    ? 'error.main'
                    : 'success.main'
                }
              >
                {formSubmitStatus === Status.FAILED
                  ? t('formValidation.formSubmitMessageError')
                  : t('formValidation.formSubmitMessageSuccess')}
              </Typography>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AccommodationForm;
