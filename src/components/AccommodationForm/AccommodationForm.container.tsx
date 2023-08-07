import { FormType } from '@/redux/accomodations/interfaces';
import AccomodationForm from './AccommodationForm.component';
import useAccommodationFormActions from './useAccommodationFormActions';

const AccommodationFormContainer = () => {
  const {
    formSubmitStatus,
    createAccommodation,
    editAccommodation,
    deleteAccommodation,
  } = useAccommodationFormActions();

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
