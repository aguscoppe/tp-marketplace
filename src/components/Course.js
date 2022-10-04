import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import {
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_CANCELLED,
  COURSE_STATUS_FINISHED,
  COURSE_STATUS_PENDING,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from '../constants';
import { isUserEnrolled, capitalize, getRating } from '../utils';
import { useUserById, endpoint } from '../hooks';

const statusItems = [
  { key: 1, value: '', label: 'Estado' },
  { key: 2, value: COURSE_STATUS_PENDING, label: 'Pendiente' },
  { key: 3, value: COURSE_STATUS_CANCELLED, label: 'Cancelada' },
  { key: 4, value: COURSE_STATUS_ACCEPTED, label: 'Aceptada' },
  { key: 5, value: COURSE_STATUS_FINISHED, label: 'Finalizada' },
];

const styles = {
  display: 'flex',
  alignItems: 'center',
  width: '300px',
  margin: '15px',
  '& .MuiCardContent-root': {
    width: '100%',
  },
  a: {
    color: '#000',
  },
  '@media (max-width: 700px)': {
    h5: {
      fontSize: '18px',
    },
    h6: {
      fontSize: '15px',
    },
    '& .MuiSelect-select': {
      fontSize: '12px',
      padding: '10px',
    },
    '& .MuiIconButton-root': {
      padding: '0 6px 0 6px',
    },
  },
};

const Course = ({ courseData, removeCourse }) => {
  const currentUser = useContext(UserContext);
  const {
    id,
    name,
    subject,
    type,
    frequency,
    rating,
    teacherId,
    students,
    imgSrc,
  } = courseData;
  const { pathname } = useLocation();
  const enrolledStudents = students.filter(
    (student) => student.id === currentUser?.id
  );
  const teacherData = useUserById(teacherId);
  const [courseStatus, setCourseSatus] = useState(enrolledStudents[0]?.status);
  const [courseRating, setCourseRating] = useState(getRating(rating));

  const handleStatusChange = (e) => {
    if (
      courseStatus !== COURSE_STATUS_PENDING &&
      e.target.value !== COURSE_STATUS_PENDING &&
      e.target.value !== ''
    ) {
      const newStudentData = students.filter(
        (student) => student.id !== currentUser?.id
      );
      const newData = {
        ...courseData,
        students: [
          ...newStudentData,
          { id: currentUser?.id, status: e.target.value },
        ],
      };
      fetch(`${endpoint}/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newData),
      });
      setCourseSatus(e.target.value);
    } else {
      alert('No puedes realizar esta acción');
    }
  };

  const handleRemoveCourse = () => {
    const answer = window.confirm(
      '¿Estás seguro/a de que quieres realizar esta acción?'
    );
    if (answer) {
      removeCourse();
      fetch(`${endpoint}/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
    }
  };

  const handleRatingChange = (newValue) => {
    const newRating = courseData.rating.filter(
      (el) => el.id !== currentUser?.id
    );
    const newData = {
      ...courseData,
      rating: [...newRating, { id: currentUser?.id, score: newValue }],
    };
    fetch(`${endpoint}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newData),
    });
    setCourseRating(newValue);
  };

  return (
    <Card sx={styles}>
      <CardContent sx={{ padding: 0 }}>
        <Link to={`/course/${id}`} style={{ textDecoration: 'none' }}>
          <Box
            component='img'
            sx={{
              height: '100%',
              width: '100%',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 300 },
              objectFit: 'cover',
            }}
            alt={name}
            src={imgSrc}
          />
          <Box
            sx={{
              padding: '16px',
              '@media (max-width: 700px)': {
                paddingBottom: '0',
              },
            }}
          >
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant='h6'>{`${teacherData.name} ${teacherData.surname}`}</Typography>
            <Typography>Clase de {subject}</Typography>
            <Typography>{capitalize(type)}</Typography>
            <Typography>{capitalize(frequency)}</Typography>
          </Box>
        </Link>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ padding: '0px 16px 0px 16px' }}
        >
          <Rating
            value={courseRating}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
            readOnly={
              !isUserEnrolled(currentUser?.id, courseData) ||
              courseStatus === COURSE_STATUS_PENDING ||
              courseStatus === COURSE_STATUS_CANCELLED
            }
          />
          <Box>
            {currentUser?.role === TEACHER_ROLE ? (
              <>
                <Link to={`edit/${id}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to=''>
                  <IconButton onClick={handleRemoveCourse}>
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </>
            ) : (
              <Link to={`/course/${id}`}>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </Link>
            )}
          </Box>
        </Box>
        {currentUser?.role === STUDENT_ROLE && pathname.includes('courses') && (
          <Box display='flex' justifyContent='center'>
            <TextField
              value={courseStatus || ''}
              select
              label='Estado'
              name='status'
              onChange={handleStatusChange}
              disabled={courseStatus === COURSE_STATUS_CANCELLED}
              sx={{
                marginTop: '10px',
                width: '90%',
              }}
            >
              {statusItems.map((item, index) => (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Course;
