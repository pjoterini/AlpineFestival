import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import UserFormModal from './UserForm/UserFormModal.container';
import UsersTableContainer from './UsersTable/UsersTable.container';

const UsersContainer = () => {
  const { isAdmin } = useIsAdmin();
  return (
    <>
      {isAdmin && <UserFormModal />}
      <UsersTableContainer />
    </>
  );
};

export default UsersContainer;
