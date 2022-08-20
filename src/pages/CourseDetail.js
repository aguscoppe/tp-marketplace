import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { courses } from "../data";

const CourseDetail = () => {
  const { id } = useParams();
  const courseData = courses[id - 1];
  const { name } = courseData;
  return (
    <>
      <NavBar />
      <Typography variant="h3">{name}</Typography>
    </>
  );
};

export default CourseDetail;
