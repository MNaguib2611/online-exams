import React, { useState } from 'react';
import axios from '../../../axios';
import { useToasts } from 'react-toast-notifications';
export const StudentProfile = (props) => {
    const [error, setError] = useState('');
    const { addToast } = useToasts();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setConfirmPassword] = useState('');
  
    const handleEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const handleFirstName = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastName = (e) => {
      setLastName(e.target.value);
    };
  
    const handleSchool = (e) => {
      setSchool(e.target.value);
    };
    const handleGrade = (e) => {
      setGrade(e.target.value);
    };
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName|| !email || !school || !grade) return setError('please fill all fields')
        let bodyData =  {
            firstName,
            lastName,
            email,
            school,
            grade,
          }
        if (password) {
            if(password !== passwordConfirm) return  setError("passwords don't match");
            bodyData = {...bodyData,password}
        }
      axios
        .put('/students/updateProfie',bodyData,{
            headers: {
                'x-access-token': localStorage.getItem('studentToken'),
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
          <input
            type='email'
            className='form-control'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmail}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your first name'
            value={firstName}
            onChange={handleFirstName}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your last name'
            value={lastName}
            onChange={handleLastName}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter your school'
            value={school}
            onChange={handleSchool}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            className='form-control'
            placeholder='Enter your grade'
            value={grade}
            onChange={handleGrade}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Enter your password'
            value={password}
            onChange={handlePassword}
            
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Enter your password again'
            value={passwordConfirm}
            onChange={handleConfirmPassword}
            
          />
        </div>
            <p className='text-danger'>{error}</p>
            <button className='btn btn-block btn-blue'> Update Profile</button>
        </form>
    </div>        
  );
};


