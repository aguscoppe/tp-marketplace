import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { courses, users } from '../data';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import { TEACHER_ROLE } from '../constants';

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
  const { id, name, type, frequency, rating } = courseData;
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
      </CardContent>
    </Card>
  );
};

export default Course;
