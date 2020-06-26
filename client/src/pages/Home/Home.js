import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import bgImage from './login_bg.jpg';
// import { StudentEnroll } from './../../components/StudentEnroll/StudentEnroll';
import { TeacherLogin } from '../../components/Teacher/TeacherLogin/TeacherLogin';
import { TeacherRegister } from '../../components/Teacher/TeacherRegister/TeacherRegister';
import { StudentLogin } from '../../components/Student/StudentLogin/StudentLogin';
import { StudentRegister } from '../../components/Student/StudentRegister/StudentRegister';
import { ForgetPassword } from '../../components/ForgetPassword/ForgetPassword';
import { ResetPassword } from '../../components/ForgetPassword/ResetPassword';




import requireGuest from '../../hocs/requireGuest';
const Home = () => {
  const [key, setKey] = useState('student');
  const [teacherLogin, setTeacherLogin] = useState(0);
  const [studentLogin, setStudentLogin] = useState(0);
  const toggleStudentForm = (mode) => {
    setStudentLogin(mode);
  };

  const toggleTeacherForm = (mode) => {
    setTeacherLogin(mode);
  };

  
  return (
    <>
      <img src={bgImage} alt='background' className='bgImage' />
      <div className='bgOverly'></div>
      <section id='login'>
        <div className='container'>
          <div className='form-container'>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey='student' title='Student'>
                <div className={studentLogin ===0 ? '' : 'hidden'}>
                  <StudentLogin toggleStudentForm={toggleStudentForm} />
                </div>
                <div className={studentLogin ===1 ? '' : 'hidden'}>
                  <StudentRegister toggleStudentForm={toggleStudentForm} />
                </div>
                <div className={studentLogin ===-1 ? '' : 'hidden'}>
                  <ForgetPassword 
                  forgetURL="/students/changePassword"
                  toggleForm={toggleStudentForm}
                  />
                </div>
                <div className={studentLogin ===2 ? '' : 'hidden'}>
                  <ResetPassword 
                  resetURL="/students/resetPassword"
                  toggleForm={toggleStudentForm}
                   />
                </div>
              </Tab>
              <Tab eventKey='teacher' title='Teacher'>
                <div className={teacherLogin ===0 ? '' : 'hidden'}>
                  <TeacherLogin
                    toggleTeacherForm={toggleTeacherForm}
                  />
                </div>
                <div className={teacherLogin ===1 ? '' : 'hidden'}>
                  <TeacherRegister toggleTeacherForm={toggleTeacherForm} />
                </div>
                <div className={teacherLogin ===-1 ? '' : 'hidden'}>
                  <ForgetPassword 
                  forgetURL="/teacher/changePassword"
                  toggleForm={toggleTeacherForm}
                   />
                </div>
                <div className={teacherLogin ===2 ? '' : 'hidden'}>
                  <ResetPassword 
                  resetURL="/teacher/resetPassword"
                  toggleForm={toggleTeacherForm}
                   />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default requireGuest(Home);
