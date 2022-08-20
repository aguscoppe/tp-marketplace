import {
  TEACHER_ROLE,
  STUDENT_ROLE,
  COURSE_TYPE_SINGLE,
  COURSE_TYPE_GROUP,
  COURSE_FREQUENCY_ONCE,
  COURSE_FREQUENCY_WEEKLY,
  COURSE_FREQUENCY_MONTHLY,
} from "./constants";

const courses = [
  {
    id: 1,
    name: "Lengua",
    type: COURSE_TYPE_GROUP,
    teacherId: 2,
    students: [],
    duration: 90,
    frequency: COURSE_FREQUENCY_ONCE,
    cost: 2400,
    description: "Esta es una materia de lengua",
    rating: 0,
    comments: [],
  },
  {
    id: 2,
    name: "Matemática",
    type: COURSE_TYPE_GROUP,
    teacherId: 2,
    students: [],
    duration: 90,
    frequency: COURSE_FREQUENCY_WEEKLY,
    cost: 3200,
    description: "Esta es una materia de matemática",
    rating: 0,
    comments: [],
  },
  {
    id: 3,
    name: "Geografía",
    type: COURSE_TYPE_SINGLE,
    teacherId: 1,
    students: [],
    duration: 90,
    frequency: COURSE_FREQUENCY_MONTHLY,
    cost: 1800,
    description: "Esta es una materia de geografía",
    rating: 0,
    comments: [],
  },
];

const teachers = [
  {
    id: 1,
    name: "Pedro",
    surname: "López",
    email: "pedro@mail.com",
    password: "123",
    phone: "1155553333",
    role: TEACHER_ROLE,
    experience: "",
  },
  {
    id: 2,
    name: "Sandra",
    surname: "Sánchez",
    email: "sandra@mail.com",
    password: "123",
    phone: "1155553333",
    role: TEACHER_ROLE,
    experience: "",
  },
];

const students = [
  {
    id: 1,
    name: "Juan",
    surname: "Pérez",
    email: "juan@mail.com",
    password: "123",
    phone: "1155553333",
    education: [
      {
        level: "",
        status: "",
        description: "",
      },
    ],
    role: STUDENT_ROLE,
  },
];

export { courses, teachers, students };
