import NavBar from "../components/NavBar";

const Profile = ({ currentUser }) => {
  const signOut = () => {
    localStorage.removeItem("current-user");
    // TODO: redirect to homepage
  };
  return (
    <>
      <NavBar currentUser={currentUser} />
      <h1>Profile</h1>
      <button onClick={signOut}>SALIR</button>
    </>
  );
};

export default Profile;
