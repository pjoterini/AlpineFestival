import {
  IAccommodation,
  ResetEditAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import { accomodationFormSchema } from '../../AccommodationForm/AccomodationForm.schema';
import GMInput from '../../common/GMInput';

interface IProps {
  onSubmit: (
    values: IAccommodation,
    resetForm: ResetEditAccommodationForm
  ) => void;
  formSubmitStatus: Status;
  currentRow: IAccommodation | null;
}

const EditAccommodationForm = ({
  onSubmit,
  formSubmitStatus,
  currentRow,
}: IProps) => {
  return (
    <Formik
      initialValues={{
        id: currentRow ? currentRow.id : '',
        name: currentRow ? currentRow.name : '',
        address: currentRow ? currentRow.address : '',
        tel: currentRow ? currentRow.tel : '',
      }}
      validationSchema={accomodationFormSchema}
      onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack mx="auto" width="100%">
            <Typography variant="h5" component="h1">
              {t('editAccommodationForm.editAccommodationForm')}
            </Typography>
            <Field
              name="name"
              label={t('common.name')}
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
                {t('editAccommodationForm.save')}
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
                  : t('formValidation.formEditMessageSuccess')}
              </Typography>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default EditAccommodationForm;
