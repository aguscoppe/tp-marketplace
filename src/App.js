import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Forbidden from "./pages/Forbidden";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import "./style.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const localUser = localStorage.getItem("current-user");
    setCurrentUser(JSON.parse(localUser));
  }, []);
  return (
    <Routes>
      {currentUser ? (
        <>
          <Route
            path="/courses"
            element={<Courses currentUser={currentUser} />}
          />
          <Route
            path="/profile"
            element={<Profile currentUser={currentUser} />}
          />
        </>
      ) : null}
      <Route exact path="/" element={<Home currentUser={currentUser} />} />
      <Route path="/class">
        <Route
          path=":id"
          element={<CourseDetail currentUser={currentUser} />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Forbidden />} />
    </Routes>
  );
};

export default App;
