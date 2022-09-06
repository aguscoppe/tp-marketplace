import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Comment from "../components/Comment";
import { courses, users, comments } from "../data";
import {
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_FINISHED,
  STUDENT_ROLE,
} from "../constants";
import { getFullName } from "../utils";

const styles = {
  marginTop: "60px",
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
  const {
    name,
    description,
    rating,
    price,
    duration,
    frequency,
    teacherId,
    students,
    status,
  } = courseData;
  const teacherData = users[teacherId - 1];
  const isValidUser =
    students.filter(
      (element) =>
        element === currentUser.id &&
        (status === COURSE_STATUS_ACCEPTED || status === COURSE_STATUS_FINISHED)
    ).length !== 0;

  const filteredComments = comments.filter((comment) => comment.courseId == id);

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Grid container justifyContent="space-around" sx={styles}>
        <Grid item xs={6}>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">{description}</Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="h6">${price}</Typography>
          <Typography variant="h6">{frequency}</Typography>
          <Typography variant="h6">{duration} minutos</Typography>
          {currentUser?.role === STUDENT_ROLE && !isValidUser ? (
            <Link to={`/enroll/${id}`}>
              <Button variant="contained">Inscribirse</Button>
            </Link>
          ) : null}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#eee",
            padding: "16px",
            height: "fit-content",
          }}
        >
          <Typography variant="h5">Sobre el Instructor</Typography>
          <Typography variant="h4">
            {teacherData.name} {teacherData.surname}
          </Typography>
          <Typography variant="body1">{teacherData.experience}</Typography>
        </Grid>
      </Grid>
      <Grid container flexDirection="column" sx={styles}>
        <Box margin="auto 50px">
          <Typography variant="h4" sx={{ marginTop: "60px 0" }}>
            Comentarios
          </Typography>
          {isValidUser && (
            <>
              <TextField sx={{ width: "85%" }} />
              <Button variant="contained">Comentar</Button>
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
            <Typography variant="h6" color="#888">
              Esta clase aún no tiene comentarios.
            </Typography>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default CourseDetail;
