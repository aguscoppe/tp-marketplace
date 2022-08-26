import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";

const styles = {
  marginTop: "50px",
  textAlign: "center",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
};

const About = ({ currentUser }) => {
  return (
    <>
      <NavBar currentUser={currentUser} />
      <Box sx={styles}>
        <Typography variant="h3">Sobre nosotros</Typography>
        <Typography variant="h5">¿Para qué sirve la página?</Typography>
        <Typography variant="body1">Explicación</Typography>
        <Typography variant="h5">¿Cómo user la página?</Typography>
        <Typography variant="body1">Explicación</Typography>
      </Box>
    </>
  );
};

export default About;
