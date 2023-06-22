export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  type: string;
}

export type IFirebaseUser = Omit<IUser, 'id'>;

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'FAILED',
}
