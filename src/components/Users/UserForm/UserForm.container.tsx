import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { useAppDispatch } from '@/redux/store';
import { createUserAction } from '@/redux/users/actions';
import { ResetUserForm, UserFormProps } from '@/redux/users/interfaces';
import { DefaultTFuncReturn, t } from 'i18next';
import { useState } from 'react';
import UserForm from './UserForm.component';

const UserFormContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );

  const dispatch = useAppDispatch();

  const createUser = async (
    values: UserFormProps,
    resetForm: ResetUserForm
  ) => {
    const action = await dispatch(createUserAction(values));

    if (action.payload.response.data?.errorInfo) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage(action.payload.response.data.errorInfo.message);
    } else if (!action) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage(t('formValidation.formSubmitMessageError'));
    } else if (action.payload.response.createdUserWithId) {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  return (
    <UserForm
      formType={FormType.CREATE}
      createUser={createUser}
      formSubmitStatus={formSubmitStatus}
      errorMessage={errorMessage}
    />
  );
};

export default UserFormContainer;
