import React, { useContext, useEffect } from 'react';
import TeacherExamList from '../../../components/Teacher/TeacherExamList/TeacherExamList';
import { TeacherContext } from '../../../context/teacherContext';
import axios from '../../../axios';
import Loading from '../../../components/Loading/Loading';
const TeacherHome = (props) => {
  const context = useContext(TeacherContext);
  const fetchExams = () => {
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
  };
  useEffect(() => {
    fetchExams();
  }, []);
  return (
    (context.teacher.exams && (
      <>
        <TeacherExamList
          exams={context.teacher.exams}
          fetchExams={fetchExams}
        />
      </>
    )) || <Loading />
  );
};

export default TeacherHome;
