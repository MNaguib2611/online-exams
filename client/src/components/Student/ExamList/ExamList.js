import React,{useState,useEffect} from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';


const ExamList = () => {
  
  const [examList,setExamList]=useState([])




  const fetchExam = () => {
    axios
    .get('/students/myEnrolledExams/', {
      headers: {
        'x-access-token': localStorage.getItem('studentToken'),
      },
    })
    .then((res) => {
      console.log(res.data);
      setExamList(res.data.myExams)
    })
    .catch((err) => console.log(err));
  };


  useEffect(() => {
    fetchExam()
  },[])
  return (
    <section id='exam-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 offset-1'>
            <table className='table mt-5'>
              <thead>
                <tr>
                  <th colSpan='5'>
                    <h3 className='text-center'>My Enrolled Exams</h3>
                  </th>
                </tr>
                <tr>
                  <th>Exam Name</th>
                  <th>Enrolled In</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                examList.map((exam) =>(
                  <tr>
                  <td>{exam.name}</td>
                  <td>{exam.startedAt}</td>
                  <td>{exam.percentage}</td>
                  <td>{exam.status}</td>
                  <td>
                  <Link
                        to={`/exams/${exam._id}/score`}
                        className='action'
                      >
                        <i className='fas fa-eye'></i>
                  </Link>
                  </td>
                </tr>
                ))
              }
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamList;
