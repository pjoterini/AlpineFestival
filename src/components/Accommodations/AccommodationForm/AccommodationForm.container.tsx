import { addAccommodation } from '@/firebase/database/accommodation/addAccommodation';
import {
  AccommodationFormProps,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { DefaultTFuncReturn, t } from 'i18next';
import { useState } from 'react';
import AccomodationForm from './AccommodationForm.component';

const AccommodationFormContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );

  const createAccommodation = async (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => {
    const result = await addAccommodation(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage(t('formValidation.formSubmitMessageError'));
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  return (
    <AccomodationForm
      formType={FormType.CREATE}
      createAccommodation={createAccommodation}
      formSubmitStatus={formSubmitStatus}
      errorMessage={errorMessage}
    />
  );
};

export default AccommodationFormContainer;
