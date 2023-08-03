import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import i18next from 'i18next';

interface IProps {
  accommodations: IAccommodation[];
}

const AccommodationsTable = ({ accommodations }: IProps) => {
  const { isAdmin } = useIsAdmin();

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
    <DataGrid
      rows={accommodations}
      columns={columns}
      autoHeight
      getRowId={(row) => row.id}
    />
  );
};

export default AccommodationsTable;
