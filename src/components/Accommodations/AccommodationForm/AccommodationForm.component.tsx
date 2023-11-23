import FormButtonsContainer from '@/components/common/FormButtonsContainer';
import FormContainer from '@/components/common/FormContainer';
import { GMPhoneInput } from '@/components/common/GMPhoneInput';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import {
  AccommodationFormProps,
  IAccommodation,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { DefaultTFuncReturn, t } from 'i18next';
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
  errorMessage: string | DefaultTFuncReturn;
}

const AccommodationForm = ({
  formType,
  formSubmitStatus,
  createAccommodation,
  editAccommodation,
  deleteAccommodation,
  currentRow,
  errorMessage,
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
        isCreateForm && createAccommodation?.(values, resetForm);
        isEditForm && editAccommodation?.(values, currentRow?.id);
      }}
    >
      {({ touched, setFieldValue, errors }) => (
        <Form>
          <FormContainer>
            <Typography variant="h5" component="h1" mb={1}>
              {isCreateForm && t('accommodationForm.addAccommodation')}
              {isEditForm && t('accommodationForm.editAccommodation')}
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
            <GMPhoneInput
              currentRow={currentRow}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              formatNumber={true}
            />
            <FormStatusMessage
              formSubmitStatus={formSubmitStatus}
              errorMessage={errorMessage}
              message={
                isCreateForm
                  ? t('formValidation.formSubmitMessageSuccess')
                  : t('formValidation.formEditMessageSuccess')
              }
            />
            <FormButtonsContainer>
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
            </FormButtonsContainer>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default AccommodationForm;
