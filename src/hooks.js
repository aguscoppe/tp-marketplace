import { useState, useEffect } from "react";
import { isUserEnrolled } from "./utils";

const endpoint = "http://localhost:3000";

const localUser = JSON.parse(localStorage.getItem("current-user"));

const useLogin = () => {
  const login = async (username, password) => {
    try {
      const url = `${endpoint}/login`;
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const currentUser = {
        // TODO: replace with user id response
        id: "ec2a54ad-d69c-4325-bc79-e8458359f042",
        token: data.access_token,
      };

      localStorage.setItem("current-user", JSON.stringify(currentUser));
      console.log(localStorage.getItem("current-user"));
    } catch (e) {
      console.log(e);
    }
  };
  return { login };
};

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);
  return courses;
};

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/users`, {
      headers: {
        Authorization: `Bearer ${localUser?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return users;
};

const usePublishedCourses = () => {
  const [publishedCourses, setPublishedCourses] = useState([]);
  useEffect(() => {
    /* fetch(`${endpoint}/courses?published=true`) */
    fetch(`${endpoint}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setPublishedCourses(data);
      });
  }, []);
  return publishedCourses;
};

const useCourseById = (id) => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/courses?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const [courseData] = data;
        setCourse(courseData);
      });
  }, [id]);
  return course;
};

const useComments = (courseId) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/courses/${courseId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [courseId]);
  return comments;
};

const useNotifications = (id) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (id) {
      fetch(`${endpoint}/users/${id}/notifications`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
        });
    }
  }, [id]);
  return notifications;
};

const useCourseStudents = (id) => {
  const publishedCourses = usePublishedCourses();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    if (publishedCourses?.length) {
      const filtered = publishedCourses.filter(
        (course) => course.id === id
      ).students;
      setCourses(filtered);
    }
  }, [id, publishedCourses]);
  return courses;
};

const useCoursesByTeacherId = (id) => {
  const [coursesByTeacherId, setCoursesByTeacherId] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/courses?teacherId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoursesByTeacherId(data);
      });
  }, [id]);
  return coursesByTeacherId;
};

const useCoursesByStudentId = (id) => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const publishedCourses = usePublishedCourses();
  useEffect(() => {
    if (publishedCourses !== undefined) {
      const filteredData = publishedCourses
        .map((course) => (isUserEnrolled(id, course) ? course.id : null))
        .filter((element) => element);
      setFilteredCourses(filteredData);
    }
  }, [id, publishedCourses]);
  return filteredCourses;
};

const useCourseDataByStudentId = (id) => {
  const filteredCourses = useCoursesByStudentId(id);
  const [courseList, setCourseList] = useState([]);
  async function fetchData() {
    const courses = await Promise.all(
      filteredCourses.map((courseId) =>
        fetch(`${endpoint}/courses?id=${courseId}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return data[0];
          })
      )
    );
    if (courses?.length > 0) {
      setCourseList(courses);
    }
    return courses;
  }
  useEffect(() => {
    if (filteredCourses !== undefined) {
      fetchData();
    }
  }, [id, filteredCourses]);

  return courseList;
};

const useCourseName = (id) => {
  const [name, setName] = useState("");
  useEffect(() => {
    fetch(`${endpoint}/courses?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const [courseData] = data;
        setName(courseData.name);
      });
  }, [id]);
  return name;
};

const useUserById = (id) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      const url = `${endpoint}/users/${id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${localUser?.token}`,
          },
        });

        const data = await response.json();
        if (data?.statusCode) {
          setUser(undefined);
        } else {
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [id]);
  return user;
};

const useTeacherById = (id) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/teachers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);
  return user;
};

const useTeacherByCourseId = (id) => {
  const course = useCourseById(id);
  const teacherId = course?.teacherId;
  const user = useTeacherById(teacherId);
  return user;
};

export {
  endpoint,
  useCourses,
  useUsers,
  usePublishedCourses,
  useComments,
  useNotifications,
  useCourseName,
  useCourseStudents,
  useCoursesByStudentId,
  useCourseDataByStudentId,
  useCoursesByTeacherId,
  useCourseById,
  useUserById,
  useTeacherByCourseId,
  useTeacherById,
  useLogin,
};
