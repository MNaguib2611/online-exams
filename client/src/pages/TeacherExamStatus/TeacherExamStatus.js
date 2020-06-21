import React, {useState, useEffect} from "react";
import Loading from "../../components/Loading/Loading.js";
import {useParams} from "react-router-dom";
import axios from "../../axios";

const TeacherExamStatus = (props) => {
    const { id, examName } = useParams();
    const [loading, setLoading] = useState(true);
    const [examStatusData, setExamStatusData] = useState([]);
    useEffect(()=>{
        axios.get(`/teacher/getExamStatus/${id}`,{
            headers: {'x-access-token': localStorage.getItem('teacherToken')},
        }).then((result)=>{
            console.log(result.data);
            setLoading(false);
            setExamStatusData(result.data);
        }).catch((error)=>{
            window.alert("Some Error happend.");
            console.log(error)
        })
    }, []);

    let data;
    
    if(loading){
        data = (<div className="container">
                        <h1>Students Who have submitted the {examName} exam.</h1>
                        {<Loading />}
                    </div>
                    )   
    } else {
        data = (<div className="container">
                <h1>Students Who have submitted the {examName} exam.</h1>
                {
                    examStatusData.length > 0 ? 
                    <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>   
                    { 
                        examStatusData.map((examStatus)=>{
                            return(

                                <tr>
                                    <td>{examStatus.name}</td>
                                    <td>{examStatus.score}</td>
                                    <td>{examStatus.email}</td>
                                </tr>
                            )

                        }) 
                    }
                    </tbody>
                    </table>
                    : <div className="alert alert-info"><h1>No submission for this exam yet.</h1></div> 
                }
        </div>)
    }

    return data;
}

export default TeacherExamStatus;