import { users } from "./data";

const getFullName = (id) => {
  const filtered = users.filter((user) => user.id === id);
  const [user] = filtered;
  return `${user.name} ${user.surname}`;
};

export { getFullName };
