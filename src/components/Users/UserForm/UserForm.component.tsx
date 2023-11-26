import FormButtonsContainer from '@/components/common/FormButtonsContainer';
import FormContainer from '@/components/common/FormContainer';
import { GMPhoneInput } from '@/components/common/GMPhoneInput';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import {
  IUser,
  ResetUserForm,
  UserEditFormProps,
  UserInitialValues,
  UserRegisterFormProps,
} from '@/redux/users/interfaces';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel } from 'formik-mui';
import { t } from 'i18next';
import FormStatusMessage from '../../common/FormStatusMessage';
import GMInput from '../../common/GMInput';
import { userEditSchema } from './validation/userEditForm.schema';
import { userRegistrerSchema } from './validation/userRegisterForm.schema';

interface IProps {
  formType: FormType;
  formSubmitStatus: Status;
  createUser?: (
    values: UserRegisterFormProps,
    resetForm: ResetUserForm
  ) => void;
  editUser?: (values: UserEditFormProps, userId?: string) => void;
  deleteUser?: (userId: string) => void;
  selectedUser?: IUser | null;
  errorMessage: string | undefined;
}

const UserForm = ({
  formType,
  formSubmitStatus,
  createUser,
  editUser,
  deleteUser,
  selectedUser,
  errorMessage,
}: IProps) => {
  const isCreateForm = formType === FormType.CREATE;
  const isEditForm = formType === FormType.EDIT;

  let initialValues: UserInitialValues = {
    firstName: selectedUser?.firstName || '',
    lastName: selectedUser?.lastName || '',
    email: selectedUser?.email || '',
    password: selectedUser?.password || '',
    tel: selectedUser?.tel || '',
    isAdmin: selectedUser?.isAdmin || false,
  };

  if (isEditForm) {
    initialValues = {
      id: selectedUser?.id || '',
      firstName: selectedUser?.firstName || '',
      lastName: selectedUser?.lastName || '',
      email: selectedUser?.email || '',
      tel: selectedUser?.tel || '',
      isAdmin: selectedUser?.isAdmin || false,
    };
  }

  let validationSchema;
  if (isCreateForm) {
    validationSchema = userRegistrerSchema;
  } else if (isEditForm) {
    validationSchema = userEditSchema;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        isCreateForm &&
          createUser?.(values as UserRegisterFormProps, resetForm);
        isEditForm && editUser?.(values as UserEditFormProps);
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
              disabled={isEditForm && true}
              error={errors.email}
              touched={touched.email}
            />
            {isCreateForm && (
              <Field
                name="password"
                type="password"
                label={t('common.password')}
                component={GMInput}
                error={errors.password}
                touched={touched.password}
              />
            )}
            <GMPhoneInput
              selectedRow={selectedUser}
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
                      selectedUser && deleteUser && deleteUser(selectedUser.id)
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
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
