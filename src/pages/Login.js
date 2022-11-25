import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material/';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Snack from '../components/Snack';
import { useLogin } from '../hooks';
import { UserContext } from '../contexts/UserContext';

const Login = ({ signIn }) => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    currentUser?.length ? true : false
  );
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [snackbarData, setSnackbarData] = useState(null);
  const { email, password } = values;

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbarData(location.state.snackbar);
    }
  }, [location.state?.snackbar]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    await login(email, password);
    const currentUser = localStorage.getItem('current-user');
    if (currentUser) {
      signIn();
      setIsLoggedIn(true);
    } else {
      setSnackbarData({
        open: true,
        message: 'Email o contraseña incorrectos.',
        type: 'error',
      });
    }
  };

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  if (isLoggedIn) {
    return navigate('/', {
      state: {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Iniciaste sesión correctamente.',
        },
      },
    });
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #009DE6',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            '@media (max-width: 480px)': {
              width: '100vw',
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
                width: '100%',
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
                color: '#FFFFFF',
              }}
            >
              Ingresar
            </Typography>
            <Grid
              container
              direction='column'
              justifyContent='space-between'
              alignItems='center'
              marginTop='30px'
              sx={{
                width: '400px',
                '@media (max-width: 480px)': {
                  width: '100vw',
                },
              }}
            >
              <TextField
                variant='outlined'
                label='Correo electronico'
                name='name'
                value={values.email}
                onChange={handleChange('email')}
                sx={{
                  width: '300px',
                  margin: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                }}
              />
              <FormControl
                sx={{
                  width: '300px',
                  margin: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                }}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  label='password'
                  name='password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{
                  width: '300px',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Link
                  to='/reset-password'
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      fontSize: '14px',
                      '&:hover': {
                        color: '#90caf9',
                      },
                    }}
                  >
                    Olvidé mi contraseña
                  </Typography>
                </Link>
              </Box>
              <Button
                variant='contained'
                sx={{
                  height: '50px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  minWidth: '200px',
                  ':disabled': {
                    backgroundColor: '#999',
                    color: '#555',
                  },
                }}
                disabled={email === '' || password === ''}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  marginTop: '50px',
                }}
              >
                ¿No tienes cuenta?{' '}
                <Link to='/register' style={{ textDecoration: 'none' }}>
                  <Typography
                    sx={{
                      color: '#009bdd',
                      display: 'inline',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: '#90caf9',
                      },
                    }}
                  >
                    Registrate
                  </Typography>
                </Link>
              </Typography>
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

export default Login;
