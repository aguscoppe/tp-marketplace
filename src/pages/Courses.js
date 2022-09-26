import { useEffect, useState, useContext } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Course from '../components/Course';
import { TEACHER_ROLE } from '../constants';
import { useCourseDataByStudentId, useCoursesByTeacherId } from '../hooks';
import { UserContext } from '../contexts/UserContext';

const style = {
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  a: {
    textDecoration: 'none',
  },
  '& .MuiButton-root': {
    marginTop: '20px',
    fontFamily: 'Montserrat',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
};

const Courses = () => {
  const currentUser = useContext(UserContext);
  const [courseList, setCourseList] = useState([]);
  const coursesByTeacherId = useCoursesByTeacherId(currentUser?.id);
  const coursesByStudentId = useCourseDataByStudentId(currentUser?.id);

  const removeCourse = (id) => {
    setCourseList((prev) => prev.filter((course) => course.id !== id));
  };

  useEffect(() => {
    if (coursesByStudentId?.length > 0) {
      setCourseList(coursesByStudentId);
    }
  }, [coursesByStudentId]);

  useEffect(() => {
    if (coursesByTeacherId?.length > 0) {
      setCourseList(coursesByTeacherId);
    }
  }, [coursesByTeacherId]);

  return (
    <>
      <NavBar />
      <Box sx={style}>
        <Grid container diaplay='flex' justifyContent='center'>
          {courseList?.length > 0 ? (
            courseList.map((course) => (
              <Course
                key={course.name}
                courseData={course}
                removeCourse={removeCourse}
              />
            ))
          ) : (
            <Typography variant='h6' color='#888'>
              No estás inscripto en ninguna clase.
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
    </>
  );
};

export default Courses;
