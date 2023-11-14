import {
  AccommodationFormProps,
  IAccommodation,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { t } from 'i18next';
import FormStatusMessage from '../../common/FormStatusMessage';
import GMInput from '../../common/GMInput';
import { accomodationFormSchema } from './AccomodationForm.schema';

interface IProps {
  formType: FormType;
  formSubmitStatus: Status;
  createAccommodation?: (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => void;
  editAccommodation?: (
    values: AccommodationFormProps,
    accommodationId?: string
  ) => void;
  deleteAccommodation?: (accommodationId: string) => void;
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
  const isCreateForm = formType === FormType.CREATE;
  const isEditForm = formType === FormType.EDIT;

  return (
    <Formik
      initialValues={{
        name: currentRow?.name || '',
        address: currentRow?.address || '',
        tel: currentRow?.tel || '',
      }}
      validationSchema={accomodationFormSchema}
      onSubmit={(values, { resetForm }) => {
        if (isCreateForm) {
          createAccommodation?.(values, resetForm);
        } else if (isEditForm) {
          editAccommodation?.(values, currentRow?.id);
        }
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack
            border={isCreateForm ? 'solid 1px' : 'none'}
            borderRadius={1}
            borderColor="primary.main"
            mx="auto"
            px={isCreateForm ? 2 : 0}
            pb={isCreateForm ? 2 : 0}
            mb={isCreateForm ? 2 : 0}
            width={{
              xs: '100%',
              sm: isCreateForm ? '50%' : '100%',
            }}
          >
            {isEditForm && (
              <Typography variant="h5" component="h1">
                {t('accommodationForm.editAccommodation')}
              </Typography>
            )}
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
            <Box ml="auto" mt={1}>
              {isEditForm && (
                <Button
                  onClick={() =>
                    currentRow && deleteAccommodation?.(currentRow.id)
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
                {isCreateForm && t('accommodationForm.addAccommodation')}
                {isEditForm && t('common.save')}
              </Button>
            </Box>
            {isCreateForm && (
              <FormStatusMessage
                formSubmitStatus={formSubmitStatus}
                message={t('formValidation.formSubmitMessageSuccess')}
              />
            )}
            {isEditForm && (
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
