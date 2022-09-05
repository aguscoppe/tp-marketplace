import {
  TEACHER_ROLE,
  STUDENT_ROLE,
  COURSE_TYPE_SINGLE,
  COURSE_TYPE_GROUP,
  COURSE_FREQUENCY_ONCE,
  COURSE_FREQUENCY_WEEKLY,
  COURSE_FREQUENCY_MONTHLY,
  COURSE_NOTIFICATION,
  COMMENT_NOTIFICATION,
  COURSE_STATUS_ACCEPTED,
} from './constants';

const courses = [
  {
    id: 1,
    name: 'Lengua',
    type: COURSE_TYPE_GROUP,
    teacherId: 2,
    students: [10],
    status: COURSE_STATUS_ACCEPTED,
    duration: 90,
    frequency: COURSE_FREQUENCY_ONCE,
    price: 2400,
    description: 'Esta es una materia de lengua',
    rating: 5,
    comments: [],
  },
  {
    id: 2,
    name: 'Matemática',
    type: COURSE_TYPE_GROUP,
    teacherId: 2,
    students: [],
    duration: 90,
    frequency: COURSE_FREQUENCY_WEEKLY,
    price: 3200,
    description: 'Esta es una materia de matemática',
    rating: 4,
    comments: [],
  },
  {
    id: 3,
    name: 'Geografía',
    type: COURSE_TYPE_SINGLE,
    teacherId: 1,
    students: [],
    duration: 90,
    frequency: COURSE_FREQUENCY_MONTHLY,
    price: 1800,
    description: 'Esta es una materia de geografía',
    rating: 4,
    comments: [],
  },
];

const users = [
  {
    id: 1,
    name: 'Pedro',
    surname: 'López',
    email: 'pedro@mail.com',
    password: '123',
    phone: '1155553333',
    role: TEACHER_ROLE,
    experience:
      'Profesor en la UBA desde 2016 con experiencia en varios rubros.',
  },
  {
    id: 2,
    name: 'Sandra',
    surname: 'Sánchez',
    email: 'sandra@mail.com',
    password: '123',
    phone: '1155553333',
    role: TEACHER_ROLE,
    experience:
      'Profesora en la UBA hace más de diez años con experiencia en varios rubros.',
  },
  {
    id: 3,
    name: 'Micaela',
    surname: 'Pérez',
    email: 'micaela@mail.com',
    password: '123',
    phone: '1155553333',
    education: [
      {
        level: '',
        status: '',
        description: '',
      },
    ],
    role: STUDENT_ROLE,
  },
  {
    id: 10,
    name: 'Juan',
    surname: 'Pérez',
    email: 'juan@mail.com',
    password: '123',
    phone: '1155553333',
    education: [
      {
        level: '',
        status: '',
        description: '',
      },
    ],
    role: STUDENT_ROLE,
  },
];

const notifications = [
  {
    sourceId: 3,
    destinationId: 2,
    type: COURSE_NOTIFICATION,
    time: 'de 9hs a 18hs',
    courseId: 2,
    message: 'Me quiero inscribir en esta clase',
  },
  {
    sourceId: 10,
    destinationId: 2,
    type: COMMENT_NOTIFICATION,
    courseId: 1,
    message: 'Me gustó mucho esta clase!',
  },
];

const comments = [
  { courseId: 1, studentId: 10, message: 'Excelente clase!!' },
  { courseId: 1, studentId: 3, message: 'Recomiendo mucho esta clase' },
];

export { courses, users, notifications, comments };
