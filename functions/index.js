import { https } from 'firebase-functions';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';
import checkIsAdmin from './isAdmin.js';
initializeApp();

export const addAdminRole = https.onCall(async (request, context) => {
  try {
    const isAdmin = await checkIsAdmin(context.auth.uid);

    if (isAdmin) {
      await getAuth().setCustomUserClaims(request, {
        admin: true,
      });
    } else {
      console.error('USER IS NOT AN ADMIN');
    }
  } catch (error) {
    console.error(error);
  }
});

export const removeAdminRole = https.onCall(async (request, context) => {
  try {
    const isAdmin = await checkIsAdmin(context.auth.uid);

    if (isAdmin) {
      await getAuth().setCustomUserClaims(request, {
        admin: false,
      });
    } else {
      console.error('USER IS NOT AN ADMIN');
    }
  } catch (error) {
    console.error(error);
  }
});

export const createUser = https.onCall(async (request, context) => {
  try {
    const isAdmin = await checkIsAdmin(context.auth.uid);

    if (isAdmin) {
      const createdUser = await getAuth().createUser({
        displayName: `${request.firstName} ${request.lastName}`,
        email: request.email,
        phoneNumber: request.tel,
        password: request.password,
      });

      await getAuth().setCustomUserClaims(createdUser.uid, {
        admin: !!request.isAdmin,
      });

      return createdUser;
    } else {
      console.error('USER IS NOT AN ADMIN');
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});

export const updateUser = https.onCall(async (request, context) => {
  try {
    const isAdmin = await checkIsAdmin(context.auth.uid);

    if (isAdmin) {
      const updatedUser = await getAuth().updateUser(request.id, {
        displayName: `${request.firstName} ${request.lastName}`,
        email: request.email,
        phoneNumber: request.tel,
      });

      await getAuth().setCustomUserClaims(updatedUser.uid, {
        admin: !!request.isAdmin,
      });

      return updatedUser;
    } else {
      console.error('USER IS NOT AN ADMIN');
    }
  } catch (error) {
    console.error(error);
  }
});

export const deleteUser = https.onCall(async (request, context) => {
  try {
    const isAdmin = await checkIsAdmin(context.auth.uid);

    if (isAdmin) {
      const deletedUser = await getAuth().deleteUser(request);
      return deletedUser;
    } else {
      console.error('USER IS NOT AN ADMIN');
    }
  } catch (error) {
    console.error(error);
  }
});
