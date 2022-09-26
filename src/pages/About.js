import NavBar from '../components/NavBar';
import { Box, Grid, Typography } from '@mui/material';

const styles = {
  boxShadow: 20,
  width: '800px',
  height: '500px',
  backgroundColor: '#fff',
  borderRadius: '30px',
  h5: {
    textAlign: 'center',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    margin: '12px',
  },
  '@media (max-width: 480px)': {
    width: '100vw',
    height: '70vh',
  },
};

const About = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          padding: '50px',
          justifyContent: 'start',
          alignItems: 'center',
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'right',
          height: '92vh',
          '@media (max-width: 1000px)': {
            justifyContent: 'center',
          },
          '@media (max-width: 480px)': {
            padding: '10px',
          },
        }}
      >
        <Grid container alignItems='center' justifyContent='center' sx={styles}>
          <Grid item xs={20} lg={10}>
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                ¿Para qué sirve nuestro portal?
              </Typography>
              <Typography variant='body1'>
                Somos una plataforma de aprendizaje que conecta alumnos y
                profesores. Un profesor puede crear, editar y eliminar clases.
                Un alumno puede inscribirse a clases, comentarlas, calificarlas
                y leer comentarios de otros alumnos. La búsqueda avanzada
                permite filtrar clases por nombre, tipo de clase, materia o
                frecuencia.
              </Typography>
            </Box>
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                ¿Cómo se usa nuestro portal?
              </Typography>

              <Typography variant='body1'>
                Para poder comentar o calificar una clase, el alumno deberá
                estar inscripto a ella y la clase debe estar en estado Aceptado
                o Finalizado.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
