import { getUsers } from '@/firebase/database/user/getUsers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import UsersTable from './UsersTable.component';
import { selectUsers } from '@/redux/users/selectors';
import { setUsers } from '@/redux/users/reducer';

const UsersTableContainer = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const usersGetter = async () => {
      const data = await getUsers();
      if (data) {
        dispatch(setUsers(data));
      }
    };

    usersGetter();
  }, [dispatch]);

  return <UsersTable users={users} />;
};

export default UsersTableContainer;
