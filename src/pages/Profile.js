import { useState } from "react";
import NavBar from "../components/NavBar";
import Home from "./Home";

const Profile = ({ currentUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const signOut = () => {
    localStorage.removeItem("current-user");
    setIsLoggedIn(false);
  };
  if (isLoggedIn) {
    return (
      <>
        <NavBar currentUser={currentUser} />
        <h1>Profile</h1>
        <button onClick={signOut}>SALIR</button>
      </>
    );
  } else {
    return <Home />;
  }
};

export default Profile;
