import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Course from "../components/Course";
import { courses } from "../data";
import { TEACHER_ROLE } from "../constants";

const style = {
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  a: {
    textDecoration: "none",
  },
  "& .MuiButton-root": {
    marginTop: "20px",
    fontFamily: "Montserrat",
  },
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
};

const Courses = ({ currentUser }) => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (currentUser.role === TEACHER_ROLE) {
      setCourseList(
        courses.filter((course) => course.teacherId === currentUser.id)
      );
    } else {
      setCourseList(
        courses.filter((course) => course.students.includes(currentUser.id))
      );
    }
  }, [currentUser]);

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Box sx={style}>
        <Grid container diaplay="flex" justifyContent="center">
          {courseList.map((course) => (
            <Course key={course.name} courseData={course} />
          ))}
        </Grid>
        {currentUser.role === TEACHER_ROLE ? (
          <Link to="new">
            <Button variant="contained">Crear Clase</Button>
          </Link>
        ) : (
          <Link to="/">
            <Button variant="contained">Buscar Clases</Button>
          </Link>
        )}
      </Box>
    </>
  );
};

export default Courses;
