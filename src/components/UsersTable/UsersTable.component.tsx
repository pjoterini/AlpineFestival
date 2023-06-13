import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { rows } from './mock';
import i18next from 'i18next';
import { Container } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: i18next.t<string>('common.nameAndSurrname'),
    valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`,
  },
  { field: 'email', headerName: i18next.t<string>('common.email') },
  { field: 'tel', headerName: i18next.t<string>('common.tel') },
  { field: 'type', headerName: i18next.t<string>('common.type') },
];

const UsersTable = () => {
  return (
    <Container>
      <DataGrid rows={rows} columns={columns} autoHeight />
    </Container>
  );
};

export default UsersTable;
