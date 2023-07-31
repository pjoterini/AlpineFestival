import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

export const useIsAdmin = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const CheckClaims = async () => {
      try {
        const idTokenResult = await user?.getIdTokenResult();
        const AdminClaim = await idTokenResult?.claims.admin;

        setIsAdmin(!!AdminClaim);
      } catch (error) {
        console.error(error);
      }
    };

    CheckClaims();
  }, [user]);

  return { isAdmin, user, loading };
};
