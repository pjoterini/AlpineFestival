import { deleteGuest, updateGuest } from '@/redux/guests/actions';
import { useAppDispatch } from '@/redux/store';
import { Check, Delete, Save } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material';
import { GridCellParams, GridRowId } from '@mui/x-data-grid';
import i18next from 'i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IProps {
  params: GridCellParams;
  selectedRowId: GridRowId | null;
  setSelectedRowId: Dispatch<SetStateAction<GridRowId | null>>;
}

const UsersActions = ({ params, selectedRowId, setSelectedRowId }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    setIsLoading(true);

    const result = await dispatch(updateGuest(params.row));

    if (result) {
      setIsSuccess(true);
      setSelectedRowId(null);
    }

    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm(i18next.t<string>('validation.deleteGuest'))) {
      setIsLoading(true);

      const result = await dispatch(deleteGuest(params.row.id));

      if (result) {
        setSelectedRowId(null);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRowId === params.id && isSuccess) setIsSuccess(false);
  }, [selectedRowId]);

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {isSuccess ? (
        <Fab color="success" sx={{ width: 40, height: 40 }}>
          <Check />
        </Fab>
      ) : (
        <Fab
          sx={{ width: 40, height: 40 }}
          color="primary"
          disabled={params.id !== selectedRowId || isLoading}
          onClick={handleUpdate}
        >
          <Save />
        </Fab>
      )}
      {isLoading && (
        <CircularProgress
          size={45}
          color="primary"
          sx={{ position: 'absolute', top: -2, left: -3, zIndex: 1 }}
        />
      )}
      <Fab
        sx={{ width: 40, height: 40, ml: 1 }}
        color="error"
        disabled={params.id !== selectedRowId || isLoading}
        onClick={handleDelete}
      >
        <Delete />
      </Fab>
      {isLoading && (
        <CircularProgress
          size={45}
          color="primary"
          sx={{ position: 'absolute', top: -2, left: 46, zIndex: 1 }}
        />
      )}
    </Box>
  );
};

export default UsersActions;
