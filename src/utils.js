import { useEffect, useState } from 'react';
import { COURSE_STATUS_ACCEPTED, COURSE_STATUS_FINISHED } from './constants';
import { useUsers } from './hooks';

const getRating = (ratingList) => {
  let score = 0;
  if (ratingList?.length > 0) {
    ratingList.forEach((element) => {
      score += element.score;
    });
    score /= ratingList.length;
  }

  return score;
};

const capitalize = (str) => {
  if (str !== undefined) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

const isUserEnrolled = (userId, courseData) => {
  if (!userId || !courseData) {
    return null;
  }
  const filtered = courseData.students.filter(
    (student) => student?.id === userId
  );
  return filtered.length > 0;
};

const canUserComment = (userId, courseData) => {
  console.log('userId: ', userId);
  console.log('courseData: ', courseData);
  const filtered = courseData?.inscriptions?.filter(
    (inscription) => inscription.student?.id === userId
  );
  if (filtered?.length > 0) {
    return (
      filtered[0].status === COURSE_STATUS_ACCEPTED ||
      filtered[0].status === COURSE_STATUS_FINISHED
    );
  }
  return false;
};

const useFullName = () => {
  const userData = useUsers();
  const [users, setUsers] = useState({});
  useEffect(() => {
    if (userData !== undefined) {
      setUsers(userData);
    }
  }, [userData]);
  function getFullName(id) {
    if (users.length) {
      const [user] = users.filter((user) => user.id === id);
      return `${user.firstname} ${user.lastname}`;
    }
  }
  return getFullName;
};

export { capitalize, useFullName, isUserEnrolled, canUserComment, getRating };
