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
import { endpoint, useCourseById, useCourseName, useUserById } from '../hooks';
import uuid from 'react-uuid';

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
  const {
    id,
    type,
    message,
    blockedComment,
    timeRangeFrom,
    timeRangeTo,
    sourceId,
    destinationId,
    courseId,
  } = data;
  const courseData = useCourseById(courseId);
  const courseName = useCourseName(courseId);
  const sourceUser = useUserById(sourceId);
  const destinationUser = useUserById(destinationId);
  const [showBlockInput, setShowBlockInput] = useState(false);

  const deleteNotification = () => {
    fetch(`${endpoint}/notifications/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    });
  };

  const sendComment = (comment) => {
    const newNotification = {
      courseId: courseId,
      sourceId: destinationId,
      destinationId: sourceId,
      blockedComment: message,
      type: COMMENT_NOTIFICATION,
      message: comment,
      id: uuid(),
    };
    fetch(`${endpoint}/notifications`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newNotification),
    });
    deleteNotification();
  };

  const handleCourseNotification = (e) => {
    const btnText = e.target.value;
    const updatedCourse = {
      ...courseData,
      students: [
        ...courseData.students,
        {
          id: sourceId,
          status:
            btnText === 'Aceptar'
              ? COURSE_STATUS_ACCEPTED
              : COURSE_STATUS_CANCELLED,
        },
      ],
    };
    fetch(`${endpoint}/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedCourse),
    });
    deleteNotification();
  };

  const handleAccept = (type) => {
    if (type === COMMENT_NOTIFICATION) {
      const newComment = {
        id: uuid(),
        courseId: courseId,
        studentId: sourceId,
        message: message,
      };
      fetch(`${endpoint}/comments`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      deleteNotification();
    }
  };

  const handleBlock = () => {
    setShowBlockInput(true);
    deleteNotification();
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
          {message}
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
        Solicitud de {type}
      </Typography>
      <Typography variant='body2'>
        <strong>Alumno:</strong> {sourceUser.name} {sourceUser.surname}
      </Typography>
      {type === COURSE_NOTIFICATION && (
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
          {type === COMMENT_NOTIFICATION ? 'Comentario: ' : 'Mensaje: '}
        </strong>
        {message}
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
            type === COURSE_NOTIFICATION
              ? handleCourseNotification
              : handleAccept
          }
        >
          Aceptar
        </Button>
        <Button
          variant='contained'
          color='error'
          size='small'
          sx={{ margin: '8px' }}
          value={type === COMMENT_NOTIFICATION ? 'Bloquear' : 'Cancelar'}
          onClick={
            type === COMMENT_NOTIFICATION
              ? handleBlock
              : handleCourseNotification
          }
        >
          {type === COMMENT_NOTIFICATION ? 'Bloquear' : 'Cancelar'}
        </Button>
      </Box>
    </Box>
  );
};

export default Notification;
