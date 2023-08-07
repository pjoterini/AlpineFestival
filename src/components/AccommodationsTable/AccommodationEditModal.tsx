import AccommodationForm from '@/components/AccommodationForm/AccommodationForm.component';
import useAccommodationFormActions from '@/components/AccommodationForm/useAccommodationFormActions';
import { FormType, IAccommodation } from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface IProps {
  open: boolean;
  currentRow: IAccommodation | null;
  handleClose: () => void;
}

const AccommodationEditModal = ({ open, currentRow, handleClose }: IProps) => {
  const {
    formSubmitStatus,
    setFormSubmitStatus,
    createAccommodation,
    editAccommodation,
    deleteAccommodation,
  } = useAccommodationFormActions();

  return (
    <Modal
      open={open}
      onClose={() => {
        setFormSubmitStatus(Status.IDLE);
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        position="absolute"
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        top="50%"
        left="50%"
        p={4}
        width="320"
        borderRadius={2}
        boxShadow="24"
        bgcolor="background.paper"
      >
        <AccommodationForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          createAccommodation={createAccommodation}
          editAccommodation={editAccommodation}
          deleteAccommodation={deleteAccommodation}
          currentRow={currentRow}
        />
      </Box>
    </Modal>
  );
};

export default AccommodationEditModal;
