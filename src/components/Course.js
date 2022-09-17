import { useState } from 'react';
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
import { isUserEnrolled } from '../utils';
import { useCourseStudents, useUserById, endpoint } from '../hooks';

const statusItems = [
  { key: 1, value: '', label: 'Estado' },
  { key: 2, value: COURSE_STATUS_PENDING, label: 'Pendiente' },
  { key: 3, value: COURSE_STATUS_CANCELLED, label: 'Cancelada' },
  { key: 4, value: COURSE_STATUS_ACCEPTED, label: 'Aceptada' },
  { key: 5, value: COURSE_STATUS_FINISHED, label: 'Finalizada' },
];

const styles = {
  width: '250px',
  margin: '15px',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    textTransform: 'capitalize',
  },
  a: {
    color: '#000',
  },
};

const Course = ({ courseData, currentUserId, removeCourse }) => {
  const currentUser = useUserById(currentUserId);
  const { id, name, type, frequency, rating, teacherId } = courseData;
  const { pathname } = useLocation();
  const enrolledStudents = useCourseStudents(id);
  const teacherData = useUserById(teacherId);
  const [courseStatus, setCourseSatus] = useState(enrolledStudents?.status);
  const [courseRating, setCourseRating] = useState(rating);

  const handleStatusChange = (e) => {
    setCourseSatus(e.target.value);
  };

  const handleRemoveCourse = () => {
    removeCourse();
    fetch(`${endpoint}/courses/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    });
  };

  return (
    <Card sx={styles}>
      <CardContent>
        <Link to={`/course/${id}`} style={{ textDecoration: 'none' }}>
          <Typography variant='h4'>{name}</Typography>
          <Typography variant='h5'>{`${teacherData.name} ${teacherData.surname}`}</Typography>
          <Typography>{type}</Typography>
          <Typography>{frequency}</Typography>
        </Link>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Rating
            value={courseRating}
            onChange={(event, newValue) => {
              setCourseRating(newValue);
            }}
            readOnly={!isUserEnrolled(currentUser?.id, id)}
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
          <TextField
            value={courseStatus || ''}
            select
            label='Estado'
            name='status'
            sx={{ marginTop: '10px', width: '100%' }}
            onChange={handleStatusChange}
          >
            {statusItems.map((item, index) =>
              index >= 2 ? (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              ) : null
            )}
          </TextField>
        )}
      </CardContent>
    </Card>
  );
};

export default Course;
