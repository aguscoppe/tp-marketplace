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
  TEACHER_ROLE,
} from '../constants';

const statusItems = [
  { key: 1, value: '', label: 'Estado' },
  { key: 2, value: COURSE_STATUS_PENDING, label: 'Pendiente' },
  { key: 3, value: COURSE_STATUS_ACCEPTED, label: 'Aceptada' },
  { key: 4, value: COURSE_STATUS_CANCELLED, label: 'Cacelada' },
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
  const { id, name, type, frequency, rating, status } = courseData;
  const [ratingValue, setRatingValue] = useState(rating);
  const course = courses[id - 1];
  const { teacherId } = course;
  const teacherData = users[teacherId - 1];

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
            name='simple-controlled'
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            readOnly={currentUser?.role === TEACHER_ROLE}
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
        {pathname.includes('courses') && (
          <TextField
            value={status || ''}
            select
            label='Estado'
            name='status'
            sx={{ marginTop: '10px', width: '100%' }}
            onChange={() => console.log('cambio de estado')}
          >
            {statusItems.map((item) => (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      </CardContent>
    </Card>
  );
};

export default Course;
