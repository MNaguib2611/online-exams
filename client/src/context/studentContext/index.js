import React, { createContext, useState } from 'react';

export const StudentContext = createContext({});

const StudentContextProvider = (props) => {
  const [student, setStudent] = useState({
    name: 'ahmed',
  });

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
