import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Course from "../components/Course";
import { courses } from "../data";
import { Grid } from "@mui/material";

const getCourses = ({ name, type, frequency, rating }) => {
  let filtered = courses;
  if (name !== "") {
    filtered = courses.filter(
      (course) => course.name.toLowerCase() === name.toLowerCase()
    );
  } else if (type !== "") {
    filtered = filtered.filter(
      (course) => course.type.toLowerCase() === type.toLowerCase()
    );
  } else if (frequency !== "") {
    filtered = filtered.filter(
      (course) => course.frequency.toLowerCase() === frequency.toLowerCase()
    );
  } else if (rating !== "") {
    filtered = filtered.filter((course) => course.rating === rating);
  } else {
    return [];
  }
  return filtered;
};

const Home = ({ currentUser }) => {
  const [formContent, setFormContent] = useState({
    name: "",
    type: "",
    frequency: "",
    rating: "",
  });
  const [beginSearch, setBeginSearch] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleChange = (e) => {
    setBeginSearch(false);
    setFormContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setBeginSearch(true);
  };

  useEffect(() => {
    if (beginSearch) {
      setFilteredCourses(getCourses(formContent));
    }
  }, [beginSearch]);

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Header
        formContent={formContent}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      {filteredCourses ? (
        <Grid container diaplay="flex" justifyContent="center">
          {filteredCourses.map((course) => (
            <Course key={course.name} courseData={course} />
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default Home;
