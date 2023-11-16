import { absenceOption } from '@/constants/absenceOption';
import {
  accommodationCol,
  accommodationCommentCol,
  arrivalCol,
  checkInCol,
  departureCol,
  emailCol,
  firstNameCol,
  lastNameCol,
  organizerCol,
  ownsPcCol,
  presentsCol,
  specialNeedsCol,
  speechLengthCol,
  telCol,
  typeCol,
} from '@/constants/columnsDimensions';
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
      width: firstNameCol,
    },
    {
      field: 'lastName',
      headerName: i18next.t<string>('common.lastName'),
      width: lastNameCol,
    },
    {
      field: 'email',
      headerName: i18next.t<string>('common.email'),
      width: emailCol,
    },
    {
      field: 'tel',
      headerName: i18next.t<string>('common.tel'),
      width: telCol,
      valueGetter: ({ row }) => formatPolishTelNumber(row.tel),
    },
    {
      field: 'checkIn',
      headerName: i18next.t<string>('guest.checkIn'),
      width: checkInCol,
      type: 'boolean',
    },
    {
      field: 'arrival',
      headerName: i18next.t<string>('guestForm.arrivalDate'),
      width: arrivalCol,
      valueGetter: ({ row }) => `${dayjs(row.arrival).format('DD/MM/YYYY')}`,
    },
    {
      field: 'departure',
      headerName: i18next.t<string>('guestForm.departureDate'),
      width: departureCol,
      valueGetter: ({ row }) => `${dayjs(row.departure).format('DD/MM/YYYY')}`,
    },
    {
      field: 'type',
      headerName: i18next.t<string>('common.type'),
      width: typeCol,
    },
    {
      field: 'organizer',
      headerName: i18next.t<string>('common.guardian'),
      width: organizerCol,
      valueGetter: ({ row }) =>
        row.organizer
          ? `${row.organizer.firstName} ${row.organizer.lastName}`
          : absenceOption,
      type: 'singleSelect',
      valueOptions: [absenceOption, ...organizersNames],
    },
    {
      field: 'accomodationComment',
      headerName: i18next.t<string>('guest.accommodationNote'),
      width: accommodationCommentCol,
    },
    {
      field: 'accomodation',
      headerName: i18next.t<string>('guest.accommodation'),
      width: accommodationCol,
    },
    {
      field: 'presents',
      headerName: i18next.t<string>('guest.presents'),
      width: presentsCol,
      type: 'boolean',
    },
    {
      field: 'ownsPc',
      headerName: i18next.t<string>('guest.ownComputer'),
      width: ownsPcCol,
      type: 'boolean',
    },
    {
      field: 'speechLength',
      headerName: i18next.t<string>('guest.speechLength'),
      width: speechLengthCol,
      type: 'singleSelect',
      valueGetter: ({ row }) =>
        row.speechLength ? row.speechLength : absenceOption,
      valueOptions: [absenceOption, ...speechLengthOptionsArray],
    },
    {
      field: 'specialNeeds',
      headerName: i18next.t<string>('guest.specialRequirements'),
      width: specialNeedsCol,
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
