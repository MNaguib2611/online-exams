import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import bgImage from './login_bg.jpg';
import { StudentEnroll } from './../../components/StudentEnroll/StudentEnroll';
import { TeacherLogin } from '../../components/TeacherLogin/TeacherLogin';
import { TeacherRegister } from '../../components/TeacherRegister/TeacherRegister';
const Home = () => {
  const [key, setKey] = useState('student');
  const [teacherLogin, setTeacherLogin] = useState(true);
  const toggleTeacherForm = () => {
    setTeacherLogin(!teacherLogin);
  };
  return (
    <section id='login' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='overly'>
        <div className='container'>
          <div className='form-container'>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey='student' title='Student'>
                <StudentEnroll />
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
      </div>
    </section>
  );
};

export default Home;
