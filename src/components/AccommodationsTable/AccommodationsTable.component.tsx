import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import i18next from 'i18next';
import { useState } from 'react';
import AccommodationEditModal from './AccommodationEditModal';

interface IProps {
  accommodations: IAccommodation[];
}

const AccommodationsTable = ({ accommodations }: IProps) => {
  const { isAdmin } = useIsAdmin();
  const [currentRow, setCurrentRow] = useState<IAccommodation | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: i18next.t<string>('common.firstName'),
      width: 100,
      editable: isAdmin,
    },
    {
      field: 'address',
      headerName: i18next.t<string>('common.email'),
      width: 180,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: 120,
      editable: isAdmin,
    },
  ];

  return (
    <>
      <DataGrid
        rows={accommodations}
        columns={columns}
        autoHeight
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          handleOpen();
          setCurrentRow(row.row);
        }}
      />
      <AccommodationEditModal
        open={open}
        handleClose={handleClose}
        currentRow={currentRow}
      />
    </>
  );
};

export default AccommodationsTable;
