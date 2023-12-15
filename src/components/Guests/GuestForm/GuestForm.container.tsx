import { auth } from '@/firebase/config';
import { FormType } from '@/redux/enums/formType';
import { createGuestAction } from '@/redux/guests/actions';
import {
  GuestRegisterFormProps,
  ResetGuestRegisterForm,
} from '@/redux/guests/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import GuestForm from './GuestForm.component';

const GuestFormContainer = () => {
  const [captcha, setCaptcha] = useState<string | null>();
  const [user] = useAuthState(auth);
  const errorMessage = useAppSelector((state) => state.guests.error);
  const formSubmitStatus = useAppSelector((state) => state.guests.status);
  const dispatch = useAppDispatch();

  const CreateGuest = async (
    values: GuestRegisterFormProps,
    resetForm: ResetGuestRegisterForm
  ) => {
    setCaptcha(null);
    const response = await dispatch(createGuestAction(values));
    if (response) resetForm();
  };

  return (
    <GuestForm
      formType={FormType.CREATE}
      createGuest={CreateGuest}
      formSubmitStatus={formSubmitStatus}
      errorMessage={errorMessage}
      captcha={captcha}
      setCaptcha={setCaptcha}
      userAuth={user}
    />
  );
};

export default GuestFormContainer;
