import React,{useState} from 'react';
const BookHome = ({ currentQuestion, currentPage,answers,setAnswers }) => {
    const handleChange = (e) =>{
        let newAnswers = {   ...answers}
        newAnswers[currentQuestion._id]=e.target.value
        setAnswers(newAnswers);
    }


  return (
    <div className="question-div">
    <h2> <strong>{currentPage}-</strong> {currentQuestion.questionStatement}</h2>
    <hr/>
    <ul>
        {
            currentQuestion.answers.map((answer)=>{
               return  <li key={answer}>
               <label>
                <input
                  name="answer"
                  type="radio"
                  value={answer}
                  onChange={handleChange}
                />
                {answer}
              </label>
               
               </li>
            })
        }
    </ul>
    </div>
  );
};

export default BookHome;
