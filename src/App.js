import { Routes, Route } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./style.css";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/class">
        <Route path=":id" element={<CourseDetail />} />
      </Route>
      {/* create page + replace Home*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Home />} />
      <Route path="/reset-password" element={<Home />} />
    </Routes>
  );
};

export default App;
