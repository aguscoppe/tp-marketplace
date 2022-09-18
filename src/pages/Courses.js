import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Course from '../components/Course';
import { STUDENT_ROLE, TEACHER_ROLE } from '../constants';
import {
  useCoursesByStudentId,
  useCoursesByTeacherId,
  useUserById,
} from '../hooks';

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

const Courses = ({ currentUserId }) => {
  const user = useUserById(currentUserId);
  const [currentUser, setCurrentUser] = useState({});
  const [courseList, setCourseList] = useState([]);
  const coursesByTeacherId = useCoursesByTeacherId(currentUserId);
  const coursesByStudentId = useCoursesByStudentId(currentUserId);

  const removeCourse = (id) => {
    setCourseList((prev) => prev.filter((course) => course.id !== id));
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      if (user.role === TEACHER_ROLE) {
        setCourseList(coursesByTeacherId);
      }
      if (user.role === STUDENT_ROLE) {
        // setCourseList(coursesByStudentId);
      }
    }
  }, [user, coursesByTeacherId, coursesByStudentId]);

  return (
    <>
      <NavBar currentUserId={currentUserId} />
      <Box sx={style}>
        <Grid container diaplay='flex' justifyContent='center'>
          {courseList.length > 0 ? (
            courseList.map((course) => (
              <Course
                key={course.name}
                courseData={course}
                currentUserId={currentUserId}
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
