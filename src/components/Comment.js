import { Box, Avatar, Typography } from "@mui/material";

function generateColor() {
  const colors = [
    "#220901",
    "#621708",
    "#941b0c",
    "#bc3908",
    "#cc5803",
    "#e2711d",
    "#b86d29",
    "#c46247",
    "#745c45",
  ];
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: generateColor(),
      marginRight: "12px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const style = {
  backgroundColor: "#fafafa",
  display: "flex",
  alignItems: "center",
  padding: "12px",
  border: "1px solid #ddd",
  marginTop: "12px",
};

const Comment = ({ message, userName }) => {
  return (
    <Box sx={style}>
      <Avatar {...stringAvatar(userName)} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default Comment;
