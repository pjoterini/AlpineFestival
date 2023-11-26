import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUsers } from '@/redux/users/actions';
import { selectUsers } from '@/redux/users/selectors';
import { useEffect } from 'react';
import UsersTable from './UsersTable.component';

const UsersTableContainer = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <UsersTable users={users} />;
};

export default UsersTableContainer;
