import { fetchAccommodations } from '@/redux/accomodations/actions';
import { selectAccommodations } from '@/redux/accomodations/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import AccommodationsTable from './AccommodationsTable.component';

const AccommodationsTableContainer = () => {
  const accommodations = useAppSelector(selectAccommodations);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  return <AccommodationsTable accommodations={accommodations} />;
};

export default AccommodationsTableContainer;
