import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/NavBar';
import Home from './Home';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  capitalize,
  Typography,
} from '@mui/material';
import { STUDENT_ROLE, TEACHER_ROLE } from '../constants';
import EducationInputDialog from '../components/EducationInputDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { endpoint } from '../hooks';

const style = {
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
  '& .MuiTextField-root:first-of-type': {
    marginTop: '50px',
  },
  input: {
    fontFamily: 'Montserrat',
  },
  a: {
    textDecoration: 'none',
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
    '& input.MuiOutlinedInput-textarea': {
      padding: '8px',
    },
    '& .MuiButton-root': {
      fontSize: '12px',
    },
    '& .buttonContainer': {
      flexDirection: 'row',
    },
  },
};

const studentFields = {
  birthDate: '2000-01-01',
  education: [],
};

const teacherFields = {
  degree: '',
  experience: '',
};

const Profile = ({ signOut }) => {
  const currentUser = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) {
      if (currentUser.role === TEACHER_ROLE) {
        setCurrentProfile(() => ({ ...teacherFields, ...currentUser }));
      } else {
        setCurrentProfile(() => ({ ...studentFields, ...currentUser }));
      }
    }
  }, [currentUser]);

  const addEducation = (newEducation) => {
    const updatedProfile = {
      ...currentProfile,
      education: [...currentProfile.education, newEducation],
    };
    fetch(`${endpoint}/users/${currentUser?.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedProfile),
    });
    setCurrentProfile((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('current-user');
    setIsLoggedIn(false);
    signOut();
  };

  const handleChange = (e) => {
    setCurrentProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    localStorage.setItem('current-user', currentProfile.id);
    fetch(`${endpoint}/users/${currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(currentProfile),
    });
  };

  const handleRemove = (index) => {
    const answer = window.confirm(
      '¿Estás seguro/a de que quieres realizar esta acción?'
    );
    if (answer) {
      const newData = {
        ...currentProfile,
        education: currentProfile.education.filter((el, i) => i !== index),
      };
      fetch(`${endpoint}/users/${currentUser?.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newData),
      });
      setCurrentProfile(newData);
    }
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (isLoggedIn) {
    return (
      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            marginTop: '20px',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 480px)': {
              width: '100vw',
            },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              fontFamily: 'Montserrat',
              '@media (max-width: 700px)': {
                fontSize: '24px',
              },
            }}
          >
            Mi Perfil
          </Typography>
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
              value={currentProfile.name || ''}
              name='name'
              onChange={handleChange}
            />
            <TextField
              autoComplete='off'
              variant='outlined'
              label='Apellido'
              value={currentProfile.surname || ''}
              name='surname'
              onChange={handleChange}
            />
            <TextField
              autoComplete='off'
              variant='outlined'
              label='Email'
              value={currentProfile.email || ''}
              name='email'
              onChange={handleChange}
            />
            <TextField
              autoComplete='off'
              variant='outlined'
              label='Teléfono'
              value={currentProfile.phone || ''}
              name='phone'
              onChange={handleChange}
              type='number'
            />
            {currentUser?.role === TEACHER_ROLE && (
              <>
                <TextField
                  autoComplete='off'
                  variant='outlined'
                  label='Título'
                  value={currentProfile.degree || ''}
                  name='degree'
                  onChange={handleChange}
                />
                <TextField
                  autoComplete='off'
                  variant='outlined'
                  label='Experiencia'
                  value={currentProfile.experience || ''}
                  name='experience'
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </>
            )}
            {currentUser?.role === STUDENT_ROLE && (
              <>
                <TextField
                  autoComplete='off'
                  variant='outlined'
                  label='Fecha de nacimiento'
                  value={currentProfile?.birthDate || ''}
                  name='birthDate'
                  onChange={handleChange}
                  type='date'
                />
                {currentProfile?.education?.map((element, index) => (
                  <TextField
                    key={index}
                    autoComplete='off'
                    variant='outlined'
                    label='Estudios Cursados'
                    value={
                      element === undefined
                        ? ''
                        : `${element.name}\n • ${capitalize(
                            element.level
                          )}\n • ${capitalize(element.status)}`
                    }
                    multiline
                    rows={4}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>
                          <IconButton onClick={() => handleRemove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ))}
                <EducationInputDialog
                  open={showDialog}
                  closeDialog={closeDialog}
                  addEducation={addEducation}
                />
                <Button onClick={openDialog}>+ Agrear Estudio Cursado</Button>
              </>
            )}
            <Box
              className='buttonContainer'
              display='flex'
              flexDirection='column'
            >
              <Button
                variant='contained'
                sx={{ height: '50px', margin: '10px' }}
                disabled={
                  currentProfile.name === '' ||
                  currentProfile.surname === '' ||
                  currentProfile.email === '' ||
                  currentProfile.phone === '' ||
                  currentProfile.degree === '' ||
                  currentProfile.experience === ''
                }
                onClick={handleClick}
              >
                Guardar
              </Button>
              <Button
                variant='contained'
                sx={{ height: '50px', margin: '10px' }}
                onClick={handleLogout}
                color='error'
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Grid>
        </Box>
      </Box>
    );
  } else {
    return <Home />;
  }
};

export default Profile;
