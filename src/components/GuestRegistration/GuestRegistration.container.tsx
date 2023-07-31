import { addGuest } from '@/firebase/database/guest/addGuest';
import { Status } from '@/redux/enums/status';
import {
  GuestRegistrationFormProps,
  ResetGuestForm,
} from '@/redux/guests/interfaces';
import { useState } from 'react';
import GuestRegistration from './GuestRegistration.component';

const GuestRegistrationContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);

  const onSubmit = async (
    values: GuestRegistrationFormProps,
    resetForm: ResetGuestForm
  ) => {
    const result = await addGuest(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  return (
    <>
      <GuestRegistration
        onSubmit={onSubmit}
        formSubmitStatus={formSubmitStatus}
      />
    </>
  );
};

export default GuestRegistrationContainer;
