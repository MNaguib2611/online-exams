import React, { useState,useContext } from 'react';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';
import { TeacherContext } from '../../../context/teacherContext';
export const TeacherProfile = (props) => {
 const context = useContext(TeacherContext);

  const { addToast } = useToasts();
//   const [name, setName] = useState(context.teacher.teacherData.name);
//   const [email, setEmail] = useState(context.teacher.teacherData.email);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {

    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email ) return setError('please fill all fields')
    let updateBody={email,name}
    if (password) {
        if(password !== passwordConfirm) return  setError("passwords don't match");
        updateBody={ ...updateBody,password }
    }
   
    axios
    .put('teacher/updateProfie',
     updateBody, {
        headers: {
          'x-access-token': localStorage.getItem('teacherToken'),
        },
      })
    .then((result) => {
    addToast(result.data.msg, {
        appearance: 'info',
        autoDismiss: true,
    });
    })
    .catch((err) => {
    setError(err.response.data.msg);
    });

  };

  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className="mt-5 p-5">
            <div className='form-group'>
                <input type='text' className='form-control' placeholder='Name' 
                    value={name}
                    onChange={handleName}
                    minLength="3"
                    required
                />
            </div>
            <div className='form-group'>
                <input type='email' className='form-control' placeholder='Email' 
                    value={email}
                    onChange={handleEmail}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    className='form-control'
                    placeholder='password'
                    value={password}
                    onChange={handlePassword}
                    minLength="8"
                />
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    className='form-control'
                    placeholder='confirm password'
                    value={passwordConfirm}
                    onChange={handlePasswordConfirm}
                    minLength="8"
                />
            </div>
            <p className='text-danger'>{error}</p>
            <button className='btn btn-block btn-blue'> Update Profile</button>
        </form>
    </div>        
  );
};


