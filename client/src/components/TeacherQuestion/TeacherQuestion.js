import React, { useState } from 'react';
import axios from '../../axios';
import { useToasts } from 'react-toast-notifications';

const TeacherQuestion = (props) => {
  const { addToast } = useToasts();
  const [title, setTitle] = useState('');
  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  const [thirdChoice, setThirdChoice] = useState('');
  const [rightChoice, setRightChoice] = useState('');
  const [error, setError] = useState('');
  let singleMode;

  const clearInputs = () => {
    setError('');
    setTitle('');
    setFirstChoice('');
    setSecondChoice('');
    setThirdChoice('');
    setRightChoice('');
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleFirstChoice = (e) => {
    setFirstChoice(e.target.value);
  };

  const handleSecondChoice = (e) => {
    setSecondChoice(e.target.value);
  };

  const handleThirdChoice = (e) => {
    setThirdChoice(e.target.value);
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
      !firstChoice ||
      !secondChoice ||
      !thirdChoice ||
      !rightChoice
    ) {
      return setError('please fill all fields');
    } else if (
      rightChoice !== firstChoice &&
      rightChoice !== secondChoice &&
      rightChoice !== thirdChoice
    ) {
      return setError('right answer does not match any answer');
    }

    axios
      .put(
        '/exams/' + props.examId + '/question',
        {
          question: title,
          answers: [firstChoice, secondChoice, thirdChoice],
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
          props.handleShowForm();
          props.fetchExam();
        }
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
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter first choice'
                    value={firstChoice}
                    onChange={handleFirstChoice}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter second choice'
                    value={secondChoice}
                    onChange={handleSecondChoice}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter third choice'
                    value={thirdChoice}
                    onChange={handleThirdChoice}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='enter the right choice'
                    value={rightChoice}
                    onChange={handleRightChoice}
                  />
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
                  onClick={props.handleShowForm}
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

export default TeacherQuestion;
