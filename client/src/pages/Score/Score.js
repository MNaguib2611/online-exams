import React from 'react'
import bgImage from './login_bg.jpg';
import {ExamScore} from  "./../../components/StudentExam/ExamScore"
export const Score = (prps) => {
    return (
        <section className="examDiv" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='overly'>
            <div className='rules-container'>
             <ExamScore/>
            </div>
        </div>
      </section>
        )
}
