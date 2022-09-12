import { users, courses } from './data';

const filterCourses = ({ name, type, frequency, rating }) => {
  let filtered = courses;
  if (name !== '') {
    filtered = courses.filter(
      (course) => course.name.toLowerCase() === name.toLowerCase()
    );
  }
  if (type !== '') {
    filtered = filtered.filter(
      (course) => course.type.toLowerCase() === type.toLowerCase()
    );
  }
  if (frequency !== '') {
    filtered = filtered.filter(
      (course) => course.frequency.toLowerCase() === frequency.toLowerCase()
    );
  }
  if (rating !== '') {
    filtered = filtered.filter((course) => course.rating === rating);
  }
  return filtered;
};

const getCourse = (id) => {
  return courses.filter((course) => course.id === id);
};

const getUser = (id) => {
  return users.filter((user) => user.id === id);
};

const getFullName = (id) => {
  const filtered = users.filter((user) => user.id === id);
  const [user] = filtered;
  return `${user.name} ${user.surname}`;
};

const getPublishedCourses = () => {
  return courses.filter((course) => course.published);
};

const isUserEnrolled = (userId, courseId) => {
  if (!userId || !courseId) {
    return false;
  }
  const [user] = getUser(userId);
  const [course] = getCourse(courseId);
  const filtered = course.students.filter((student) => student.id === user.id);
  return filtered.length > 0;
};

export {
  filterCourses,
  getCourse,
  getUser,
  getFullName,
  getPublishedCourses,
  isUserEnrolled,
};
