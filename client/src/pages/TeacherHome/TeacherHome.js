import React, { useContext, useEffect } from 'react';
import TeacherExamList from '../../components/TeacherExamList/TeacherExamList';
import { TeacherContext } from './../../context/teacherContext';
import axios from './../../axios';
const TeacherHome = () => {
  const context = useContext(TeacherContext);
  useEffect(() => {
    axios
      .get('exams', {
        headers: {
          'x-access-token': localStorage.getItem('teacherToken'),
        },
      })
      .then((result) => {
        context.setTeacher({
          exams: result.data.exams,
          teacherData: result.data.teacher,
        });
      })
      .catch((err) => {
        localStorage.removeItem('teacherToken');
      });
  }, []);
  return (
    (context.teacher.exams && (
      <>
        <TeacherExamList exams={context.teacher.exams} />
      </>
    )) || <h1>Loading</h1>
  );
};

export default TeacherHome;
