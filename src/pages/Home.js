import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Course from '../components/Course';
import { Box, Grid } from '@mui/material';
import { endpoint, usePublishedCourses } from '../hooks';

const createQuery = (paramsObj) => {
  let params = new URLSearchParams(paramsObj);
  let keysForDel = [];
  params.forEach((value, key) => {
    if (value === '') {
      keysForDel.push(key);
    }
  });
  keysForDel.forEach((key) => {
    params.delete(key);
  });
  return params.toString();
};

const Home = () => {
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
      const params = createQuery(formContent);
      fetch(`${endpoint}/courses?published=true&${params}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredCourses(data);
        });
    }
  }, [beginSearch, formContent]);

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
      <Header />
      <Box sx={{ margin: '0 10vw' }}>
        <SearchBar
          formContent={formContent}
          handleChange={handleChange}
          handleClick={handleClick}
        />
        <Box id='courses'>
          {filteredCourses ? (
            <Grid container diaplay='flex' justifyContent='space-evenly'>
              {filteredCourses.map((course) => (
                <Course key={course.name} courseData={course} />
              ))}
            </Grid>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Home;
