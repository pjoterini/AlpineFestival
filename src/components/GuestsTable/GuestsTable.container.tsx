import { getGuests } from '@/firebase/database/guest/getGuests';
import { IGuest } from '@/redux/guest/interfaces';
import { useEffect, useState } from 'react';
import GuestsTable from './GuestsTable.component';

const GuestsTableContainer = () => {
  const [guests, setGuests] = useState<IGuest[]>([]);

  useEffect(() => {
    const guestGetter = async () => {
      const data = await getGuests();
      if (data) {
        setGuests(data);
      }
    };

    guestGetter();
  }, []);

  return <GuestsTable guests={guests} />;
};

export default GuestsTableContainer;
