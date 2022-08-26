import { Box, Typography } from "@mui/material";
import { COMMENT_REQUEST } from "../constants";
import { users } from "../data";

const style = {
  width: "300px",
  padding: "6px 12px",
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
  const { type, message, sourceId } = data;
  const sourceUserArray = users.filter((user) => user.id === sourceId);
  const [sourceUser] = sourceUserArray;
  return (
    <Box sx={style}>
      <Typography variant="h6">
        Solicitud de {type === COMMENT_REQUEST ? "comentario" : "clase"}
      </Typography>
      <Typography variant="body2">
        <strong>Alumno:</strong> {sourceUser.name} {sourceUser.surname}
      </Typography>
      <Typography variant="body2">
        <strong>Mensaje:</strong> {message}
      </Typography>
    </Box>
  );
};

export default Notification;
