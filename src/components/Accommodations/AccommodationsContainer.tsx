import AccommodationFormModal from './AccommodationForm/AccommodationFormModal.container';
import AccommodationsTableContainer from './AccommodationsTable/AccommodationsTable.container';

const AccommodationsContainer = () => {
  return (
    <>
      <AccommodationFormModal />
      <AccommodationsTableContainer />
    </>
  );
};

export default AccommodationsContainer;
