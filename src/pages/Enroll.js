import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const initialState = {
  studentId: null,
  courseId: null,
  phone: '',
  mail: '',
  timeRangeFrom: '',
  timeRangeTo: '',
  message: '',
};

const style = {
  height: '100%',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiButton-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiInputBase-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiFormLabel-root': {
    fontFamily: 'Montserrat',
  },
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
  input: {
    fontFamily: 'Montserrat',
  },
};

const Enroll = ({ currentUser }) => {
  const { id } = useParams();
  const [newEnrollment, setNewEnrollment] = useState(initialState);
  const { phone, mail, timeRangeFrom, timeRangeTo, message } = newEnrollment;

  const handleChange = (e) => {
    setNewEnrollment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setNewEnrollment((prev) => ({
      ...prev,
      courseId: id,
      studentId: currentUser?.id,
    }));
    // TODO: create new notification
    console.log(newEnrollment);
  };

  return (
    <>
      <NavBar currentUser={currentUser} />
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
          value={phone}
          name='phone'
          onChange={handleChange}
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Email'
          value={mail}
          name='mail'
          onChange={handleChange}
        />

        <Typography>Horario de disponibilidad</Typography>
        <Box display='flex' alignItems='center'>
          <TextField
            value={timeRangeFrom}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label='Desde'
            name='timeRangeFrom'
            onChange={handleChange}
            className='timeRange'
          />
          <TextField
            value={timeRangeTo}
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
          value={message}
          name='message'
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Button
          variant='contained'
          sx={{ height: '50px', margin: '10px' }}
          onClick={handleClick}
        >
          Inscribirse
        </Button>
      </Grid>
    </>
  );
};

export default Enroll;
