import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import NavBar from '../components/NavBar';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {
  COURSE_STATUS_ACCEPTED,
  COURSE_STATUS_CANCELLED,
  COURSE_STATUS_FINISHED,
  COURSE_STATUS_PENDING,
} from '../constants';
import { endpoint, useCourseById } from '../hooks';
import Snack from '../components/Snack';

const styles = {
  margin: '60px auto',
  width: '500px',
  backgroundColor: '#f6f6f6',
};

const StudentTable = () => {
  const { id } = useParams();
  const localUser = JSON.parse(localStorage.getItem('current-user'));
  const courseData = useCourseById(id);
  const [inscriptions, setinscriptions] = useState([]);
  const [editing, setEditing] = useState({ studentId: null, isEditing: false });
  const [newStatus, setNewStatus] = useState('');
  const [snackbarData, setSnackbarData] = useState(null);
  const { studentId, isEditing } = editing;

  useEffect(() => {
    if (courseData !== undefined) {
      setinscriptions(courseData.inscriptions);
    }
  }, [courseData]);

  const handleClick = (id) =>
    setEditing((prev) => ({
      isEditing: !prev.isEditing,
      studentId: id,
    }));
  const handleChange = (e, id) => {
    const newValue = e.target.value;
    if (newValue !== COURSE_STATUS_PENDING) {
      setNewStatus(newValue);
    } else {
      setSnackbarData({
        message: 'No puedes realizar esta acción.',
        open: true,
        type: 'error',
      });
    }
  };

  const handleSave = (inscriptionId) => {
    if (newStatus !== '') {
      const newData = { status: newStatus };
      fetch(`${endpoint}/courses/${id}/inscriptions/${inscriptionId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localUser?.token}`,
        },
        body: JSON.stringify(newData),
      }).then((res) => {
        if (res.status === 200) {
          setSnackbarData({
            message: 'Los datos se actualizaron correctamente.',
            open: true,
            type: 'success',
          });
        } else {
          setSnackbarData({
            message: 'Error en la actualización de datos.',
            open: true,
            type: 'error',
          });
        }
      });
    }
  };

  const handleCloseSnack = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  return (
    <>
      <NavBar />
      <TableContainer component={Paper} sx={styles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>Alumno</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>Estado</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inscriptions?.map((inscription) => (
              <TableRow key={inscription.student.id}>
                <TableCell>
                  <Typography variant='body2'>
                    {inscription.student.firstname}{' '}
                    {inscription.student.lastname}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    select
                    value={
                      inscription.student.id === studentId && newStatus !== ''
                        ? newStatus
                        : inscription.status
                    }
                    onChange={(e) => handleChange(e, inscription.student.id)}
                    fullWidth
                    disabled={
                      !isEditing || studentId !== inscription.student.id
                    }
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor:
                        !isEditing || studentId !== inscription.student.id
                          ? ''
                          : '#fff',
                    }}
                  >
                    <MenuItem
                      value={COURSE_STATUS_PENDING}
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {COURSE_STATUS_PENDING}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_ACCEPTED}
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {COURSE_STATUS_ACCEPTED}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_CANCELLED}
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {COURSE_STATUS_CANCELLED}
                    </MenuItem>
                    <MenuItem
                      value={COURSE_STATUS_FINISHED}
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {COURSE_STATUS_FINISHED}
                    </MenuItem>
                  </TextField>
                  {isEditing && studentId === inscription.student.id ? (
                    <IconButton
                      onClick={() => {
                        handleClick(inscription.student.id);
                        handleSave(inscription.id);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleClick(inscription.student.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {snackbarData !== null && (
        <Snack
          open={snackbarData.open}
          type={snackbarData.type}
          message={snackbarData.message}
          onClose={handleCloseSnack}
        />
      )}
    </>
  );
};

export default StudentTable;
