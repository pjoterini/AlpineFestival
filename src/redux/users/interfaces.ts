export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  type: string;
}

export type firebaseUser = Omit<IUser, 'id'>;
