import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/NavBar';
import Snack from '../components/Snack';
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
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const initialState = {
    name: '',
    subject: '',
    duration: 60,
    frequency: '',
    price: 0,
    description: '',
    type: '',
    published: false,
    teacherId: currentUser?.id,
    inscriptions: [],
    rating: 0,
    imgSrc: '',
  };
  const { id } = useParams();
  const course = useCourseById(id);
  const navigate = useNavigate();
  const [snackbarData, setSnackbarData] = useState(null);
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
    inscriptions,
    imgSrc,
  } = newCourse;

  useEffect(() => {
    if (id !== undefined && course !== undefined) {
      setNewCourse(course);
    }
  }, [id, course]);

  const handleCheckbox = () => {
    if (inscriptions?.length > 0) {
      setSnackbarData({
        message: 'No puedes despublicar una clase con alumnos inscriptos.',
        open: true,
        type: 'error',
      });
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
    }));
    fetch(`${endpoint}/courses`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(newCourse),
    });
    navigate('/courses', {
      state: {
        snackbar: {
          open: true,
          type: 'success',
          message: 'El curso fue creado correctamente.',
        },
      },
    });
  };

  const saveChanges = () => {
    fetch(`${endpoint}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(newCourse),
    });
    navigate('/courses', {
      state: {
        snackbar: {
          open: true,
          type: 'success',
          message: 'El curso fue modificado correctamente.',
        },
      },
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
          label='Duraci??n (en minutos)'
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
          label='Descripci??n'
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
            label='P??blico'
          />
        </FormGroup>
        <FormHelperText sx={{ width: '300px' }}>
          Los alumnos solo podr??n inscribirse a una clase si est?? publicada
        </FormHelperText>
        {published && inscriptions?.length > 0 ? (
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
      {snackbarData !== null && (
        <Snack
          open={snackbarData.open}
          type={snackbarData.type}
          message={snackbarData.message}
          onClose={handleCloseSnack}
        />
      )}
    </>
  );
};

export default NewCourse;
