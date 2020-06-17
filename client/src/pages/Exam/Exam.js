import React from 'react'
import bgImage from './login_bg.jpg';
import {StudentExam} from  "./../../components/StudentExam/StudentExam"
export const Exam = () => {
    return (
        <section className="examDiv" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='overly'>
            <div className='rules-container'>
             <StudentExam />
            </div>
        </div>
      </section>
        )
}
