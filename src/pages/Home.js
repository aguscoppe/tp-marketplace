import { useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Course from "../components/Course";
import { courses } from "../data";

const Home = () => {
  const [formContent, setFormContent] = useState({
    name: "",
    type: "",
    frequency: "",
    rating: "",
  });
  const [beginSearch, setBeginSearch] = useState(false);
  const { name } = formContent;

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

  return (
    <>
      <NavBar />
      <Header
        formContent={formContent}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      {beginSearch &&
        courses
          /*.filter((course) => course.name === name)*/
          .map((course) => <Course courseData={course} />)}
    </>
  );
};

export default Home;
