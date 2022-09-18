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
  const filtered = publishedCourses.filter((course) => course.id === id);
  return filtered.students;
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
  return [];
  /*
  const publishedCourses = usePublishedCourses();
  useEffect(() => {
    if (publishedCourses !== undefined) {
      const filteredData = publishedCourses
        .map((course) => (isUserEnrolled(id, course) ? course.id : null))
        .filter((element) => element);
      setCoursesByStudentId(filteredData);
    }
  }, [id, publishedCourses]);
  */
  /*
  const [coursesByStudentId, setCoursesByStudentId] = useState([]);
  const publishedCourses = [2, 3];
  const courses = await Promise.all(
    publishedCourses.map((courseId) =>
      fetch(`${endpoint}/courses?id=${courseId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data[0];
        })
    )
  );
  return courses;
*/
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
  usePublishedCourses,
  useNotifications,
  useCourseName,
  useCourseStudents,
  useCoursesByStudentId,
  useCoursesByTeacherId,
  useCourseById,
  useUserById,
  useTeacherByCourseId,
};
