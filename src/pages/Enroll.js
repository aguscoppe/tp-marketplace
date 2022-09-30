import { useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { endpoint, useTeacherByCourseId } from '../hooks';
import uuid from 'react-uuid';
import { COURSE_NOTIFICATION } from '../constants';
import { UserContext } from '../contexts/UserContext';

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
  '@media (max-width: 700px)': {
    '& .MuiInputLabel-root': {
      fontSize: '14px',
    },
    '& .MuiTypography-body1': {
      fontSize: '12px',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '14px',
    },
    '& input.MuiOutlinedInput-input': {
      padding: '14px',
    },
    '& .MuiButton-root': {
      fontSize: '10px',
    },
  },
};

const Enroll = () => {
  const currentUser = useContext(UserContext);
  const { id } = useParams();
  const initialState = {
    courseId: id,
    sourceId: currentUser?.id,
    type: COURSE_NOTIFICATION,
    phone: '',
    email: '',
    timeRangeFrom: '',
    timeRangeTo: '',
    message: '',
  };
  const teacher = useTeacherByCourseId(id);
  const [newEnrollment, setNewEnrollment] = useState(initialState);
  const { phone, email, timeRangeFrom, timeRangeTo, message } = newEnrollment;

  useEffect(() => {
    if (teacher !== undefined) {
      setNewEnrollment((prev) => ({
        ...prev,
        destinationId: teacher.id,
      }));
    }
  }, [teacher]);

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
      id: uuid(),
    };
    fetch(`${endpoint}/notifications`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(enrollment),
    });
    setNewEnrollment(initialState);
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
          value={message || ''}
          name='message'
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
            message === ''
          }
        >
          Inscribirse
        </Button>
      </Grid>
    </>
  );
};

export default Enroll;
