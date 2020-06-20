import React, { useEffect, useState } from 'react';
import TeacherQuestion from '../../components/TeacherQuestion/TeacherQuestion';
import axios from '../../axios';
import TeacherExamDetails from '../../components/TeacherExamDetails/TeacherExamDetails';
import TeacherExamQuestions from '../../components/TeacherExamQuestions/TeacherExamQuestions';

const TeacherEditExam = (props) => {
  const [exam, setExam] = useState();
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const fetchExam = () => {
    axios
      .get('/exams/' + props.match.params.id + '/me', {
        headers: {
          'x-access-token': localStorage.getItem('teacherToken'),
        },
      })
      .then((result) => {
        console.log(result);
        setExam(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchExam();
  }, []);
  return (
    (exam && (
      <>
        <TeacherExamDetails exam={exam} />
        {showForm && (
          <TeacherQuestion
            examId={exam._id}
            handleShowForm={handleShowForm}
            fetchExam={fetchExam}
          />
        )}

        <TeacherExamQuestions
          fetchExam={fetchExam}
          exam={exam}
          handleShowForm={handleShowForm}
        />
      </>
    )) || <h1>Loading</h1>
  );
};

export default TeacherEditExam;
