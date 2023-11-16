import {
  accommodationCol,
  addressCol,
  telCol,
} from '@/constants/columnsDimensions';
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
  const [currentRow, setCurrentRow] = useState<IAccommodation | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: i18next.t<string>('common.accommodation'),
      width: accommodationCol,
    },
    {
      field: 'address',
      headerName: i18next.t<string>('common.address'),
      width: addressCol,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: telCol,
    },
  ];

  return (
    <Box maxWidth="600px">
      <DataGrid
        rows={accommodations}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          setCurrentRow(row.row);
        }}
      />
      <AccommodationEditModal
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
      />
    </Box>
  );
};

export default AccommodationsTable;
