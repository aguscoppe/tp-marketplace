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
import { endpoint, useTeacherStudentById } from '../hooks';

const style = {
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
    '& input.MuiOutlinedInput-textarea': {
      padding: '8px',
    },
    '& .buttonContainer': {
      flexDirection: 'row',
    },
  },
};

const Profile = ({ signOut }) => {
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const user = useContext(UserContext);
  const key = user.role === TEACHER_ROLE ? 'teachers' : 'students';
  const currentUser = useTeacherStudentById(user.id, key);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) {
      if (currentUser.role === TEACHER_ROLE) {
        const teacherObj = {
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          email: currentUser.email,
          phone: currentUser.phone,
          title: currentUser.title || '',
          experience: currentUser.experience || '',
        };
        setCurrentProfile(teacherObj);
      } else {
        const studentObj = {
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          email: currentUser.email,
          phone: currentUser.phone,
          birthday:
            currentUser.birthday || new Date('2000-01-01').toISOString(),
          educationalDegrees: currentUser.educationalDegrees || [],
        };
        setCurrentProfile(studentObj);
      }
    }
  }, [currentUser]);

  const addEducation = (newEducation) => {
    const updatedProfile = {
      ...currentProfile,
      educationalDegrees: [...currentProfile.educationalDegrees, newEducation],
    };
    fetch(`${endpoint}/users/${currentUser?.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedProfile),
    });
    setCurrentProfile((prev) => ({
      ...prev,
      educationalDegrees: [...prev.educationalDegrees, newEducation],
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
      [e.target.name]:
        e.target.name === 'birthday'
          ? new Date(e.target.value).toISOString()
          : e.target.value,
    }));
  };

  const handleClick = () => {
    fetch(`${endpoint}/${key}/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
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
        educationalDegrees: currentProfile.educationalDegrees.filter(
          (el, i) => i !== index
        ),
      };
      fetch(`${endpoint}/students/${currentUser?.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localUser?.token}`,
        },
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

  if (!isLoggedIn) {
    return <Home />;
  }

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
            value={currentProfile.firstname || ''}
            name='firstname'
            onChange={handleChange}
          />
          <TextField
            autoComplete='off'
            variant='outlined'
            label='Apellido'
            value={currentProfile.lastname || ''}
            name='lastname'
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
                value={currentProfile.title || ''}
                name='title'
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
                value={currentProfile?.birthday.slice(0, 10) || '2000-01-01'}
                name='birthday'
                onChange={handleChange}
                type='date'
              />
              {currentProfile?.educationalDegrees?.map((element, index) => (
                <TextField
                  key={index}
                  autoComplete='off'
                  variant='outlined'
                  label='Estudios Cursados'
                  value={
                    element === undefined
                      ? ''
                      : `${element.description}\n • ${capitalize(
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
                currentProfile.firstname === '' ||
                currentProfile.lastname === '' ||
                currentProfile.email === '' ||
                currentProfile.phone === '' ||
                currentProfile.title === '' ||
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
};

export default Profile;
