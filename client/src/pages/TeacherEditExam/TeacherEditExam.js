import React, { useEffect, useState } from 'react';
import TeacherQuestion from '../../components/TeacherQuestion/TeacherQuestion';
import axios from '../../axios';
import TeacherExamDetails from '../../components/TeacherExamDetails/TeacherExamDetails';

const TeacherEditExam = (props) => {
  const [exam, setExam] = useState();
  useEffect(() => {
    axios
      .get('/exams/' + props.match.params.id + '/me', {
        headers: {
          'x-access-token': localStorage.getItem('teacherToken'),
        },
      })
      .then((result) => {
        setExam(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    (exam && (
      <>
        <TeacherExamDetails exam={exam} />
        {/* <TeacherExam examId={props.match.params.id} /> */}
        {/* <TeacherQuestion examId={props.match.params.id} /> */}
      </>
    )) || <h1>Loading</h1>
  );
};

export default TeacherEditExam;

// import React, { useEffect, useState } from 'react';
// import axios from '../../axios';

// const TeacherExam = ({ examId }) => {

//   return (
//     (exam && (
//       <section id='exam-list'>
//         <div className='container'>
//           <div className='row'>
//             <div className='col-md-10 offset-1'>
//               <table className='table mt-5'>
//                 <thead>
//                   <tr>
//                     <th colSpan='5'>
//                       <h3 className='text-center text-uppercase'>
//                         {exam.name + ' Exam'}
//                       </h3>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th>Exam Name</th>
//                     <th>Exam Key</th>
//                     <th>Created At</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>php</td>
//                     <td>@fodj575f4</td>
//                     <td>2020-6-12</td>
//                     <td>
//                       <a href='#' class='action'>
//                         <i class='fas fa-eye'></i>
//                       </a>
//                       <a href='#' class='action'>
//                         <i class='fas fa-pen'></i>
//                       </a>

//                       <a href='#' class='action'>
//                         <i class='fas fa-trash'></i>
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>
//     )) || <h1>Loading</h1>
//   );
// };

// export default TeacherExam;
