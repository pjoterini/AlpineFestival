import { addAccommodation } from '@/firebase/database/accommodation/addAccommodation';
import {
  AccommodationFormProps,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { useState } from 'react';
import AccomodationForm from './AccommodationForm.component';

const AccommodationFormContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);

  const onSubmit = async (
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

  return (
    <>
      <AccomodationForm
        onSubmit={onSubmit}
        formSubmitStatus={formSubmitStatus}
      />
    </>
  );
};

export default AccommodationFormContainer;
