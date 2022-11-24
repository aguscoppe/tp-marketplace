import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Snack from '../components/Snack';
import { endpoint } from '../hooks';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [snackbarData, setSnackbarData] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecovery = () => {
    fetch(`${endpoint}/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      if (res.status === 200) {
        setSnackbarData({
          message: 'Revisa tu mail para ver tu nueva contraseña.',
          open: true,
          type: 'success',
        });
      } else {
        setSnackbarData({
          message: 'Se ha producido un error. Intenta nuevamente.',
          open: true,
          type: 'error',
        });
      }
      setEmail('');
    });
  };

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
              boxShadow: 20,
              width: '400px',
              height: '470px',
              backgroundColor: '#595959',
              color: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20px',
              '@media (max-width: 480px)': {
                width: '100vw',
                height: '100%',
                borderRadius: '0px',
              },
            }}
          >
            <Box
              sx={{
                width: '300px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>
              <Typography
                sx={{
                  marginTop: '20px',
                  textAlign: 'justify',
                  letterSpacing: 0,
                }}
              >
                Ingresa tu correo electrónico y te estaremos enviando un mail
                con las instrucciones para volver a ingresar.
              </Typography>
            </Box>
            <TextField
              variant='outlined'
              label='Correo electronico'
              name='email'
              value={email}
              onChange={handleChange}
              sx={{
                marginTop: '50px',
                minWidth: '150px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                width: '300px',
              }}
            />
            <Button
              variant='contained'
              sx={{
                height: '50px',
                marginTop: '20px',
                marginBottom: '20px',
                minWidth: '150px',
                borderRadius: '8px',
                width: '300px',
              }}
              onClick={handleRecovery}
            >
              Recuperar contraseña
            </Button>
            <Typography
              sx={{
                color: '#90caf9',
                fontSize: '14px',
              }}
            >
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                }}
              >
                Volver al Login
              </Link>
            </Typography>
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

export default ResetPassword;
