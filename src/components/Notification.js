import { Box, Button, Typography } from '@mui/material';
import { COMMENT_REQUEST, COURSE_REQUEST } from '../constants';
import { courses, users } from '../data';

const getCourseName = (id) => {
  const filtered = courses.filter((course) => course.id === id);
  const [course] = filtered;
  return course.name;
};

const style = {
  width: '300px',
  padding: '6px 12px',
  '&:not(:last-of-type)': {
    borderBottom: '1px solid #ccc',
  },
  '& .MuiButton-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .email': {
    textDecoration: 'underline',
    color: 'blue',
  },
};

const Notification = ({ data }) => {
  const { type, message, time, sourceId, courseId } = data;
  const sourceUserArray = users.filter((user) => user.id === sourceId);
  const [sourceUser] = sourceUserArray;
  return (
    <Box sx={style}>
      <Typography variant='h6' textAlign='center'>
        Solicitud de {type === COMMENT_REQUEST ? 'comentario' : 'clase'}
      </Typography>
      <Typography variant='body2'>
        <strong>Alumno:</strong> {sourceUser.name} {sourceUser.surname}
      </Typography>
      {type === COURSE_REQUEST && (
        <>
          <Typography variant='body2'>
            <strong>Email: </strong>
            <span className='email'>{sourceUser.email}</span>
          </Typography>
          <Typography variant='body2'>
            <strong>Teléfono: </strong>
            {sourceUser.phone}
          </Typography>
        </>
      )}
      <Typography variant='body2'>
        <strong>Clase:</strong> {getCourseName(courseId)}
      </Typography>
      {time && (
        <Typography variant='body2'>
          <strong>Horario de referencia:</strong> {time}
        </Typography>
      )}
      <Typography variant='body2'>
        <strong>
          {type === COMMENT_REQUEST ? 'Comentario: ' : 'Mensaje: '}
        </strong>
        {message}
      </Typography>
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          color='success'
          size='small'
          sx={{ margin: '8px' }}
        >
          Aceptar
        </Button>
        <Button
          variant='contained'
          color='error'
          size='small'
          sx={{ margin: '8px' }}
        >
          {type === COMMENT_REQUEST ? 'Bloquear' : 'Cancelar'}
        </Button>
      </Box>
    </Box>
  );
};

export default Notification;
