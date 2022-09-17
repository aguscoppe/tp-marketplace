import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Comment from '../components/Comment';
import { users, comments } from '../data';
import { STUDENT_ROLE } from '../constants';
import { getFullName, isUserEnrolled } from '../utils';
import { useCourseById } from '../hooks';
import { useUserById } from '../hooks';

const styles = {
  marginTop: '60px',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiButton-root': {
    fontFamily: 'Montserrat',
  },
  a: {
    textDecoration: 'none',
  },
};

const CourseDetail = ({ currentUserId }) => {
  const currentUser = useUserById(currentUserId);
  const { id } = useParams();
  const courseData = useCourseById(id);
  const { name, description, rating, price, duration, frequency, teacherId } =
    courseData;
  const teacherData = users[teacherId - 1];
  const filteredComments = comments.filter((comment) => comment.courseId == id);
  const [ratingValue, setRatingValue] = useState(rating);

  return (
    <>
      <NavBar currentUserId={currentUserId} />
      <Grid container justifyContent='space-around' sx={styles}>
        <Grid item xs={6}>
          <Typography variant='h3'>{name}</Typography>
          <Typography variant='h5'>{description}</Typography>
          <Rating
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            readOnly={!isUserEnrolled(currentUser?.id, id)}
          />
          <Typography variant='h6'>${price}</Typography>
          <Typography variant='h6'>{frequency}</Typography>
          <Typography variant='h6'>{duration} minutos</Typography>
          {currentUser?.role === STUDENT_ROLE &&
          !isUserEnrolled(currentUser?.id, id) ? (
            <Link to={`/enroll/${id}`}>
              <Button variant='contained'>Inscribirse</Button>
            </Link>
          ) : null}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: '#eee',
            padding: '16px',
            height: 'fit-content',
          }}
        >
          <Typography variant='h5'>Sobre el Instructor</Typography>
          <Typography variant='h4'>
            {teacherData?.name} {teacherData?.surname}
          </Typography>
          <Typography variant='body1'>{teacherData?.experience}</Typography>
        </Grid>
      </Grid>
      <Grid container flexDirection='column' sx={styles}>
        <Box margin='auto 50px'>
          <Typography variant='h4' sx={{ marginTop: '60px 0' }}>
            Comentarios
          </Typography>
          {isUserEnrolled(currentUser?.id, id) && (
            <>
              <TextField sx={{ width: '85%' }} />
              <Button variant='contained'>Comentar</Button>
            </>
          )}
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <Comment
                key={comment.message}
                message={comment.message}
                userName={getFullName(comment.studentId)}
              />
            ))
          ) : (
            <Typography variant='h6' color='#888'>
              Esta clase aún no tiene comentarios.
            </Typography>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default CourseDetail;
