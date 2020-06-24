import React from 'react';

const AnswersTable = (props) => {
  console.log(props);
  return (
    <section id='exam-list'>
      <div className='container '>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table mt-3 mb-5'>
              <thead>
                <tr>
                  <th colSpan='5'>
                    <h3 className='text-center'>Exam Questions</h3>
                  </th>
                </tr>
                <tr>
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {props.examQuestions.map((question, index) => (
                  <tr key={index + question.questionStatement}>
                    <td key='questionStatement'>
                      {question.questionStatement}
                    </td>
                    <td
                      key='YourAnswer'
                      className={
                        question.studentAnswer === question.correctAnswer
                          ? 'bg-success text-white'
                          : 'bg-danger text-white'
                      }
                    >
                      {question.studentAnswer}
                    </td>
                    <td key='Correct Answer'>{question.correctAnswer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnswersTable;
