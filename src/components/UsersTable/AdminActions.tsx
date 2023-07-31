import { useAppDispatch } from '@/redux/store';
import { deleteUser, updateUser } from '@/redux/users/actions';
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    setLoading(true);

    const result = await dispatch(updateUser(params.row));

    if (result) {
      setSuccess(true);
      setSelectedRowId(null);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm(i18next.t<string>('validation.deleteUser'))) {
      setLoading(true);

      const result = await dispatch(deleteUser(params.row.id));

      if (result) {
        setSuccess(true);
        setSelectedRowId(null);
      }

      setLoading(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (selectedRowId === params.id && success) setSuccess(false);
  }, [selectedRowId]);

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {success ? (
        <Fab color="success" sx={{ width: 40, height: 40 }}>
          <Check />
        </Fab>
      ) : (
        <Fab
          sx={{ width: 40, height: 40 }}
          color="primary"
          disabled={params.id !== selectedRowId || loading}
          onClick={handleUpdate}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={45}
          color="primary"
          sx={{ position: 'absolute', top: -2, left: -3, zIndex: 1 }}
        />
      )}
      <Fab
        sx={{ width: 40, height: 40, ml: 1 }}
        color="error"
        disabled={params.id !== selectedRowId || loading}
        onClick={handleDelete}
      >
        <Delete />
      </Fab>
      {loading && (
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
