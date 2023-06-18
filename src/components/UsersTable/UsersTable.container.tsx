import { IUser } from '@/redux/user/interfaces';
import UsersTable from './UsersTable.component';
import { useEffect, useState } from 'react';
import { getUsers } from '@/firebase/database/user/getUsers';

const UsersTableContainer = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const usersGetter = async () => {
      const data = await getUsers();
      if (data) {
        setUsers(data);
      }
    };

    usersGetter();
  }, []);

  return <UsersTable users={users} />;
};

export default UsersTableContainer;
