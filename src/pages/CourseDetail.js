import { useEffect, useState } from 'react';
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
import { STUDENT_ROLE } from '../constants';
import { getFullName, isUserEnrolled } from '../utils';
import { useComments, useCourseById, useTeacherByCourseId } from '../hooks';
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
  const course = useCourseById(id);
  const comments = useComments(id);
  const teacher = useTeacherByCourseId(id);
  const [courseData, setCourseData] = useState({});
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [ratingValue, setRatingValue] = useState(courseData?.rating);

  useEffect(() => {
    if (course !== undefined && Object.keys(course).length > 0) {
      setCourseData(course);
      const result = isUserEnrolled(currentUserId, course);
      setUserEnrolled(result);
    }
  }, [course, currentUserId]);

  useEffect(() => {
    if (comments !== undefined) {
      setFilteredComments(comments.filter((comment) => comment.courseId == id));
    }
  }, [comments]);

  useEffect(() => {
    if (teacher !== undefined) {
      setTeacherData(teacher);
    }
  }, [teacher]);

  const handleSubmitComment = () => {
    console.log('agregar handleChange, value, etc a TextField');
  };

  return (
    <>
      <NavBar currentUserId={currentUserId} />
      <Grid container justifyContent='space-around' sx={styles}>
        <Grid item xs={6}>
          <Typography variant='h3'>{courseData?.name}</Typography>
          <Typography variant='h5'>{courseData?.description}</Typography>
          <Rating
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            readOnly={!userEnrolled}
          />
          <Typography variant='h6'>${courseData?.price}</Typography>
          <Typography variant='h6'>{courseData?.frequency}</Typography>
          <Typography variant='h6'>{courseData?.duration} minutos</Typography>
          {currentUser?.role === STUDENT_ROLE && !userEnrolled ? (
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
          {userEnrolled && (
            <>
              <TextField sx={{ width: '85%' }} />
              <Button variant='contained' onClick={handleSubmitComment}>
                Comentar
              </Button>
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
