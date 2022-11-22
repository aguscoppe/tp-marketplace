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
import { STUDENT_ROLE, ACCEPT_COMMENT } from '../constants';
import { endpoint, useCourseById } from '../hooks';
import { capitalize, canUserComment } from '../utils';
import { UserContext } from '../contexts/UserContext';
import Snack from '../components/Snack';

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
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const { id } = useParams();
  const course = useCourseById(id);
  const [courseData, setCourseData] = useState({});
  const [userEnrolled, setUserEnrolled] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [snackbarData, setSnackbarData] = useState(null);

  useEffect(() => {
    if (Object.keys(course).length > 0) {
      setCourseData(course);
      const result = course.inscriptions.filter(
        (inscription) => inscription.student.id === currentUser.id
      );
      setUserEnrolled(result.length > 0);
      setRatingValue(course.rating);
    }
  }, [course, currentUser?.id]);

  useEffect(() => {
    if (courseData.comments?.length) {
      setFilteredComments(() =>
        courseData.comments.filter(
          (comment) => comment.status === ACCEPT_COMMENT
        )
      );
    }
  }, [courseData.comments, id]);

  useEffect(() => {
    if (course?.teacher !== undefined) {
      setTeacherData(course?.teacher);
    }
  }, [course?.teacher]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (newValue) => {
    const filteredRating = courseData.ratings.filter(
      (el) => el.student.id === currentUser?.id
    );
    const newRating = filteredRating.length === 0;
    const newData = {
      score: newValue,
      student: {
        id: currentUser.id,
      },
    };
    const params = newRating ? '' : `/${filteredRating[0].id}`;
    const method = newRating ? 'POST' : 'PUT';
    fetch(`${endpoint}/courses/${id}/ratings${params}`, {
      method: method,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(newData),
    });
    setRatingValue(newValue);
    setSnackbarData({
      open: true,
      message: 'Puntuaste la clase correctamente!',
      type: 'success',
    });
  };

  const handleSubmitComment = () => {
    const comment = {
      studentId: currentUser?.id,
      description: newComment,
    };
    fetch(`${endpoint}/courses/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localUser?.token}`,
      },
      body: JSON.stringify(comment),
    });
    setNewComment('');
    setSnackbarData({
      open: true,
      message: 'El comentario se ha realizado correctamente!',
      type: 'success',
    });
  };

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  if (course.length && !Object.keys(courseData).length) {
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
              {teacherData?.firstname} {teacherData?.lastname}
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
                      width: '74%',
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
                      width: '24%',
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
                    key={comment.description}
                    message={comment.description}
                    firstname={capitalize(comment.student.firstname)}
                    lastname={capitalize(comment.student.lastname)}
                  />
                ))
              ) : (
                <Typography variant='h6' color='#888'>
                  Esta clase aún no tiene comentarios.
                </Typography>
              )}
            </Box>
            {snackbarData !== null && (
              <Snack
                open={snackbarData.open}
                type={snackbarData.type}
                message={snackbarData.message}
                onClose={handleCloseSnack}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CourseDetail;
