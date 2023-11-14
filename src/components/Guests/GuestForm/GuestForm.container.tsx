import { addGuest } from '@/firebase/database/guest/addGuest';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import {
  GuestRegisterFormProps,
  ResetGuestRegisterForm,
} from '@/redux/guests/interfaces';
import { DefaultTFuncReturn, t } from 'i18next';
import { useState } from 'react';
import GuestForm from './GuestForm.component';

const GuestFormContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );

  const CreateGuest = async (
    values: GuestRegisterFormProps,
    resetForm: ResetGuestRegisterForm
  ) => {
    const result = await addGuest(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage(t('formValidation.formSubmitMessageError'));
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  return (
    <GuestForm
      formType={FormType.CREATE}
      createGuest={CreateGuest}
      formSubmitStatus={formSubmitStatus}
      errorMessage={errorMessage}
    />
  );
};

export default GuestFormContainer;
