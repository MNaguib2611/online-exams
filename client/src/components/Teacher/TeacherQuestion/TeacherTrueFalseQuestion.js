import React, { useState } from 'react';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';

const TeacherTrueFalseQuestion = (props) => {
  const { addToast } = useToasts();
  const [title, setTitle] = useState('');
  const [rightChoice, setRightChoice] = useState('');
  const [error, setError] = useState('');
  let singleMode;

//   const [choice, setChoice] = useState(answer);




  const clearInputs = () => {
    setError('');
    setTitle('');
    setRightChoice('');
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };


  const handleRightChoice = (e) => {
    setRightChoice(e.target.value);
  };

  const handleSubmitAndAdd = () => {
    addNewQuestion();
  };

  const handleSubmit = (e) => {
    singleMode = true;
    addNewQuestion();
  };

  const addNewQuestion = () => {
    if (
      !title ||
      !rightChoice
    ) {
      return setError('please fill question and choose the correct answer');
    } 
    axios
      .put(
        '/exams/' + props.examId + '/question',
        {
          question: title,
          answers: ["True", "False"],
          correctAnswer: rightChoice,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('teacherToken'),
          },
        }
      )
      .then((result) => {
        addToast('Question added successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
        clearInputs();
        if (singleMode) {
          props.handleTrueORFalseForm();
        }
        props.fetchExam();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <section id='new-exam' className="drop-back">
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3>Add New Question</h3>
              </div>
              <div className='body'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter question title'
                    value={title}
                    onChange={handleTitle}
                  />
                </div>
                <div className='form-group choices'>
                  <ul>
                  <li key='True'>
                    <input
                      type='radio'
                      name="TrueOrFalse"
                      id='f-option-True' 
                      checked={rightChoice === 'True'}
                      value='True'
                      onChange={handleRightChoice}
                    />
                    <label htmlFor={'f-option-True'}>
                      True
                    </label>
                    <div className='check'></div>
                  </li>
                  <li key='False'>
                    <input
                      type='radio'
                      name="TrueOrFalse"
                      id='f-option-False' 
                      checked={rightChoice === 'False'}
                      value='False'
                      onChange={handleRightChoice}
                    />
                    <label htmlFor={'f-option-False'}>
                      False
                    </label>
                    <div className='check'></div>
                  </li>
                  </ul>
                </div>
                {error && <p className='text-danger'>{error}</p>}
                <button
                  className='btn  btn-primary btn-blue mr-3'
                  onClick={handleSubmit}
                >
                  Add
                </button>
                <button
                  className='btn  btn-primary btn-blue'
                  onClick={handleSubmitAndAdd}
                >
                  Add and Add Another Question
                </button>

                <button
                  className='btn btn-danger ml-3'
                  onClick={props.handleTrueORFalseForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherTrueFalseQuestion;
