import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Course from '../components/Course';
import { Grid } from '@mui/material';
import { filterCourses } from '../utils';
import { useUserById, usePublishedCourses } from '../hooks';

const Home = ({ currentUserId }) => {
  const currentUser = useUserById(currentUserId);
  const publishedCourses = usePublishedCourses();
  const [formContent, setFormContent] = useState({
    name: '',
    type: '',
    frequency: '',
    rating: '',
  });
  const [beginSearch, setBeginSearch] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(publishedCourses);

  useEffect(() => {
    setFilteredCourses(publishedCourses);
  }, [publishedCourses]);

  useEffect(() => {
    if (beginSearch) {
      setFilteredCourses(filterCourses(filterCourses, formContent));
    }
  }, [beginSearch]);

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
      <NavBar currentUserId={currentUserId} />
      <Header />
      <SearchBar
        formContent={formContent}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      {filteredCourses ? (
        <Grid container diaplay='flex' justifyContent='center'>
          {filteredCourses.map((course) => (
            <Course key={course.name} courseData={course} />
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default Home;
