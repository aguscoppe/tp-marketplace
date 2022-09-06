import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { courses } from "../data";
import { getFullName } from "../utils";
import {
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_CANCELLED,
  COURSE_STATUS_FINISHED,
  COURSE_STATUS_PENDING,
} from "../constants";

const styles = {
  margin: "60px auto",
  width: "500px",
  backgroundColor: "#f6f6f6",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
};

const StudentTable = ({ currentUser }) => {
  const { id } = useParams();
  const [editing, setEditing] = useState({ studentId: null, isEditing: false });
  const [newStatus, setNewStatus] = useState("");
  const { studentId, isEditing } = editing;
  const [filtered] = courses.filter((course) => course.id == id);
  const { students } = filtered;

  const handleClick = (id) => {
    if (isEditing) {
      setNewStatus("");
    }
    return setEditing((prev) => ({
      isEditing: !prev.isEditing,
      studentId: id,
    }));
  };

  const handleChange = (e, id) => {
    const newValue = e.target.value;
    setNewStatus(newValue);
  };

  const handleSave = () => {
    console.log(newStatus);
  };

  return (
    <>
      <NavBar currentUser={currentUser} />
      <TableContainer component={Paper} sx={styles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Alumno</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Clase</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Typography variant="body2">
                    {getFullName(student.id)}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    select
                    value={
                      student.id === studentId && newStatus !== ""
                        ? newStatus
                        : student.status
                    }
                    onChange={(e) => handleChange(e, student.id)}
                    fullWidth
                    disabled={!isEditing || studentId !== student.id}
                    sx={{
                      fontFamily: "Montserrat",
                      textTransform: "capitalize",
                      backgroundColor:
                        !isEditing || studentId !== student.id ? "" : "#fff",
                    }}
                  >
                    <MenuItem
                      value={COURSE_STATUS_PENDING}
                      sx={{
                        fontFamily: "Montserrat",
                        textTransform: "capitalize",
                      }}
                    >
                      {COURSE_STATUS_PENDING}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_ACCEPTED}
                      sx={{
                        fontFamily: "Montserrat",
                        textTransform: "capitalize",
                      }}
                    >
                      {COURSE_STATUS_ACCEPTED}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_CANCELLED}
                      sx={{
                        fontFamily: "Montserrat",
                        textTransform: "capitalize",
                      }}
                    >
                      {COURSE_STATUS_CANCELLED}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_FINISHED}
                      sx={{
                        fontFamily: "Montserrat",
                        textTransform: "capitalize",
                      }}
                    >
                      {COURSE_STATUS_FINISHED}
                    </MenuItem>
                  </TextField>
                  {isEditing && studentId === student.id ? (
                    <IconButton
                      onClick={() => {
                        handleClick(student.id);
                        handleSave();
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleClick(student.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentTable;
