import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

const ResetPassword = ({ currentUserId }) => {
  const handleRecovery = () => {
    console.log("Recuperaste tu contraseña!");
  };

  return (
    <>
      <Navbar currentUserId={currentUserId} />
      <Box
        sx={{
          width: "100vw",
          height: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
          a: {
            color: "#fff",
            "&:hover": {
              color: "#90caf9",
            },
          },
        }}
      >
        <Box
          sx={{
            boxShadow: 20,
            width: "400px",
            height: "470px",
            backgroundColor: "#595959",
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            "@media (max-width: 480px)": {
              width: "100vw",
              height: "100%",
              borderRadius: "0px",
            },
          }}
        >
          <Box
            sx={{
              width: "300px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
                fontFamily: "Montserrat",
                textAlign: "justify",
                letterSpacing: 0,
              }}
            >
              Ingresa tu correo electrónico y te estaremos enviando un mail con
              las instrucciones para volver a ingresar.
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            label="Correo electronico"
            name="email"
            sx={{
              marginTop: "50px",
              minWidth: "150px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              fontFamily: "Montserrat",
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: "50px",
              marginTop: "20px",
              marginBottom: "20px",
              minWidth: "150px",
              fontFamily: "Montserrat",
              borderRadius: "8px",
              width: "300px",
            }}
            onClick={handleRecovery}
          >
            Recuperar contraseña
          </Button>
          <Typography
            sx={{
              color: "#90caf9",
              fontSize: "14px",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
              }}
            >
              Volver al Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
