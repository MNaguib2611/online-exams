import React, { useState, useEffect } from 'react';
import SendKeyForm from '../../../components/Teacher/SendKeyForm/SendKeyForm';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import Loading from '../../../components/Loading/Loading';
const SendKey = () => {
  const { id } = useParams();
  const [exam, setExam] = useState();
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
  return (exam && <SendKeyForm exam={exam} />) || <Loading />;
};

export default SendKey;
