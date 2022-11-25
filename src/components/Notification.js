import { Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import {
  ACCEPT_COMMENT,
  COMMENT_NOTIFICATION,
  COURSE_NOTIFICATION,
  COURSE_ACCEPTED_NOTIFICATION,
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_CANCELLED,
  STUDENT_ROLE,
} from '../constants';
import BlockCommentDialog from './BlockCommentDialog';
import {
  endpoint,
  useCourseById,
  useUserById,
  useInscriptionsComments,
} from '../hooks';
import { UserContext } from '../contexts/UserContext';

const style = {
  width: '300px',
  padding: '6px 12px',
  '&:not(:last-of-type)': {
    borderBottom: '1px solid #ccc',
  },
  '& .email': {
    textDecoration: 'underline',
    color: 'blue',
  },
};

const Notification = ({ data, removeNotification }) => {
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const currentUser = useContext(UserContext);
  const {
    id,
    objectId,
    source,
    timeRangeFrom,
    timeRangeTo,
    description,
    courseId,
    senderUser,
  } = data;
  const key =
    source === COURSE_NOTIFICATION || source === COURSE_ACCEPTED_NOTIFICATION
      ? 'inscriptions'
      : 'comments';
  const inscriptionData = useInscriptionsComments(key, courseId, objectId);
  const courseData = useCourseById(courseId);
  const sourceUser = useUserById(inscriptionData?.student?.id);
  const [showBlockInput, setShowBlockInput] = useState(false);

  const deleteNotification = () => {
    fetch(`${endpoint}/users/${localUser?.id}/notifications/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
    });
    removeNotification();
  };

  const handleInscription = (e) => {
    const btnText = e.target.value;
    const updatedCourse = {
      status:
        btnText === 'Aceptar'
          ? COURSE_STATUS_ACCEPTED
          : COURSE_STATUS_CANCELLED,
    };
    fetch(`${endpoint}/courses/${courseId}/inscriptions/${objectId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(updatedCourse),
    });
    deleteNotification();
  };

  const handleUpdateComment = (status, blockReason = undefined) => {
    let newComment = { status: status };
    if (blockReason) {
      newComment = { ...newComment, description: blockReason };
    }
    fetch(`${endpoint}/courses/${courseId}/comments/${objectId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(newComment),
    });
    deleteNotification();
  };

  const handleBlockComment = () => {
    setShowBlockInput(true);
  };

  const closeDialog = () => {
    setShowBlockInput(false);
  };

  if (currentUser?.role === STUDENT_ROLE) {
    if (source === COURSE_ACCEPTED_NOTIFICATION) {
      return (
        <Box sx={style}>
          <Typography variant='h6' textAlign='center'>
            Inscripción Aceptada
          </Typography>
          <Typography variant='body2'>
            <strong>Curso: </strong> {courseData?.name || ''}
          </Typography>
          <Typography variant='body2'>
            <strong>Profesor: </strong> {senderUser.firstname}{' '}
            {senderUser.lastname}
          </Typography>
          <Typography variant='body2'>
            <strong>Mensaje: </strong>
            {description}
          </Typography>
          <Box display='flex' justifyContent='center'>
            <Button
              variant='contained'
              color='success'
              size='small'
              sx={{ margin: '8px' }}
              value='Aceptar'
              onClick={deleteNotification}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      );
    }
    return (
      <Box sx={style}>
        <Typography variant='h6' textAlign='center'>
          Comentario rechazado
        </Typography>
        <Typography variant='body2'>
          <strong>Profesor: </strong> {senderUser.firstname}{' '}
          {senderUser.lastname}
        </Typography>
        <Typography variant='body2'>
          <strong>Tu comentario: </strong> {inscriptionData?.description}
        </Typography>
        <Typography variant='body2'>
          <strong>Motivo del bloqueo: </strong>
          {description}
        </Typography>
        <Box display='flex' justifyContent='center'>
          <Button
            variant='contained'
            color='success'
            size='small'
            sx={{ margin: '8px' }}
            value='Aceptar'
            onClick={deleteNotification}
          >
            Aceptar
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={style}>
      <Typography variant='h6' textAlign='center'>
        Solicitud de {source}
      </Typography>
      <Typography variant='body2'>
        <strong>Alumno:</strong> {sourceUser.firstname} {sourceUser.lastname}
      </Typography>
      {source === COURSE_NOTIFICATION && (
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
        <strong>Clase:</strong> {courseData?.name || ''}
      </Typography>
      {timeRangeFrom && timeRangeTo ? (
        <Typography variant='body2'>
          <strong>Horario de referencia:</strong> de {timeRangeFrom} a{' '}
          {timeRangeTo}
        </Typography>
      ) : null}
      <Typography variant='body2'>
        <strong>
          {source === COMMENT_NOTIFICATION ? 'Comentario: ' : 'Mensaje: '}
        </strong>
        {description}
      </Typography>
      <BlockCommentDialog
        open={showBlockInput}
        closeDialog={closeDialog}
        sendComment={handleUpdateComment}
      />
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          color='success'
          size='small'
          sx={{ margin: '8px' }}
          value='Aceptar'
          onClick={(e) => {
            source === COURSE_NOTIFICATION
              ? handleInscription(e)
              : handleUpdateComment(ACCEPT_COMMENT);
          }}
        >
          Aceptar
        </Button>
        <Button
          variant='contained'
          color='error'
          size='small'
          sx={{ margin: '8px' }}
          value={source === COMMENT_NOTIFICATION ? 'Bloquear' : 'Cancelar'}
          onClick={
            source === COMMENT_NOTIFICATION
              ? handleBlockComment
              : handleInscription
          }
        >
          {source === COMMENT_NOTIFICATION ? 'Bloquear' : 'Cancelar'}
        </Button>
      </Box>
    </Box>
  );
};

export default Notification;
