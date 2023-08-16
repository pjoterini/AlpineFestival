import { addAccommodation } from '@/firebase/database/accommodation/addAccommodation';
import {
  deleteAccommodationAction,
  updateAccommodation,
} from '@/redux/accomodations/actions';
import {
  AccommodationFormProps,
  FormType,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
import AccomodationForm from './AccommodationForm.component';

const AccommodationFormContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const dispatch = useAppDispatch();

  const createAccommodation = async (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => {
    const result = await addAccommodation(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  const editAccommodation = async (
    values: AccommodationFormProps,
    accommodationId: string | undefined
  ) => {
    const result =
      accommodationId &&
      (await dispatch(updateAccommodation({ id: accommodationId, ...values })));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  const deleteAccommodation = async (accommodationId: string) => {
    const result = await dispatch(deleteAccommodationAction(accommodationId));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  return (
    <AccomodationForm
      formType={FormType.CREATE}
      formSubmitStatus={formSubmitStatus}
      createAccommodation={createAccommodation}
      editAccommodation={editAccommodation}
      deleteAccommodation={deleteAccommodation}
    />
  );
};

export default AccommodationFormContainer;
