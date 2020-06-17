import React, { useState,useEffect,useContext } from 'react'
import { ExamContext } from '../../context/examContext';


export const  Timer = (props)=>{
    const {exam,setExam}= useContext(ExamContext);
    // const [mins,setMins]= useState(()=>parseInt(exam.durationInMins)-1);
    const [mins,setMins]= useState(()=>parseInt(exam.durationInMins)-1);
    const [secs,setSecs]= useState(59);
    useEffect( ()=> {
        let interval = null;
        interval = setInterval(() => {
            if (secs>0) {
                setSecs(secs=>secs-1)
            } else if(secs === 0) {
                if (mins > 0) {
                    setExam({...exam,durationInMins:mins})
                    setSecs(59)
                    setMins(mins => mins - 1);

                }else{
                    console.log("time is up");
                    clearInterval(interval);
                    props.timeIsUp();
                }
                
            }
          }, 1000);

        return () => clearInterval(interval);
    },[mins,secs]);



    return (
        <div>
        { mins === 0 && secs === 0
            ? <h2>Busted!</h2>
            : <h3>Time Remaining: {mins}:{secs < 10 ? `0${secs}` : secs}</h3>
        }
        </div>
    )


}

