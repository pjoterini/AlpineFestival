import { IUser } from '@/redux/user/interfaces';
import { GridRowsProp } from '@mui/x-data-grid';

export const rows: GridRowsProp<IUser> = [
  {
    id: 1,
    firstName: 'Kasia',
    lastName: 'Strząska',
    email: 'kasia.durska@wp.pl',
    tel: '123-123-123',
    type: 'super organizer',
  },
];
