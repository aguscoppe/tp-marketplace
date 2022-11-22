import { useEffect, useState, useContext } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Course from '../components/Course';
import { COURSE_STATUS_PENDING, TEACHER_ROLE } from '../constants';
import { useTeacherStudentCourses } from '../hooks';
import { UserContext } from '../contexts/UserContext';
import Snack from '../components/Snack';
import { useInsertionEffect } from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
  a: {
    textDecoration: 'none',
  },
  '& .MuiButton-root': {
    marginTop: '20px',
  },
};

const Courses = () => {
  const currentUser = useContext(UserContext);
  const location = useLocation();
  const teacherStudentCourses = useTeacherStudentCourses(
    currentUser.role === TEACHER_ROLE ? 'by-teacher' : 'by-student',
    currentUser.id
  );
  const [courseList, setCourseList] = useState([]);
  const [snackbarData, setSnackbarData] = useState(null);

  const removeCourse = (id) => {
    setCourseList((prev) => prev.filter((course) => course.id !== id));
    setSnackbarData({
      message: 'El curso fue eliminado.',
      open: true,
      type: 'success',
    });
  };

  useEffect(() => {
    if (teacherStudentCourses?.length) {
      setCourseList(teacherStudentCourses);
    }

    if (location.state?.snackbar) {
      setSnackbarData(location.state.snackbar);
    }
  }, [teacherStudentCourses]);

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <>
      <NavBar />
      <Box sx={style}>
        <Grid
          container
          diaplay='flex'
          justifyContent='center'
          sx={{ padding: '20px' }}
        >
          {courseList?.length > 0 ? (
            courseList.map((course) =>
              course.status !== COURSE_STATUS_PENDING ? (
                <Course
                  key={course.name}
                  courseData={course}
                  removeCourse={removeCourse}
                />
              ) : null
            )
          ) : (
            <Typography variant='h6' color='#888' align='center'>
              {currentUser?.role === TEACHER_ROLE
                ? 'No has creado ninguna clase.'
                : 'No estás inscripto en ninguna clase.'}
            </Typography>
          )}
        </Grid>
        {currentUser?.role === TEACHER_ROLE ? (
          <Link to='new'>
            <Button variant='contained'>Crear Clase</Button>
          </Link>
        ) : (
          <Link to='/'>
            <Button variant='contained'>Buscar Clases</Button>
          </Link>
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
    </>
  );
};

export default Courses;
