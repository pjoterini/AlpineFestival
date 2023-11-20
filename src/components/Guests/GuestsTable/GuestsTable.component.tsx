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
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { IGuest } from '@/redux/guests/interfaces';
import { IUser } from '@/redux/users/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { useState } from 'react';
import GuestEditModal from './GuestEditModal.container';

interface IProps {
  guests: IGuest[];
  users: IUser[];
  accommodations: IAccommodation[];
}

const GuestsTable = ({ guests, users, accommodations }: IProps) => {
  const [currentRow, setCurrentRow] = useState<IGuest | null>(null);

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
      field: 'checkIn',
      headerName: i18next.t<string>('guest.checkIn'),
      width: checkInCol,
      type: 'boolean',
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
      valueGetter: ({ row }) => {
        const user = users.find((user) => user.id === row.organizer);
        if (!user) {
          return '';
        }
        const userName = `${user?.firstName} ${user?.lastName}`;

        return userName;
      },
    },
    {
      field: 'accomodation',
      headerName: i18next.t<string>('guest.accommodation'),
      width: accommodationCol,
      valueGetter: ({ row }) => {
        const accommodation = accommodations.find(
          (accommodation) => accommodation.id === row.accommodation
        );
        if (!accommodation) {
          return '';
        }

        return accommodation.name;
      },
    },
    {
      field: 'accomodationComment',
      headerName: i18next.t<string>('guest.accommodationNote'),
      width: accommodationCommentCol,
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
      <GuestEditModal
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        users={users}
        accommodations={accommodations}
      />
    </>
  );
};

export default GuestsTable;
