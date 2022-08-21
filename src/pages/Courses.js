import NavBar from "../components/NavBar";

const Courses = ({ currentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} />
      <h1>Courses</h1>
    </>
  );
};

export default Courses;
