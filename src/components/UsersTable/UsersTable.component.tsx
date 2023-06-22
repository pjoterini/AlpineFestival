import { IUser } from '@/redux/users/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import i18next from 'i18next';

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

interface IProps {
  users: IUser[];
}

const UsersTable = ({ users }: IProps) => {
  return <DataGrid rows={users} columns={columns} autoHeight />;
};

export default UsersTable;
