import NavBar from '../components/NavBar';
import { Box, Grid, Typography } from '@mui/material';

const styles = {
  boxShadow: 20,
  width: '800px',
  height: '500px',
  backgroundColor: '#fff',
  borderRadius: '30px',
  padding: '32px',
  h5: {
    textAlign: 'center',
  },
  '& .MuiTypography-root': {
    margin: '12px',
  },
  '@media (max-width: 1000px)': {
    height: 'auto',
  },
  '@media (max-width: 700px)': {
    h5: {
      fontSize: '18px',
    },
  },
  '@media (max-width: 500px)': {
    width: '100vw',
    height: 'auto',
    padding: '12px',
    h5: {
      fontSize: '14px',
    },
  },
};

const About = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
        }}
      >
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '50px',
            justifyContent: 'start',
            alignItems: 'center',
            background:
              'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #009DE6',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            '@media (max-width: 1000px)': {
              justifyContent: 'center',
            },
            '@media (max-width: 480px)': {
              padding: '10px',
            },
          }}
        >
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={styles}
          >
            <Grid item xs={20} lg={10}>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  ¿Para qué sirve nuestro portal?
                </Typography>
                <Typography variant='body1'>
                  Somos una plataforma de aprendizaje que conecta alumnos y
                  profesores. Un profesor puede crear, editar y eliminar clases.
                  Un alumno puede inscribirse a clases, comentarlas,
                  calificarlas y leer comentarios de otros alumnos. La búsqueda
                  avanzada permite filtrar clases por nombre, tipo de clase,
                  materia o frecuencia.
                </Typography>
              </Box>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  ¿Cómo se usa nuestro portal?
                </Typography>

                <Typography variant='body1'>
                  Para poder comentar o calificar una clase, el alumno deberá
                  estar inscripto a ella y la clase debe estar en estado
                  Aceptado o Finalizado.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default About;
