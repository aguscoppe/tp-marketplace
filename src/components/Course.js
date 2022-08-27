import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { courses, users } from "../data";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  width: "250px",
  margin: "15px",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
    textTransform: "capitalize",
  },
};

const Course = ({ courseData }) => {
  const { id, name, type, frequency, rating } = courseData;
  const course = courses[id - 1];
  const { teacherId } = course;
  const teacherData = users[teacherId - 1];

  return (
    <Link to={`/course/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={styles}>
        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="h5">{`${teacherData.name} ${teacherData.surname}`}</Typography>
          <Typography>{type}</Typography>
          <Typography>{frequency}</Typography>
          {/* TODO: split logic for students and teachers */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Rating name="read-only" value={rating} readOnly />
            <Box>
              <Link to={`edit/${id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>

              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
