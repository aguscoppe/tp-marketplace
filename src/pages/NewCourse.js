import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { endpoint, useCourseById } from '../hooks';

const style = {
  height: '100%',
  '& .MuiButton-root': {
    width: '300px',
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
  '@media (max-width: 700px)': {
    '& input.MuiOutlinedInput-input': {
      padding: '14px',
    },
  },
};

const NewCourse = () => {
  const currentUser = useContext(UserContext);
  const initialState = {
    name: '',
    subject: '',
    type: '',
    teacherId: currentUser?.id,
    students: [],
    duration: 60,
    frequency: '',
    price: 0,
    description: '',
    published: false,
    rating: 0,
    imgSrc: '',
  };
  const { id } = useParams();
  const course = useCourseById(id);
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState(initialState);
  const {
    name,
    subject,
    type,
    duration,
    frequency,
    price,
    description,
    published,
    students,
    imgSrc,
  } = newCourse;

  useEffect(() => {
    if (id !== undefined && course !== undefined) {
      setNewCourse(course);
    }
  }, [id, course]);

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
    navigate('/courses');
  };

  const saveChanges = () => {
    fetch(`${endpoint}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
    navigate('/courses');
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
          label='Nombre'
          value={name || ''}
          name='name'
          onChange={handleChange}
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Materia'
          value={subject || ''}
          name='subject'
          onChange={handleChange}
        />
        <TextField
          value={type || ''}
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
          value={frequency || ''}
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
          value={duration || 90}
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
          value={price || 0}
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
          label='Imagen'
          value={imgSrc || ''}
          name='imgSrc'
          onChange={handleChange}
          type='text'
        />
        <TextField
          autoComplete='off'
          variant='outlined'
          label='Descripción'
          value={description || ''}
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
                checked={published || false}
                name='published'
              />
            }
            label='Publicar'
          />
        </FormGroup>
        <FormHelperText sx={{ width: '300px' }}>
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
            disabled={
              name === '' ||
              subject === '' ||
              type === '' ||
              frequency === '' ||
              price === 0 ||
              description === ''
            }
            onClick={handleClick}
            sx={{ height: '50px', margin: '10px' }}
          >
            Crear
          </Button>
        )}
      </Grid>
    </>
  );
};

export default NewCourse;
