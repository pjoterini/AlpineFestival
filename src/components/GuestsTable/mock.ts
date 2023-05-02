import { IGuest, SpeechLength } from '@/redux/guest/interfaces';
import { GridRowsProp } from '@mui/x-data-grid';

export const rows: GridRowsProp<IGuest> = [
  {
    id: 1,
    firstName: 'Kasia',
    lastName: 'Strząska',
    email: 'kasia.durska@wp.pl',
    tel: '12312313',
    checkIn: false,
    type: 'guest',
    organizer: 2,
    accomodationComment: '',
    accommodation: 'Jagienka',
    ownsPc: false,
    speechLength: SpeechLength.min15_30,
    specialNeeds: 'Szklanka wody',
    arrival: new Date(),
    departure: new Date(),
    presents: false,
  },
];
