import { Button, Card, CardContent, Typography } from "@mui/material";
import { teachers } from "../data";
import { Link } from "react-router-dom";

const Course = ({ courseData }) => {
  const { id, name, type, frequency, rating } = courseData;
  return (
    <Card sx={{ width: "250px" }}>
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{`${teachers[0].name} ${teachers[0].surname}`}</Typography>
        <Typography>{type}</Typography>
        <Typography>{frequency}</Typography>
        <Typography>{rating} stars</Typography>
        <Link to={`/class/${id}`}>
          <Button variant="contained">VER</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Course;
