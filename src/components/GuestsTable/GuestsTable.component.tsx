import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { rows } from './mock';
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
  { field: 'ownsPc', headerName: i18next.t<string>('guest.ownComputer') },
  {
    field: 'speechLength',
    headerName: i18next.t<string>('guest.speechLength'),
  },
  {
    field: 'specialNeeds',
    headerName: i18next.t<string>('guest.specialRequirements'),
  },
];

const GuestsTable = () => {
  return <DataGrid rows={rows} columns={columns} autoHeight />;
};

export default GuestsTable;
