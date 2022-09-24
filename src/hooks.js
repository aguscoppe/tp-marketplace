import { useState, useEffect } from 'react';
import { isUserEnrolled } from './utils';

const endpoint = 'http://localhost:3004';

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
    fetch(`${endpoint}/users`)
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
    fetch(`${endpoint}/courses?published=true`)
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
    fetch(`${endpoint}/comments?courseId=${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);
  return comments;
};

const useNotifications = (id) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/notifications?destinationId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
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
  }, [publishedCourses]);

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
  }, [filteredCourses]);

  return courseList;
};

const useCourseName = (id) => {
  const [name, setName] = useState('');
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
    fetch(`${endpoint}/users?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((user) => user.id === id);
        const [user] = filteredData;
        setUser(user);
      });
  }, [id]);
  return user;
};

const useTeacherByCourseId = (id) => {
  const course = useCourseById(id);
  const teacherId = course?.teacherId;
  const user = useUserById(teacherId);
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
};
