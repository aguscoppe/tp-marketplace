import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const style = {
  backgroundColor: '#009DE6',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '92vh',
  '@media (max-width: 700px)': {
    height: '40vh',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  '& .MuiButton-root': {
    fontFamily: 'Montserrat',
    margin: '16px 16px 0 0',
  },
  a: {
    textDecoration: 'none',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  h1: {
    '@media (max-width: 700px)': {
      fontSize: '3rem',
    },
  },
  h4: {
    '@media (max-width: 700px)': {
      fontSize: '1.2rem',
    },
  },
};

const Header = () => {
  return (
    <>
      <Grid
        container
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={style}
      >
        <Grid item xs={10} lg={6}>
          <Typography variant='h1'>CourseHero</Typography>
          <Typography variant='h4'>
            ¡Bienvenido a nuestra plataforma de aprendizaje!
          </Typography>
          <a href='#courses'>
            <Button variant='contained' size='large'>
              Buscar Clases
            </Button>
          </a>
          <Link to='/about'>
            <Button
              variant='contained'
              size='large'
              sx={{
                backgroundColor: '#fff',
                color: '#1976D2',
                '&:hover': {
                  backgroundColor: '#eee',
                },
              }}
            >
              + info
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={4}
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            '@media (max-width: 1200px)': {
              display: 'none',
            },
          }}
        >
          <img
            src='https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png'
            alt='header'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
