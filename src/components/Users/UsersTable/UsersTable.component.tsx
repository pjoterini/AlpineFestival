import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { IUser } from '@/redux/users/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import i18next from 'i18next';
import { useState } from 'react';
import UserEditModal from './UserEditModal.container';

interface IProps {
  users: IUser[];
}

const UsersTable = ({ users }: IProps) => {
  const { isAdmin } = useIsAdmin();
  const [currentRow, setCurrentRow] = useState<IUser | null>(null);

  const columns: GridColDef[] = [
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
    <>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          setCurrentRow(row.row);
        }}
      />
      <UserEditModal currentRow={currentRow} setCurrentRow={setCurrentRow} />
    </>
  );
};

export default UsersTable;
