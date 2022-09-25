import { useEffect, useState } from 'react';
import { useUsers } from './hooks';

const capitalize = (str) => {
  if (str !== undefined) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

const isUserEnrolled = (userId, courseData) => {
  const filtered = courseData.students.filter(
    (student) => student?.id === userId
  );
  return filtered.length > 0;
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
      return `${user.name} ${user.surname}`;
    }
  }
  return getFullName;
};

export { capitalize, useFullName, isUserEnrolled };
