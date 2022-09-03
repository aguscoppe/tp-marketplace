import NavBar from '../components/NavBar';
import { Grid, Typography } from '@mui/material';

const styles = {
  marginTop: '50px',
  h5: {
    textAlign: 'center',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    margin: '12px',
  },
};

const About = ({ currentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} />
      <Grid container justifyContent='center' sx={styles}>
        <Grid item xs={11} lg={10}>
          <Typography variant='h5'>¿Para qué sirve nuestro portal?</Typography>
          <Typography variant='body1'>
            Somos una plataforma de aprendizaje que conecta alumnos y
            profesores. Un profesor puede crear, editar y eliminar clases. Un
            alumno puede inscribirse a clases, comentarlas, calificarlas y leer
            comentarios de otros alumnos. La búsqueda avanzada permite filtrar
            clases por nombre, tipo de clase, materia o frecuencia.
          </Typography>
          <Typography variant='h5'>¿Cómo se usa nuestro portal?</Typography>
          <Typography variant='body1'>
            Para poder comentar o calificar una clase, el alumno deberá estar
            inscripto a ella y la clase debe estar en estado Aceptado o
            Finalizado.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
