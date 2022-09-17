import { useState } from 'react';
import NavBar from '../components/NavBar';
import {
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { typeItems, frequencyItems } from '../components/SearchBar';
import { Link, useParams } from 'react-router-dom';
import { courses } from '../data';
import uuid from 'react-uuid';
import { endpoint } from '../hooks';

const style = {
  height: '100%',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiButton-root': {
    width: '300px',
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
    marginTop: '50px',
  },
  a: {
    textDecoration: 'none',
  },
  input: {
    fontFamily: 'Montserrat',
  },
};

const NewCourse = ({ currentUserId }) => {
  const initialState = {
    name: '',
    type: '',
    teacherId: currentUserId,
    students: [],
    duration: 60,
    frequency: '',
    price: 0,
    description: '',
    published: false,
    rating: 0,
  };
  const { id } = useParams();
  const courseData = courses.filter((course) => course.id == id);
  const [newCourse, setNewCourse] = useState(
    courseData.length > 0 ? courseData[0] : initialState
  );
  const {
    name,
    type,
    duration,
    frequency,
    price,
    description,
    published,
    students,
  } = newCourse;

  const handleCheckbox = () => {
    if (students.length > 0) {
      alert('No puedes despublicar una clase con alumnos inscriptos');
    } else {
      setNewCourse((prev) => ({
        ...prev,
        published: !prev.published,
      }));
    }
  };

  const handleChange = (e) => {
    setNewCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setNewCourse((prev) => ({
      ...prev,
      id: uuid(),
    }));
    fetch(`${endpoint}/courses`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
  };

  const saveChanges = () => {
    fetch(`${endpoint}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newCourse),
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
          label='Materia'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <TextField
          value={type}
          select
          label='Tipo de clase'
          name='type'
          onChange={handleChange}
        >
          {typeItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={frequency}
          select
          label='Frecuencia'
          name='frequency'
          onChange={handleChange}
        >
          {frequencyItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Duración (en minutos)'
          value={duration}
          name='duration'
          onChange={handleChange}
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Costo'
          value={price}
          name='price'
          onChange={handleChange}
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Descripción'
          value={description}
          name='description'
          onChange={handleChange}
          multiline
          rows={4}
        />
        <FormGroup sx={{ width: '300px' }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckbox}
                checked={published}
                name='published'
              />
            }
            label='Publicar'
          />
        </FormGroup>
        <FormHelperText sx={{ width: '300px', fontFamily: 'Montserrat' }}>
          Los alumnos solo podrán inscribirse a una clase si está publicada
        </FormHelperText>
        {published && students.length > 0 ? (
          <Box display='flex' flexDirection='column'>
            <Link to={`/students/${id}`}>
              <Button
                variant='outlined'
                sx={{ height: '50px', margin: '10px' }}
              >
                Lista de alumnos
              </Button>
            </Link>
          </Box>
        ) : null}
        {id ? (
          <Button
            variant='contained'
            sx={{ height: '50px', margin: '10px' }}
            onClick={saveChanges}
          >
            Guardar
          </Button>
        ) : (
          <Button
            variant='contained'
            sx={{ height: '50px', margin: '10px' }}
            onClick={handleClick}
          >
            Crear
          </Button>
        )}
      </Grid>
    </>
  );
};

export default NewCourse;
