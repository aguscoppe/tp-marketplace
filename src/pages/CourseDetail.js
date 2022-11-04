import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { Link, Navigate, useParams } from 'react-router-dom';
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
  a: {
    textDecoration: 'none',
  },
  '@media (max-width: 700px)': {
    h3: {
      fontSize: '28px',
      fontWeight: '600',
    },
    h4: {
      fontSize: '22px',
      fontWeight: '500',
    },
    h5: {
      fontSize: '20px',
    },
    h6: {
      fontSize: '16px',
    },
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

  if (Object.keys(courseData).length > 0 && !courseData.published) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <NavBar />
      <Grid
        container
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        sx={styles}
      >
        <Grid item xs={10} sm={8} md={6}>
          <Box
            margin='auto'
            display='flex'
            alignContent='center'
            justifyContent='center'
            sx={{ maxWidth: '550px' }}
          >
            <img
              alt={courseData?.name}
              src={courseData?.imgSrc}
              style={{ width: '100%' }}
            />
          </Box>
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
          <Grid
            item
            sx={{
              marginTop: '32px',
              borderRadius: '8px',
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
          <Grid
            container
            flexDirection='column'
            sx={{
              margin: '32px 0 64px 0',
            }}
          >
            <Box>
              <Typography variant='h4'>Comentarios</Typography>
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
        </Grid>
      </Grid>
    </>
  );
};

export default CourseDetail;
