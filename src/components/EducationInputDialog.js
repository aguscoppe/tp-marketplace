import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  EDUCATION_LEVEL_PRIMARY,
  EDUCATION_LEVEL_SECONDARY,
  EDUCATION_LEVEL_TERTIARY,
  EDUCATION_LEVEL_UNIVERSITY,
  EDUCATION_STATUS_ONGOING,
  EDUCATION_STATUS_PAUSED,
  EDUCATION_STATUS_DROPPED,
  EDUCATION_STATUS_FINISHED,
} from '../constants';

const educationLevelItems = [
  { key: 1, value: '', label: 'Nivel Educativo' },
  { key: 2, value: EDUCATION_LEVEL_PRIMARY, label: 'Primario' },
  { key: 3, value: EDUCATION_LEVEL_SECONDARY, label: 'Secundario' },
  { key: 4, value: EDUCATION_LEVEL_TERTIARY, label: 'Terciario' },
  { key: 5, value: EDUCATION_LEVEL_UNIVERSITY, label: 'Universitario' },
];

const educationStatusItems = [
  { key: 1, value: '', label: 'Estado' },
  { key: 2, value: EDUCATION_STATUS_ONGOING, label: 'En curso' },
  { key: 3, value: EDUCATION_STATUS_PAUSED, label: 'Pausado' },
  { key: 4, value: EDUCATION_STATUS_DROPPED, label: 'Abandonado' },
  { key: 5, value: EDUCATION_STATUS_FINISHED, label: 'Finalizado' },
];

const style = {
  padding: '50px',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiButton-root': {
    width: '300px',
    margin: '10px',
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

  '& .MuiTextField-root:first-of-type': {
    marginTop: '30px',
  },
  input: {
    fontFamily: 'Montserrat',
  },
  a: {
    textDecoration: 'none',
  },
};

const EducationInputDialog = ({ open, closeDialog, addEducation }) => {
  const [education, setEducation] = useState({
    name: '',
    level: '',
    status: '',
  });
  const { name, level, status } = education;

  const handleChange = (e) => {
    setEducation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open}>
      <Box display='flex' flexDirection='column' sx={style}>
        <Typography variant='h5' textAlign='center'>
          Nuevo estudio
        </Typography>
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Estudio Cursado'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <TextField
          value={level}
          select
          label='Nivel Educativo'
          name='level'
          onChange={handleChange}
        >
          {educationLevelItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={status}
          select
          label='Estado'
          name='status'
          onChange={handleChange}
        >
          {educationStatusItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant='contained'
          color='success'
          disabled={name === ''}
          onClick={() => {
            closeDialog();
            setEducation({});
            addEducation(education);
          }}
        >
          Agregar
        </Button>
        <Button variant='contained' color='error' onClick={closeDialog}>
          Cancelar
        </Button>
      </Box>
    </Dialog>
  );
};

export default EducationInputDialog;
