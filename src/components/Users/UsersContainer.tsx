import UserFormModal from './UserForm/UserFormModal.container';
import UsersTableContainer from './UsersTable/UsersTable.container';

const UsersContainer = () => {
  return (
    <>
      <UserFormModal />
      <UsersTableContainer />
    </>
  );
};

export default UsersContainer;
