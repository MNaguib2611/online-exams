import React, { useState, useEffect } from 'react';

const Question = ({ question, handleNewAnswer, answer, visibleQuestion }) => {
  const [choice, setChoice] = useState(answer);
  const handleChoice = (e) => {
    setChoice(e.target.value);
    handleNewAnswer(question._id, e.target.value);
  };

  return (
    <div className={visibleQuestion ? '' : 'hidden'}>
      <h2 className='text-center'>{question.questionStatement}</h2>
      <div className='choices'>
        <ul>
          {question.answers.map((answer, index) => (
            <li key={answer}>
              <input
                type='radio'
                name={question.questionStatement}
                id={'f-option-' + index + answer.replace(/\s/g, '')}
                checked={choice === answer}
                value={answer}
                onChange={handleChoice}
              />
              <label htmlFor={'f-option-' + index + answer.replace(/\s/g, '')}>
                {answer}
              </label>

              <div className='check'></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
