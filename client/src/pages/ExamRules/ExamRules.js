import React from 'react';
import bgImage from './login_bg.jpg';
import { StudentRules } from './../../components/StudentExam/StudentRules';

export const ExamRules = () => {
  return (
    <section className="examDiv" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='overly'>
        <div className='container'>
          <div className='rules-container'>
           <StudentRules />
          </div>
        </div>
      </div>
    </section>
  );
};

