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

const App = () => {
  const [currentUserId, setCurrentUserId] = useState({});
  const user = useUserById(currentUserId);

  const signOut = () => {
    setCurrentUserId({});
  };

  const signIn = () => {
    const localUser = localStorage.getItem('current-user');
    setCurrentUserId(JSON.parse(localUser));
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <Routes>
      {currentUserId && currentUserId !== undefined && currentUserId !== {} ? (
        <>
          <Route path='/courses'>
            <Route index element={<Courses currentUserId={currentUserId} />} />
            <Route
              path='new'
              element={<NewCourse currentUserId={currentUserId} />}
            />
            <Route
              path='edit/:id'
              element={<NewCourse currentUserId={currentUserId} />}
            />
          </Route>
          <Route path='/students'>
            <Route
              path=':id'
              element={<StudentTable currentUserId={currentUserId} />}
            />
          </Route>
          <Route path='/profile'>
            <Route
              index
              element={
                <Profile currentUserId={currentUserId} signOut={signOut} />
              }
            />
          </Route>
        </>
      ) : null}
      {user?.role === STUDENT_ROLE ? (
        <Route path='/enroll'>
          <Route
            path=':id'
            element={<Enroll currentUserId={currentUserId} />}
          />
        </Route>
      ) : null}
      <Route exact path='/' element={<Home currentUserId={currentUserId} />} />
      <Route path='/course'>
        <Route
          path=':id'
          element={<CourseDetail currentUserId={currentUserId} />}
        />
      </Route>
      <Route path='/about' element={<About currentUserId={currentUserId} />} />
      <Route
        path='/login'
        element={<Login currentUserId={currentUserId} signIn={signIn} />}
      />
      <Route
        path='reset-password'
        element={<ResetPassword currentUserId={currentUserId} />}
      />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;
