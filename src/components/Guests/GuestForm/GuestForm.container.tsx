import { FormType } from '@/redux/enums/formType';
import { createGuestAction } from '@/redux/guests/actions';
import {
  GuestRegisterFormProps,
  ResetGuestRegisterForm,
} from '@/redux/guests/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import GuestForm from './GuestForm.component';

const GuestFormContainer = () => {
  const errorMessage = useAppSelector((state) => state.guests.error);
  const formSubmitStatus = useAppSelector((state) => state.guests.status);
  const dispatch = useAppDispatch();

  const CreateGuest = async (
    values: GuestRegisterFormProps,
    resetForm: ResetGuestRegisterForm
  ) => {
    const response = await dispatch(createGuestAction(values));
    if (response) resetForm();
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
