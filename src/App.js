import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const localUser = localStorage.getItem("current-user");
    setCurrentUser(JSON.parse(localUser));
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home currentUser={currentUser} />} />
      <Route path="/class">
        <Route path=":id" element={<CourseDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Home />} />
    </Routes>
  );
};

export default App;
