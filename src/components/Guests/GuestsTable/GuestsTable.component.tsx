import { absenceOption } from '@/constants/absenceOption';
import { IGuest } from '@/redux/guests/interfaces';
import { IUser } from '@/redux/users/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { useState } from 'react';
import { speechLengthOptions } from '../GuestForm/speechLengthOptions';
import { formatPolishTelNumber } from './formatPolishTelNumber';
import GuestEditModal from './GuestEditModal.container';

interface IProps {
  guests: IGuest[];
  users: IUser[];
}

const GuestsTable = ({ guests, users }: IProps) => {
  const [currentRow, setCurrentRow] = useState<IGuest | null>(null);

  const organizersNames = users.map(
    (user) => `${user.firstName} ${user.lastName}`
  );

  const speechLengthOptionsArray = Object.keys(speechLengthOptions);

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: i18next.t<string>('common.firstName'),
      width: 100,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: i18next.t<string>('common.lastName'),
      width: 100,
      editable: true,
    },
    {
      field: 'email',
      headerName: i18next.t<string>('common.email'),
      width: 130,
      editable: true,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: 110,
      valueGetter: ({ row }) => formatPolishTelNumber(row.tel),
      editable: true,
    },
    {
      field: 'checkIn',
      headerName: i18next.t<string>('guest.checkIn'),
      width: 67,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'arrival',
      headerName: i18next.t<string>('guestForm.arrivalDate'),
      valueGetter: ({ row }) => `${dayjs(row.arrival).format('DD/MM/YYYY')}`,
      editable: true,
    },
    {
      field: 'departure',
      headerName: i18next.t<string>('guestForm.departureDate'),
      valueGetter: ({ row }) => `${dayjs(row.departure).format('DD/MM/YYYY')}`,
      editable: true,
    },
    {
      field: 'type',
      headerName: i18next.t<string>('common.type'),
      width: 50,
      editable: true,
    },
    {
      field: 'organizer',
      headerName: i18next.t<string>('common.guardian'),
      width: 100,
      valueGetter: ({ row }) =>
        row.organizer
          ? `${row.organizer.firstName} ${row.organizer.lastName}`
          : absenceOption,
      type: 'singleSelect',
      valueOptions: [absenceOption, ...organizersNames],
      editable: true,
    },
    {
      field: 'accomodationComment',
      headerName: i18next.t<string>('guest.accommodationNote'),
      width: 100,
      editable: true,
    },
    {
      field: 'accomodation',
      headerName: i18next.t<string>('guest.accommodation'),
      width: 50,
      editable: true,
    },
    {
      field: 'presents',
      headerName: i18next.t<string>('guest.presents'),
      width: 50,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'ownsPc',
      headerName: i18next.t<string>('guest.ownComputer'),
      width: 50,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'speechLength',
      headerName: i18next.t<string>('guest.speechLength'),
      width: 60,
      type: 'singleSelect',
      valueGetter: ({ row }) =>
        row.speechLength ? row.speechLength : absenceOption,
      valueOptions: [absenceOption, ...speechLengthOptionsArray],
      editable: true,
    },
    {
      field: 'specialNeeds',
      headerName: i18next.t<string>('guest.specialRequirements'),
      editable: true,
    },
  ];

  return (
    <>
      <DataGrid
        rows={guests}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(row) => setCurrentRow(row.row)}
      />
      <GuestEditModal currentRow={currentRow} setCurrentRow={setCurrentRow} />
    </>
  );
};

export default GuestsTable;
