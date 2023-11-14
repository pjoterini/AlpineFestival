import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import i18next from 'i18next';
import { useState } from 'react';
import AccommodationEditModal from './AccommodationEditModal.container';

interface IProps {
  accommodations: IAccommodation[];
}

const AccommodationsTable = ({ accommodations }: IProps) => {
  const { isAdmin } = useIsAdmin();
  const [currentRow, setCurrentRow] = useState<IAccommodation | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: i18next.t<string>('common.accommodation'),
      width: 200,
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
      <Box mx="auto" maxWidth="576px">
        <DataGrid
          rows={accommodations}
          columns={columns}
          getRowId={(row) => row.id}
          onRowClick={(row) => {
            setCurrentRow(row.row);
          }}
        />
      </Box>
      <AccommodationEditModal
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
      />
    </>
  );
};

export default AccommodationsTable;
