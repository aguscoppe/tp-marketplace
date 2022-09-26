import { useContext, useEffect, useState } from 'react';
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
import { STUDENT_ROLE, COMMENT_NOTIFICATION } from '../constants';
import { isUserEnrolled, getRating } from '../utils';
import {
  endpoint,
  useComments,
  useCourseById,
  useTeacherByCourseId,
} from '../hooks';
import uuid from 'react-uuid';
import { capitalize, canUserComment } from '../utils';
import { UserContext } from '../contexts/UserContext';

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

const CourseDetail = () => {
  const currentUser = useContext(UserContext);
  const { id } = useParams();
  const course = useCourseById(id);
  const comments = useComments(id);
  const teacher = useTeacherByCourseId(id);
  const [courseData, setCourseData] = useState({});
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    if (course !== undefined && Object.keys(course).length > 0) {
      setCourseData(course);
      const result = isUserEnrolled(currentUser?.id, course);
      setUserEnrolled(result);
      setRatingValue(getRating(course.rating));
    }
  }, [course, currentUser?.id]);

  useEffect(() => {
    if (comments !== undefined) {
      setFilteredComments(comments.filter((comment) => comment.courseId == id));
    }
  }, [comments, id]);

  useEffect(() => {
    if (teacher !== undefined) {
      setTeacherData(teacher);
    }
  }, [teacher]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
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
    setRatingValue(newValue);
  };

  const handleSubmitComment = () => {
    const comment = {
      id: uuid(),
      courseId: id,
      sourceId: currentUser?.id,
      destinationId: courseData.teacherId,
      type: COMMENT_NOTIFICATION,
      message: newComment,
    };
    fetch(`${endpoint}/notifications`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(comment),
    });
    setNewComment('');
  };

  return (
    <>
      <NavBar />
      <Grid container justifyContent='space-around' sx={styles}>
        <Grid item xs={11} md={6}>
          <Typography variant='h3'>{courseData?.name}</Typography>
          <Typography variant='h5'>{courseData?.description}</Typography>
          <Rating
            value={ratingValue}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
            readOnly={!userEnrolled}
          />
          <Typography variant='h6'>${courseData?.price}</Typography>
          <Typography variant='h6'>Clase de {courseData?.subject}</Typography>
          <Typography variant='h6'>{capitalize(courseData?.type)}</Typography>
          <Typography variant='h6'>
            {capitalize(courseData?.frequency)}
          </Typography>
          <Typography variant='h6'>{courseData?.duration} minutos</Typography>
          {currentUser?.role === STUDENT_ROLE && !userEnrolled ? (
            <Link to={`/enroll/${id}`}>
              <Button variant='contained'>Inscribirse</Button>
            </Link>
          ) : null}
        </Grid>
        <Grid
          item
          xs={11}
          md={4}
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
          {canUserComment(currentUser?.id, courseData) && (
            <Box
              display='flex'
              justifyContent='space-between'
              sx={{
                '@media (max-width: 800px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <TextField
                value={newComment}
                onChange={handleChange}
                sx={{
                  width: '82%',
                  '@media (max-width: 800px)': {
                    width: '100%',
                  },
                }}
              />
              <Button
                variant='contained'
                disabled={newComment === ''}
                onClick={handleSubmitComment}
                sx={{
                  width: '16%',
                  '@media (max-width: 800px)': {
                    width: '100%',
                  },
                }}
              >
                Comentar
              </Button>
            </Box>
          )}
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <Comment
                key={comment.message}
                message={comment.message}
                userId={comment.studentId}
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
