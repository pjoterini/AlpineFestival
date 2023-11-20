import { useEffect } from 'react';
import { fetchGuests } from '@/redux/guests/actions';
import { selectGuests } from '@/redux/guests/selectors';
import { selectUsers } from '@/redux/users/selectors';
import { fetchUsers } from '@/redux/users/actions';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import GuestsTable from './GuestsTable.component';
import { selectAccommodations } from '@/redux/accomodations/selectors';
import { fetchAccommodations } from '@/redux/accomodations/actions';

const GuestsTableContainer = () => {
  const guests = useAppSelector(selectGuests);
  const users = useAppSelector(selectUsers);
  const accommodations = useAppSelector(selectAccommodations);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGuests());
    dispatch(fetchAccommodations());
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  return (
    <GuestsTable
      guests={guests}
      users={users}
      accommodations={accommodations}
    />
  );
};

export default GuestsTableContainer;
