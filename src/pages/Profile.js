import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Home from './Home';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { STUDENT_ROLE, TEACHER_ROLE } from '../constants';
import EducationInputDialog from '../components/EducationInputDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { endpoint, useUserById } from '../hooks';

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
  '& .MuiTextField-root:first-of-type': {
    marginTop: '50px',
  },
  input: {
    fontFamily: 'Montserrat',
  },
  a: {
    textDecoration: 'none',
  },
};

const Profile = ({ currentUserId, signOut }) => {
  const currentUser = useUserById(currentUserId);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    experience: '',
    education: [],
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (currentUser !== undefined) {
      setCurrentProfile(() => currentUser);
    }
  }, [currentUser]);

  const addEducation = (newEducation) => {
    const updatedProfile = {
      ...currentProfile,
      education: [...currentProfile.education, newEducation],
    };
    fetch(`${endpoint}/users/${currentUserId}`, {
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
    setCurrentProfile((prev) => ({
      ...prev,
      education: prev.education.filter((el, i) => i !== index),
    }));
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (isLoggedIn) {
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
            label='Nombre'
            value={currentProfile.name !== undefined ? currentProfile.name : ''}
            name='name'
            onChange={handleChange}
          />
          <TextField
            autoComplete='off'
            variant='outlined'
            label='Apellido'
            value={currentProfile.surname ? currentProfile.surname : ''}
            name='surname'
            onChange={handleChange}
          />
          <TextField
            autoComplete='off'
            variant='outlined'
            label='Email'
            value={currentProfile.email ? currentProfile.email : ''}
            name='email'
            onChange={handleChange}
          />
          <TextField
            autoComplete='off'
            variant='outlined'
            label='Teléfono'
            value={currentProfile.phone ? currentProfile.phone : ''}
            name='phone'
            onChange={handleChange}
          />
          {currentUser?.role === TEACHER_ROLE && (
            <TextField
              autoComplete='off'
              variant='outlined'
              label='Experiencia'
              value={currentProfile.experience}
              name='experience'
              onChange={handleChange}
              multiline
              rows={4}
            />
          )}
          {currentUser?.role === STUDENT_ROLE && (
            <>
              {currentProfile?.education?.map((element, index) => (
                <TextField
                  key={index}
                  autoComplete='off'
                  variant='outlined'
                  label='Estudios Cursados'
                  value={
                    element === undefined
                      ? ''
                      : `${element.name} (${element.level} - ${element.status})`
                  }
                  multiline
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
          <Box display='flex' flexDirection='column'>
            <Button
              variant='contained'
              sx={{ height: '50px', margin: '10px' }}
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
      </>
    );
  } else {
    return <Home />;
  }
};

export default Profile;
