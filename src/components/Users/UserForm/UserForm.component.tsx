import FormButtonsContainer from '@/components/common/FormButtonsContainer';
import FormContainer from '@/components/common/FormContainer';
import { GMPhoneInput } from '@/components/common/GMPhoneInput';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { IUser, ResetUserForm, UserFormProps } from '@/redux/users/interfaces';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel } from 'formik-mui';
import { DefaultTFuncReturn, t } from 'i18next';
import FormStatusMessage from '../../common/FormStatusMessage';
import GMInput from '../../common/GMInput';
import { userRegistrationSchema } from './userForm.schema';

interface IProps {
  formType: FormType;
  formSubmitStatus: Status;
  createUser?: (values: UserFormProps, resetForm: ResetUserForm) => void;
  editUser?: (values: UserFormProps, userId?: string) => void;
  deleteUser?: (userId: string) => void;
  currentRow?: IUser | null;
  errorMessage: string | DefaultTFuncReturn;
}

const UserForm = ({
  formType,
  formSubmitStatus,
  createUser,
  editUser,
  deleteUser,
  currentRow,
  errorMessage,
}: IProps) => {
  const isCreateForm = formType === FormType.CREATE;
  const isEditForm = formType === FormType.EDIT;

  return (
    <Formik
      initialValues={{
        firstName: currentRow?.firstName || '',
        lastName: currentRow?.lastName || '',
        email: currentRow?.email || '',
        password: currentRow?.password || '',
        tel: currentRow?.tel || '',
        isAdmin: currentRow?.isAdmin || false,
      }}
      validationSchema={userRegistrationSchema}
      onSubmit={(values, { resetForm }) => {
        isCreateForm && createUser?.(values, resetForm);
        isEditForm && editUser?.(values, currentRow?.id);
      }}
    >
      {({ touched, setFieldValue, errors }) => (
        <Form>
          <FormContainer>
            <Typography variant="h5" component="h1" mb={1}>
              {isCreateForm && t('userForm.organizerData')}
              {isEditForm && t('userForm.editUser')}
            </Typography>
            <Field
              name="firstName"
              label={t('common.firstName')}
              component={GMInput}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <Field
              name="lastName"
              label={t('common.lastName')}
              component={GMInput}
              error={errors.lastName}
              touched={touched.lastName}
            />
            <Field
              name="email"
              type="email"
              label={t('common.email')}
              component={GMInput}
              error={errors.email}
              touched={touched.email}
            />
            <Field
              name="password"
              type="password"
              label={t('common.password')}
              component={GMInput}
              error={errors.password}
              touched={touched.password}
            />
            <GMPhoneInput
              currentRow={currentRow}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              formatNumber={false}
            />
            <Stack display="flex">
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isAdmin"
                Label={{ label: t('userForm.isAdmin') }}
              />
              <FormButtonsContainer>
                {isEditForm && (
                  <Button
                    onClick={() =>
                      currentRow && deleteUser && deleteUser(currentRow.id)
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
                  {isCreateForm && t('userForm.addUser')}
                  {isEditForm && t('common.save')}
                </Button>
              </FormButtonsContainer>
            </Stack>
            <FormStatusMessage
              formSubmitStatus={formSubmitStatus}
              errorMessage={errorMessage}
              message={
                isCreateForm
                  ? t('formValidation.formSubmitMessageSuccess')
                  : t('formValidation.formEditMessageSuccess')
              }
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
