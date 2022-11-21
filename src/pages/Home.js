import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Course from '../components/Course';
import { Box, Grid } from '@mui/material';
import { endpoint, usePublishedCourses } from '../hooks';

const createQuery = (paramsObj) => {
  const params = Object.entries(paramsObj);
  const result = params.filter((el) => el[1] !== '');
  const entries = new Map(result);
  const obj = Object.fromEntries(entries);
  return obj;
};

const Home = () => {
  const publishedCourses = usePublishedCourses();
  const [formContent, setFormContent] = useState({
    name: '',
    subject: '',
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
      fetch(`${endpoint}/courses/search`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(params),
      })
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
        <Box id='courses' sx={{ marginBottom: '64px' }}>
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
