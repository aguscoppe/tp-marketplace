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
import { courses, users } from '../data';
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

const Course = ({ courseData, currentUser }) => {
  const { pathname } = useLocation();
  const { id, name, type, frequency, rating, students } = courseData;
  const [enrolledStudents] = students.filter(
    (student) => student.id === currentUser?.id
  );
  const [courseStatus, setCourseSatus] = useState(enrolledStudents?.status);
  const [courseRating, setCourseRating] = useState(rating);
  const course = courses[id - 1];
  const { teacherId } = course;
  const teacherData = users[teacherId - 1];

  const handleStatusChange = (e) => {
    setCourseSatus(e.target.value);
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
                  <IconButton
                    onClick={() => {
                      console.log(`deleting course ${id}`);
                    }}
                  >
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
