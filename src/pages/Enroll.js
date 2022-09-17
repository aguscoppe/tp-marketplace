import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { endpoint, useTeacherByCourseId } from '../hooks';
import uuid from 'react-uuid';
import { COURSE_NOTIFICATION } from '../constants';

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

const Enroll = ({ currentUserId }) => {
  const { id } = useParams();
  const initialState = {
    courseId: id,
    sourceId: currentUserId,
    type: COURSE_NOTIFICATION,
    phone: '',
    mail: '',
    timeRangeFrom: '',
    timeRangeTo: '',
    message: '',
  };
  const teacher = useTeacherByCourseId(id);
  const [newEnrollment, setNewEnrollment] = useState(initialState);
  const { phone, mail, timeRangeFrom, timeRangeTo, message } = newEnrollment;

  useEffect(() => {
    if (teacher !== undefined) {
      setNewEnrollment((prev) => ({
        ...prev,
        destinationId: teacher.id,
      }));
    }
  }, [teacher]);

  const handleChange = (e) => {
    setNewEnrollment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setNewEnrollment((prev) => ({
      ...prev,
      id: uuid(),
    }));
    fetch(`${endpoint}/notifications`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newEnrollment),
    });
  };

  return (
    <>
      <NavBar currentUserId={currentUserId} />
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
