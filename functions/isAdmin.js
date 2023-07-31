import { getAuth } from 'firebase-admin/auth';

const checkIsAdmin = async (currentUserId) => {
  const currentUserRecord = await getAuth().getUser(currentUserId);
  const isAdmin = currentUserRecord.customClaims['admin'] === true;

  return isAdmin;
};

export default checkIsAdmin;
