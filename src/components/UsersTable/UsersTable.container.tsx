import { getUsers } from '@/firebase/database/user/getUsers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { pushUsers } from '@/redux/user/reducer';
import { useEffect } from 'react';
import UsersTable from './UsersTable.component';

const UsersTableContainer = () => {
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const usersGetter = async () => {
      const data = await getUsers();
      if (data) {
        dispatch(pushUsers(data));
      }
    };

    usersGetter();
  }, [dispatch]);

  return <UsersTable users={users} />;
};

export default UsersTableContainer;
