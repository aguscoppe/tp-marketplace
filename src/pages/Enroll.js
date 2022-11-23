import { useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { endpoint } from '../hooks';
import { UserContext } from '../contexts/UserContext';
import Snack from '../components/Snack';

const style = {
  height: '100%',
  '& .MuiTextField-root': {
    width: '300px',
    margin: '10px',
    backgroundColor: '#fff',
  },
  '& .timeRange': {
    width: '140px',
  },
  '& .MuiTextField-root:first-of-type:not(.timeRange)': {
    marginTop: '50px',
  },
  '@media (max-width: 700px)': {
    '& input.MuiOutlinedInput-input': {
      padding: '14px',
    },
  },
};

const Enroll = () => {
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const currentUser = useContext(UserContext);
  const { id } = useParams();
  const initialState = {
    phone: '',
    email: '',
    reason: '',
    timeRangeFrom: '',
    timeRangeTo: '',
    studentId: currentUser?.id,
  };
  const [newEnrollment, setNewEnrollment] = useState(initialState);
  const [snackbarData, setSnackbarData] = useState(null);
  const { phone, email, timeRangeFrom, timeRangeTo, reason } = newEnrollment;

  useEffect(() => {
    setNewEnrollment((prev) => ({
      ...prev,
      phone: currentUser.phone,
      email: currentUser.email,
    }));
  }, [currentUser]);

  const handleChange = (e) => {
    setNewEnrollment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    const enrollment = {
      ...newEnrollment,
    };
    fetch(`${endpoint}/courses/${id}/inscriptions`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(enrollment),
    });
    setNewEnrollment(initialState);
    setSnackbarData({
      open: true,
      message: 'Tu solicitud de inscripción se realizó correctamente.',
      type: 'success',
    });
  };

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <>
      <NavBar />
      <Grid
        container
        sx={style}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Número de teléfono'
          value={phone || 0}
          name='phone'
          onChange={handleChange}
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Email'
          value={email || ''}
          name='mail'
          onChange={handleChange}
        />

        <Typography>Horario de disponibilidad</Typography>
        <Box display='flex' alignItems='center'>
          <TextField
            value={timeRangeFrom || ''}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label='Desde'
            name='timeRangeFrom'
            onChange={handleChange}
            className='timeRange'
          />
          <TextField
            value={timeRangeTo || ''}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label='Hasta'
            name='timeRangeTo'
            onChange={handleChange}
            className='timeRange'
          />
        </Box>
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Mensaje'
          value={reason || ''}
          name='reason'
          onChange={handleChange}
          multiline={true}
          rows={4}
        />
        <Button
          variant='contained'
          sx={{ height: '50px', margin: '10px' }}
          onClick={handleClick}
          disabled={
            phone === '' ||
            email === '' ||
            timeRangeFrom === '' ||
            timeRangeTo === '' ||
            reason === ''
          }
        >
          Inscribirse
        </Button>
        {snackbarData !== null && (
          <Snack
            open={snackbarData.open}
            type={snackbarData.type}
            message={snackbarData.message}
            onClose={handleCloseSnack}
          />
        )}
      </Grid>
    </>
  );
};

export default Enroll;
