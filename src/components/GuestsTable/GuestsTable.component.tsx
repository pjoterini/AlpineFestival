import { IGuest } from '@/redux/guest/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import i18next from 'i18next';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: i18next.t<string>('common.nameAndSurrname'),
    valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`,
  },
  { field: 'email', headerName: i18next.t<string>('common.email') },
  { field: 'tel', headerName: i18next.t<string>('common.tel') },
  { field: 'checkIn', headerName: i18next.t<string>('guest.checkIn') },
  {
    field: 'arrival',
    headerName: i18next.t<string>('guestForm.arrivalDate'),
    valueGetter: ({ row }) => `${dayjs(row.arrival).format('DD/MM/YYYY')}`,
  },
  {
    field: 'departure',
    headerName: i18next.t<string>('guestForm.departureDate'),
    valueGetter: ({ row }) => `${dayjs(row.departure).format('DD/MM/YYYY')}`,
  },
  { field: 'type', headerName: i18next.t<string>('common.type') },
  { field: 'organizer', headerName: i18next.t<string>('common.guardian') },
  {
    field: 'accomodationComment',
    headerName: i18next.t<string>('guest.accommodationNote'),
  },
  {
    field: 'accommodation',
    headerName: i18next.t<string>('guest.accommodation'),
  },
  {
    field: 'presents',
    headerName: i18next.t<string>('guest.presents'),
    valueGetter: ({ row }) =>
      row.presents
        ? i18next.t<string>('common.yes')
        : i18next.t<string>('common.no'),
  },
  {
    field: 'ownsPc',
    headerName: i18next.t<string>('guest.ownComputer'),
    valueGetter: ({ row }) =>
      row.ownsPc ? i18next.t<string>('common.yes') : null,
  },
  {
    field: 'speechLength',
    headerName: i18next.t<string>('guest.speechLength'),
  },
  {
    field: 'specialNeeds',
    headerName: i18next.t<string>('guest.specialRequirements'),
  },
];

interface IProps {
  guests: IGuest[];
}

const GuestsTable = ({ guests }: IProps) => {
  return <DataGrid rows={guests} columns={columns} autoHeight />;
};

export default GuestsTable;
