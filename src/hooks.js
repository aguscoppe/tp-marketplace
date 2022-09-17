import { useState, useEffect } from 'react';

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
  const [coursesByStudentId, setCoursesByStudentId] = useState([]);
  useEffect(() => {
    fetch(`${endpoint}/courses?published=true`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((course) => course.id === id);
        setCoursesByStudentId(filteredData);
      });
  }, [id]);
  return coursesByStudentId;
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
  useCourseStudents,
  useCoursesByTeacherId,
  useCourseById,
  useUserById,
  useTeacherByCourseId,
};
