import { users } from './data';

/*
const getCourse = (id) => {
  return courses.filter((course) => course.id === id);
};

const getUser = (id) => {
  return users.filter((user) => user.id === id);
};

const getPublishedCourses = () => {
  return courses.filter((course) => course.published);
};

const filterCourses = ({ name, type, frequency, rating }) => {
  const courses = getPublishedCourses();
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

*/

const isUserEnrolled = (userId, courseData) => {
  const filtered = courseData.students.filter(
    (student) => student?.id === userId
  );
  return filtered.length > 0;
};

const getFullName = (id) => {
  const filtered = users.filter((user) => user.id === id);
  const [user] = filtered;
  return `${user.name} ${user.surname}`;
};

export { getFullName, isUserEnrolled };
