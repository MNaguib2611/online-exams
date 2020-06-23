import React from 'react';

const ExamList = () => {
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>exam.name</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamList;
