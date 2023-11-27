import { createAccommodationAction } from '@/redux/accomodations/actions';
import {
  AccommodationFormProps,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AccomodationForm from './AccommodationForm.component';

const AccommodationFormContainer = () => {
  const errorMessage = useAppSelector((state) => state.accommodations.error);
  const formSubmitStatus = useAppSelector(
    (state) => state.accommodations.status
  );
  const dispatch = useAppDispatch();

  const createAccommodation = async (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => {
    const response = await dispatch(createAccommodationAction(values));
    if (response) resetForm();
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
