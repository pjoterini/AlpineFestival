import {
  AccommodationFormProps,
  FormType,
  IAccommodation,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import FormStatusMessage from '../common/FormStatusMessage';
import GMInput from '../common/GMInput';
import { accomodationFormSchema } from './AccomodationForm.schema';

interface IProps {
  formType: string;
  formSubmitStatus: Status;
  createAccommodation: (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => void;
  editAccommodation: (
    values: AccommodationFormProps,
    accommodationId?: string
  ) => void;
  deleteAccommodation: (accommodationId: string) => void;
  currentRow?: IAccommodation | null;
}

const AccommodationForm = ({
  formType,
  formSubmitStatus,
  createAccommodation,
  editAccommodation,
  deleteAccommodation,
  currentRow,
}: IProps) => {
  return (
    <Formik
      initialValues={{
        name: currentRow?.name || '',
        address: currentRow?.address || '',
        tel: currentRow?.tel || '',
      }}
      validationSchema={accomodationFormSchema}
      onSubmit={(values, { resetForm }) => {
        if (formType === FormType.CREATE) {
          createAccommodation(values, resetForm);
        } else if (formType === FormType.EDIT) {
          editAccommodation(values, currentRow?.id);
        }
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack
            mt={{
              xs: formType === FormType.CREATE ? 2 : 0,
              sm: formType === FormType.CREATE ? 4 : 0,
            }}
            mx="auto"
            width={{
              xs: '100%',
              sm: formType === FormType.CREATE ? '60%' : '100%',
            }}
          >
            <Typography variant="h5" component="h1" mb={1}>
              {formType === FormType.CREATE &&
                t('accommodationForm.accommodationForm')}
              {formType === FormType.EDIT &&
                t('accommodationForm.editAccommodationForm')}
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
              {formType === FormType.EDIT && (
                <Button
                  onClick={() =>
                    currentRow && deleteAccommodation(currentRow.id)
                  }
                  sx={{ mr: 1 }}
                  color="error"
                  variant="contained"
                  type="button"
                  size="large"
                >
                  {t('common.delete')}
                </Button>
              )}
              <Button variant="contained" type="submit" size="large">
                {formType === FormType.CREATE && t('guestForm.submit')}
                {formType === FormType.EDIT && t('common.save')}
              </Button>
            </Box>
            {formType === FormType.CREATE && (
              <FormStatusMessage
                formSubmitStatus={formSubmitStatus}
                message={t('formValidation.formSubmitMessageSuccess')}
              />
            )}
            {formType === FormType.EDIT && (
              <FormStatusMessage
                formSubmitStatus={formSubmitStatus}
                message={t('formValidation.formEditMessageSuccess')}
              />
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AccommodationForm;
