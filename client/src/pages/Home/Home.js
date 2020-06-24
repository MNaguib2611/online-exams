import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import bgImage from './login_bg.jpg';
// import { StudentEnroll } from './../../components/StudentEnroll/StudentEnroll';
import { TeacherLogin } from '../../components/Teacher/TeacherLogin/TeacherLogin';
import { TeacherRegister } from '../../components/Teacher/TeacherRegister/TeacherRegister';
import { StudentLogin } from '../../components/Student/StudentLogin/StudentLogin';
import { StudentRegister } from '../../components/Student/StudentRegister/StudentRegister';
import requireGuest from '../../hocs/requireGuest';
const Home = () => {
  const [key, setKey] = useState('student');
  const [teacherLogin, setTeacherLogin] = useState(true);
  const [studentLogin, setStudentLogin] = useState(true);
  const toggleStudentForm = () => {
    setStudentLogin(!studentLogin);
  };

  const toggleTeacherForm = () => {
    setTeacherLogin(!teacherLogin);
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
                <div className={studentLogin ? '' : 'hidden'}>
                  <StudentLogin toggleStudentForm={toggleStudentForm} />
                </div>
                <div className={studentLogin ? 'hidden' : ''}>
                  <StudentRegister toggleStudentForm={toggleStudentForm} />
                </div>

                {/* <StudentEnroll /> */}
              </Tab>
              <Tab eventKey='teacher' title='Teacher'>
                <div className={teacherLogin ? '' : 'hidden'}>
                  <TeacherLogin toggleTeacherForm={toggleTeacherForm} />
                </div>
                <div className={teacherLogin ? 'hidden' : ''}>
                  <TeacherRegister toggleTeacherForm={toggleTeacherForm} />
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
