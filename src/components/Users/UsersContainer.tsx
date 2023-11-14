import UserRegistrationContainer from './UserForm/UserForm.container';
import UsersTableContainer from './UsersTable/UsersTable.container';

const UsersContainer = () => {
  return (
    <>
      <UserRegistrationContainer />
      <UsersTableContainer />
    </>
  );
};

export default UsersContainer;
