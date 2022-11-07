import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CourseDetail from './pages/CourseDetail';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import About from './pages/About';
import NewCourse from './pages/NewCourse';
import StudentTable from './pages/StudentTable';
import Enroll from './pages/Enroll';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import './style.css';
import { STUDENT_ROLE } from './constants';
import { useUserById } from './hooks';
import { UserContext } from './contexts/UserContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

const App = () => {
  const [currentUserId, setCurrentUserId] = useState({});
  const user = useUserById(currentUserId);

  const signOut = () => {
    setCurrentUserId({});
  };

  const signIn = () => {
    const localUser = localStorage.getItem('current-user');
    if (localUser !== undefined) {
      console.log(localUser);
      // setCurrentUserId(JSON.parse(localUser));
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <Routes>
          {currentUserId &&
          currentUserId !== undefined &&
          currentUserId !== {} ? (
            <>
              <Route path='/courses'>
                <Route index element={<Courses />} />
                <Route path='new' element={<NewCourse />} />
                <Route path='edit/:id' element={<NewCourse />} />
              </Route>
              <Route path='/students'>
                <Route path=':id' element={<StudentTable />} />
              </Route>
              <Route path='/profile'>
                <Route index element={<Profile signOut={signOut} />} />
              </Route>
            </>
          ) : null}
          {user?.role === STUDENT_ROLE ? (
            <Route path='/enroll'>
              <Route path=':id' element={<Enroll />} />
            </Route>
          ) : null}
          <Route exact path='/' element={<Home />} />
          <Route path='/course'>
            <Route path=':id' element={<CourseDetail />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login signIn={signIn} />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
