export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  type: string;
}

export type firebaseUser = Omit<IUser, 'id'>;

export enum status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'FAILED',
}
