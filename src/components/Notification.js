import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import {
  COMMENT_NOTIFICATION,
  COURSE_NOTIFICATION,
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_CANCELLED,
  STUDENT_ROLE,
} from '../constants';
import BlockCommentDialog from './BlockCommentDialog';
import {
  endpoint,
  useCourseById,
  useCourseName,
  useUserById,
  useInscriptionById,
} from '../hooks';
import uuid from 'react-uuid';

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
  const {
    id,
    objectId,
    source,
    blockedComment,
    timeRangeFrom,
    timeRangeTo,
    sourceId,
    destinationId,
    description,
    courseId,
  } = data;
  // TODO: remove hard-coded data
  const inscriptionData = useInscriptionById(courseId, objectId);
  const courseData = useCourseById(courseId);
  const courseName = useCourseName(courseId);
  const sourceUser = useUserById(inscriptionData?.student?.id);
  const destinationUser = useUserById(destinationId);
  const [showBlockInput, setShowBlockInput] = useState(false);

  // http://localhost:3000/users/:id/notifications/:notificationId
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

  const sendComment = (comment) => {
    const newNotification = {
      courseId: courseId,
      sourceId: destinationId,
      destinationId: sourceId,
      blockedComment: inscriptionData?.reason,
      source: COMMENT_NOTIFICATION,
      reason: comment,
      id: uuid(),
    };
    fetch(`${endpoint}/notifications`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newNotification),
    });
    deleteNotification();
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

  const handleAcceptComment = (type) => {
    const newComment = {
      id: uuid(),
      courseId: courseId,
      studentId: sourceId,
      reason: inscriptionData?.reason,
    };
    fetch(`${endpoint}/comments`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
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

  if (destinationUser.role === STUDENT_ROLE) {
    return (
      <Box sx={style}>
        <Typography variant='h6' textAlign='center'>
          Comentario rechazado
        </Typography>
        <Typography variant='body2'>
          <strong>Profesor: </strong> {sourceUser.name} {sourceUser.surname}
        </Typography>
        <Typography variant='body2'>
          <strong>Tu comentario: </strong> {blockedComment}
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
        <strong>Clase:</strong> {courseName}
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
        sendComment={sendComment}
      />
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          color='success'
          size='small'
          sx={{ margin: '8px' }}
          value='Aceptar'
          onClick={
            source === COURSE_NOTIFICATION
              ? handleInscription
              : handleAcceptComment
          }
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
