import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';
import Navbar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { endpoint, useUsers } from '../hooks';

const Register = () => {
  const userList = useUsers();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });
  const { name, surname, email, password, phone, role } = newUser;

  const roles = [
    { text: 'Profesor', value: 'profesor' },
    { text: 'Alumno', value: 'alumno' },
  ];

  useEffect(() => {
    if (userList !== undefined) {
      setUsers(userList);
    }
  }, [userList]);

  const handleChange = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const handleRegister = () => {
    if (users.some((el) => el.email === newUser.email)) {
      alert('email ya registrado');
    } else {
      fetch(`${endpoint}/users`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      setNewUser({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        role: '',
      });
    }
  };

  const styles = {
    width: '300px',
    margin: '10px',
    backgroundColor: '#fff',
    fontFamily: 'Montserrat',
    borderRadius: '8px',
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: '100vw',
          height: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
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
            padding: '40px',
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
              sx={{ fontWeight: 900, margin: '20px', fontFamily: 'Montserrat' }}
            >
              Registrarse
            </Typography>
            <TextField
              variant='outlined'
              label='Nombre'
              value={name}
              onChange={handleChange('name')}
              sx={styles}
            />
            <TextField
              variant='outlined'
              label='Apellido'
              value={surname}
              onChange={handleChange('surname')}
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
                name === '' ||
                surname === '' ||
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
                fontFamily: 'Montserrat',
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
    </>
  );
};

export default Register;
