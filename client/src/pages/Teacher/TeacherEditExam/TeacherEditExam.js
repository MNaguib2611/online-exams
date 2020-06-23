import React, { useEffect, useState } from 'react';
import TeacherQuestion from '../../../components/Teacher/TeacherQuestion/TeacherQuestion';
import axios from '../../../axios';
import TeacherExamDetails from '../../../components/Teacher/TeacherExamDetails/TeacherExamDetails';
import TeacherExamQuestions from '../../../components/Teacher/TeacherExamQuestions/TeacherExamQuestions';
import Spinner from '../../../components/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import TeacherTrueFalseQuestion from '../../../components/Teacher/TeacherQuestion/TeacherTrueFalseQuestion';

const TeacherEditExam = (props) => {
  const { id } = useParams();
  const [exam, setExam] = useState();
  const [showForm, setShowForm] = useState(false);
  const [TrueORFalseShowForm, setTrueORFalseShowForm] = useState(false);
  const handleShowForm = () => {
    setTrueORFalseShowForm(false);
    setShowForm(!showForm);
  };
  const handleTrueORFalseForm = () => {
    setShowForm(false);
    setTrueORFalseShowForm(!TrueORFalseShowForm);
  };
  const fetchExam = () => {
    axios
      .get('/exams/' + id + '/me', {
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
        {TrueORFalseShowForm && (
          <TeacherTrueFalseQuestion
            examId={exam._id}
            handleTrueORFalseForm={handleTrueORFalseForm}
            fetchExam={fetchExam}
          />
        )}

        <TeacherExamQuestions
          fetchExam={fetchExam}
          exam={exam}
          handleShowForm={handleShowForm}
          handleTrueORFalseForm={handleTrueORFalseForm}
        />
      </>
    )) || <Spinner />
  );
};

export default TeacherEditExam;
