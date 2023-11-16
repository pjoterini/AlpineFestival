import {
  emailCol,
  firstNameCol,
  isAdminCol,
  lastNameCol,
  telCol,
} from '@/constants/columnsDimensions';
import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { IUser } from '@/redux/users/interfaces';
import { Box } from '@mui/material';
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
      width: firstNameCol,
    },
    {
      field: 'lastName',
      headerName: i18next.t<string>('common.lastName'),
      width: lastNameCol,
    },
    {
      field: 'email',
      headerName: i18next.t<string>('common.email'),
      width: emailCol,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: telCol,
    },
    {
      field: 'isAdmin',
      headerName: i18next.t<string>('common.admin'),
      width: isAdminCol,
      type: 'boolean',
    },
  ];

  return (
    <Box maxWidth="690px">
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          isAdmin && setCurrentRow(row.row);
        }}
      />
      <UserEditModal currentRow={currentRow} setCurrentRow={setCurrentRow} />
    </Box>
  );
};

export default UsersTable;
