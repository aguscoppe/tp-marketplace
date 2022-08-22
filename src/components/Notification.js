import { Box, Typography } from "@mui/material";
import { COMMENT_REQUEST } from "../constants";

const style = {
  width: "300px",
  "&:not(:last-of-type)": {
    borderBottom: "1px solid #ccc",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
};

const Notification = ({ data }) => {
  const { type, message } = data;
  return (
    <Box sx={style}>
      <Typography variant="h6">
        Solicitud de {type === COMMENT_REQUEST ? "comentario" : "clase"}
      </Typography>
      <Typography variant="body1">Alumno: Juan Perez</Typography>
      <Typography variant="body1">Mensaje: {message}</Typography>
    </Box>
  );
};

export default Notification;
