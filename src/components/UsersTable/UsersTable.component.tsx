import { IUser } from '@/redux/users/interfaces';
import { useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import i18next from 'i18next';
import AdminActions from './AdminActions';
import { useIsAdmin } from '@/firebase/auth/useIsAdmin';

interface IProps {
  users: IUser[];
}

const UsersTable = ({ users }: IProps) => {
  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);
  const { isAdmin } = useIsAdmin();

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: i18next.t<string>('common.actions'),
      width: 100,
      type: 'actions',
      renderCell: (params) => (
        <AdminActions {...{ params, selectedRowId, setSelectedRowId }} />
      ),
    },
    {
      field: 'firstName',
      headerName: i18next.t<string>('common.firstName'),
      width: 100,
      editable: isAdmin,
    },
    {
      field: 'lastName',
      headerName: i18next.t<string>('common.lastName'),
      width: 100,
      editable: isAdmin,
    },
    {
      field: 'email',
      headerName: i18next.t<string>('common.email'),
      width: 180,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: 120,
      editable: isAdmin,
    },
    {
      field: 'isAdmin',
      headerName: i18next.t<string>('common.admin'),
      width: 100,
      type: 'boolean',
      editable: isAdmin,
    },
  ];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      autoHeight
      editMode="row"
      getRowId={(row) => row.id}
      onRowEditStart={(params) => setSelectedRowId(params.id)}
    />
  );
};

export default UsersTable;
