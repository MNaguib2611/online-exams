import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
import requireAuth from '../../hocs/requireAuth';
import { useToasts } from 'react-toast-notifications';

const VerifyAccount = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { accountType } = useParams();
  const { addToast } = useToasts();
  useEffect(() => {
    console.log(accountType);
    return () => {};
  }, []);
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const verify = () => {
    axios
      .post(
        `/${accountType === 'student' ? 'students' : 'teacher'}/verify`,
        { verificationCode: code },
        {
          headers: {
            'x-access-token': localStorage.getItem(`${accountType}Token`),
          },
        }
      )
      .then((result) => {
        addToast('Account verified successfully', {
          appearance: 'info',
          autoDismiss: true,
        });
        history.push(`/${accountType}/`);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    verify();
  };

  return (
    <section id='new-exam'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-2'>
            <div className='exam-card mt-5'>
              <div className='heading'>
                <h3>Please verify your account</h3>
              </div>
              <div className='body'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='enter a verification key'
                      value={code}
                      onChange={handleCode}
                    />
                  </div>

                  {error && <p className='text-danger'>{error}</p>}
                  <button className='btn  btn-primary btn-blue' type='submit'>
                    Verify
                  </button>
                  <button
                    className='btn  btn-danger ml-3'
                    type='button'
                    onClick={() => {
                      localStorage.removeItem(`${accountType}Token`);
                      history.push('/');
                    }}
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default requireAuth(VerifyAccount);
