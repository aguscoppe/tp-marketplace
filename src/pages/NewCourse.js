import { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { typeItems, frequencyItems } from "../components/Header";
import { useParams } from "react-router-dom";
import { courses } from "../data";

const initialState = {
  name: "",
  type: "",
  teacherId: null,
  students: [],
  duration: 60,
  frequency: "",
  price: 0,
  description: "",
  rating: 0,
  comments: [],
};

const style = {
  height: "100%",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiInputBase-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiTextField-root": {
    width: "300px",
    margin: "10px",
    backgroundColor: "#fff",
  },
  "& .MuiTextField-root:first-of-type": {
    marginTop: "50px",
  },
  input: {
    fontFamily: "Montserrat",
  },
};

const NewCourse = ({ currentUser }) => {
  const { id } = useParams();
  const courseData = courses.filter((course) => course.id == id);
  const [newCourse, setNewCourse] = useState(
    courseData.length > 0 ? courseData[0] : initialState
  );
  const { name, type, duration, frequency, price, description } = newCourse;

  const handleChange = (e) => {
    setNewCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    setNewCourse((prev) => ({
      ...prev,
      teacherId: currentUser.id,
    }));
    // TODO: add new course to array
    console.log(newCourse);
  };

  const saveChanges = () => {
    console.log(newCourse);
  };

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Grid
        container
        sx={style}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Materia"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          value={type}
          select
          label="Tipo de clase"
          name="type"
          onChange={handleChange}
        >
          {typeItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={frequency}
          select
          label="Frecuencia"
          name="frequency"
          onChange={handleChange}
        >
          {frequencyItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Duración (en minutos)"
          value={duration}
          name="duration"
          onChange={handleChange}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Costo"
          value={price}
          name="price"
          onChange={handleChange}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Descripción"
          value={description}
          name="description"
          onChange={handleChange}
          multiline
          rows={4}
        />
        {courseData.length > 0 ? (
          <Button
            variant="contained"
            sx={{ height: "50px", margin: "10px" }}
            onClick={saveChanges}
          >
            Guardar
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ height: "50px", margin: "10px" }}
            onClick={handleClick}
          >
            Crear
          </Button>
        )}
      </Grid>
    </>
  );
};

export default NewCourse;
