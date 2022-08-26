import { Button, Card, Grid, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { courses, users } from "../data";
import { STUDENT_ROLE } from "../constants";

const styles = {
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  a: {
    textDecoration: "none",
  },
};

const CourseDetail = ({ currentUser }) => {
  const { id } = useParams();
  const courseData = courses[id - 1];
  const { name, description, rating, price, duration, frequency, teacherId } =
    courseData;
  const teacherData = users[teacherId - 1];

  const signUp = () => {
    if (!currentUser || currentUser.role !== STUDENT_ROLE) {
      alert(
        "Debes estar registrado como alumno para poder inscribirte a esta clase."
      );
    } else {
      alert("Hola alumno!");
    }
  };

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Grid container justifyContent="center" alignItems="center" sx={styles}>
        <Grid item xs={6}>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">{description}</Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="h6">${price}</Typography>
          <Typography variant="h6">{frequency}</Typography>
          <Typography variant="h6">{duration} minutos</Typography>
          <Button variant="contained" onClick={signUp}>
            INSCRIBIRSE
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ margin: "20px", backgroundColor: "#eee" }}>
            <Typography variant="h5">Sobre el Instructor</Typography>
            <Typography variant="h4">
              {teacherData.name} {teacherData.surname}
            </Typography>
            <Typography variant="body1">{teacherData.experience}</Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container flexDirection="column" sx={styles}>
        <Typography variant="h4" sx={{ margin: "20px" }}>
          Comentarios
        </Typography>
        <Card sx={{ margin: "0 20px", backgroundColor: "#eee" }}>
          <Typography variant="h6">Martina</Typography>
          <Typography variant="body1">Muy buena clase!!</Typography>
        </Card>
      </Grid>
    </>
  );
};

export default CourseDetail;
