import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';
import Navbar from '../components/NavBar';
import Snack from '../components/Snack';
import { useState, useContext } from 'react';
import { endpoint } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const styles = {
  width: '300px',
  margin: '10px',
  backgroundColor: '#fff',
  borderRadius: '8px',
};

const Register = () => {
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState(
    currentUser?.length ? true : false
  );
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });
  const { firstname, lastname, email, password, phone, role } = newUser;
  const [snackbarData, setSnackbarData] = useState(null);

  const roles = [
    { text: 'Profesor', value: 'profesor' },
    { text: 'Alumno', value: 'alumno' },
  ];

  const handleChange = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const handleRegister = () => {
    fetch(`${endpoint}/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newUser),
    }).then(async (res) => {
      if (res.status === 201) {
        setIsRegistered(true);
      } else {
        setSnackbarData({
          message: 'Email o contraseña incorrectos.',
          open: true,
          type: 'error',
        });
      }
    });
    setNewUser({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      role: '',
    });
  };

  if (isRegistered) {
    return navigate('/login', {
      state: {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Te has registrado correctamente!',
        },
      },
    });
  }

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
        <Navbar />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #009DE6',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            a: {
              color: '#fff',
              '&:hover': {
                color: '#90caf9',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '400px',
              Height: '500px',
              backgroundColor: '#595959',
              borderRadius: '30px',
              padding: '20px',
              boxShadow: 20,
              '@media (max-width: 480px)': {
                width: '100vw',
                height: '100%',
                borderRadius: '0px',
                justifyContent: 'center',
              },
              color: '#FFF',
            }}
          >
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              sx={{
                '@media (max-width: 480px)': {
                  width: '100vw',
                  height: '100%',
                  borderRadius: '0px',
                  justifyContent: 'center',
                },
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 900,
                  marginBottom: '20px',
                }}
              >
                Registrarse
              </Typography>
              <TextField
                variant='outlined'
                label='Nombre'
                value={firstname}
                onChange={handleChange('firstname')}
                sx={styles}
              />
              <TextField
                variant='outlined'
                label='Apellido'
                value={lastname}
                onChange={handleChange('lastname')}
                sx={styles}
              />
              <TextField
                variant='outlined'
                label='Email'
                value={email}
                onChange={handleChange('email')}
                sx={styles}
              />
              <TextField
                variant='outlined'
                type='password'
                label='Password'
                value={password}
                onChange={handleChange('password')}
                sx={styles}
              />
              <TextField
                variant='outlined'
                label='Telefono'
                value={phone}
                onChange={handleChange('phone')}
                sx={styles}
              />
              <TextField
                select
                id='outlined-select-currency'
                variant='outlined'
                label='Rol'
                value={role}
                onChange={handleChange('role')}
                sx={styles}
              >
                {roles.map((rol) => (
                  <MenuItem key={rol.value} value={rol.value}>
                    {rol.text}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant='contained'
                disabled={
                  firstname === '' ||
                  lastname === '' ||
                  email === '' ||
                  password === '' ||
                  phone === '' ||
                  role === ''
                }
                sx={{
                  height: '50px',
                  margin: '10px',
                  marginTop: '20px',
                  minWidth: '200px',
                  ':disabled': {
                    backgroundColor: '#999',
                    color: '#555',
                  },
                }}
                onClick={handleRegister}
              >
                REGISTRARSE
              </Button>
            </Grid>
          </Box>
        </Box>
        {snackbarData !== null && (
          <Snack
            open={snackbarData.open}
            type={snackbarData.type}
            message={snackbarData.message}
            onClose={handleCloseSnack}
          />
        )}
      </Box>
    </>
  );
};

export default Register;
