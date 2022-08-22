import NavBar from "../components/NavBar";
import Course from "../components/Course";
import { Box, Button, Grid } from "@mui/material";
import { courses } from "../data";
import { Link } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  a: {
    textDecoration: "none",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
};

const Courses = ({ currentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} />
      <Box sx={style}>
        <Grid container diaplay="flex" justifyContent="center">
          {
            /* TODO: add student role version*/
            courses
              .filter((course) => course.teacherId === currentUser.id)
              .map((course) => (
                <Course key={course.name} courseData={course} />
              ))
          }
        </Grid>
        <Link to="/courses/new">
          <Button variant="contained">Crear Clase</Button>
        </Link>
      </Box>
    </>
  );
};

export default Courses;
